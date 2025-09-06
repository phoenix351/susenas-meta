import React, { useEffect, useMemo } from "react";
import { Form, FormInstance, Input } from "antd";
import _debounce from "lodash/debounce";
import RupiahInput from "./RupiahInput";
import TextRupiah from "./TextRupiah";
import NumberInput from "./NumberInput";
import type { SubTotal } from "@/types";

/* ----------------------------- styles ----------------------------- */
const styles: Record<string, React.CSSProperties> = {
    blok: { backgroundColor: "#fc0", fontWeight: 700, padding: 5 },
    cell: { borderRight: "1px solid", paddingLeft: 5, paddingRight: 5 },
    center: {
        borderRight: "1px solid",
        textAlign: "center",
        paddingLeft: 5,
        paddingRight: 5,
    },
    right: {
        borderRight: "1px solid",
        textAlign: "right",
        paddingLeft: 5,
        paddingRight: 5,
    },
    rupiah: {
        borderRight: "1px solid",
        width: 200,
        textAlign: "right",
        paddingLeft: 5,
        paddingRight: 5,
    },
    dark: {
        borderRight: "1px solid",
        backgroundColor: "#636f83",
        paddingLeft: 5,
        paddingRight: 5,
    },
};

/* ------------------------ helpers: names & nums -------------------- */
const nameFor = (d: any) => ({
    beliHarga: `${d.type === "sub" ? "jumlah" : ""}${d.id}_beli_harga${
        d.subKey
    }`,
    prodHarga: `${d.type === "sub" ? "jumlah" : ""}${d.id}_produksi_harga${
        d.subKey
    }`,
    totalHarga: `${d.id}_total_harga`,
    totalHargaCalc: `${d.id}_total_harga_calculated`,
    beliVol: `${d.id}_beli_volume`,
    prodVol: `${d.id}_produksi_volume`,
    totalVol: `${d.id}_total_volume`,
    totalVolCalc: `${d.id}_total_volume_calculated`,
    item: `${d.id}_item`,
    satuan: `${d.id}_satuan`,
});

const nz = (v: unknown) =>
    v == null || Number.isNaN(Number(v)) ? 0 : Number(v);

/* ------------------------------- component ------------------------------- */
type Props = {
    data: any;
    form: FormInstance;
    subKey?: number;
    rekapMak: SubTotal[];
    calculate: (args: { subKey: number; jenis: keyof SubTotal }) => void;
};

const RowKonsumsi: React.FC<Props> = ({ data, form, rekapMak }) => {
    const names = useMemo(() => nameFor(data), [data]);
    const placeholder = (key: React.Key) => (
        <td key={key} style={styles.cell} />
    );

    // watch
    const beliHarga = nz(Form.useWatch(names.beliHarga, form));
    const prodHarga = nz(Form.useWatch(names.prodHarga, form));
    const totalHargaInput = nz(Form.useWatch(names.totalHarga, form));
    const beliVol = nz(Form.useWatch(names.beliVol, form));
    const prodVol = nz(Form.useWatch(names.prodVol, form));
    const totalVolInput = nz(Form.useWatch(names.totalVol, form));

    const totalHargaCalc = beliHarga + prodHarga;
    const totalVolCalc = beliVol + prodVol;

    const subRekap = rekapMak[data.subKey] ?? {
        beli: 0,
        produksi: 0,
        total: 0,
    };

    const isTotalEqual = totalHargaInput === totalHargaCalc;
    const isVolumeEqual =
        data.type === "sub" ? true : totalVolInput === totalVolCalc;
    const isBeliEqual =
        data.type === "sub" ? beliHarga === nz(subRekap.beli) : true;
    const isProduksiEqual =
        data.type === "sub" ? prodHarga === nz(subRekap.produksi) : true;
    const isTotalRekapEqual =
        data.type === "sub" ? totalHargaInput === nz(subRekap.total) : true;

    const showDetailRow =
        data.type === "sub" || totalHargaCalc > 0 || totalVolCalc > 0;

    // write calculated mirrors
    const writeCalculated = useMemo(
        () =>
            _debounce(
                (field: string, value: number) =>
                    form.setFieldsValue({ [field]: value }),
                300
            ),
        [form]
    );

    useEffect(() => {
        writeCalculated(names.totalHargaCalc, totalHargaCalc);
        if (data.type !== "sub")
            writeCalculated(names.totalVolCalc, totalVolCalc);
    }, [
        names.totalHargaCalc,
        names.totalVolCalc,
        totalHargaCalc,
        totalVolCalc,
        writeCalculated,
        data.type,
    ]);

    return (
        <>
            {/* MAIN ROW (1..9) */}
            <tr
                style={{
                    backgroundColor: data.flagBasket ? "#ffffcc" : "",
                    borderTop: "1px solid",
                    borderLeft: "1px solid",
                }}
            >
                {/* 1) ID — span on sub rows */}
                <td
                    style={{ ...styles.center, width: 10 }}
                    rowSpan={data.type === "sub" ? 2 : 1}
                >
                    {data.id}
                </td>

                {/* 2) Rincian */}
                <td
                    style={data.type === "sub" ? styles.blok : styles.cell}
                    rowSpan={data.type === "sub" ? 2 : 1}
                >
                    {data.rincian}
                    {data.type === "lain" && (
                        <Form.Item name={names.item}>
                            <Input placeholder="Sebutkan" />
                        </Form.Item>
                    )}
                </td>

                {/* 3) Satuan */}
                <td
                    style={data.type === "sub" ? styles.blok : styles.center}
                    rowSpan={data.type === "sub" ? 2 : 1}
                >
                    {data.type === "lain" && data.satuan === "" ? (
                        <Form.Item name={names.satuan}>
                            <Input placeholder="Satuan" />
                        </Form.Item>
                    ) : (
                        data.satuan
                    )}
                </td>

                {/* 4) Beli Volume */}
                <td
                    style={{
                        ...(data.type === "sub" ? styles.dark : styles.cell),
                        width: 50,
                    }}
                    rowSpan={data.type === "sub" ? 2 : 1}
                >
                    {data.type !== "sub" && (
                        <NumberInput inputName={names.beliVol} />
                    )}
                </td>

                {/* 5) Beli Harga */}
                <td style={styles.rupiah}>
                    <RupiahInput
                        inputName={names.beliHarga}
                        validateStatus={
                            !isBeliEqual && data.type === "sub" ? "error" : ""
                        }
                    />
                </td>

                {/* 6) Produksi Volume */}
                <td
                    style={data.type === "sub" ? styles.dark : styles.cell}
                    rowSpan={data.type === "sub" ? 2 : 1}
                >
                    {data.type !== "sub" && (
                        <NumberInput inputName={names.prodVol} />
                    )}
                </td>

                {/* 7) Produksi Harga */}
                <td style={styles.right}>
                    <RupiahInput
                        inputName={names.prodHarga}
                        validateStatus={
                            !isProduksiEqual && data.type === "sub"
                                ? "error"
                                : ""
                        }
                    />
                </td>

                {/* 8) Total Volume */}
                <td
                    style={data.type === "sub" ? styles.dark : styles.cell}
                    rowSpan={data.type === "sub" ? 2 : 1}
                >
                    {data.type !== "sub" && (
                        <NumberInput
                            inputName={names.totalVol}
                            validateStatus={!isVolumeEqual ? "error" : ""}
                        />
                    )}
                </td>

                {/* 9) Total Harga (input) */}
                <td style={styles.right}>
                    <RupiahInput
                        inputName={names.totalHarga}
                        validateStatus={
                            !isTotalEqual ||
                            (data.type === "sub" && !isTotalRekapEqual)
                                ? "error"
                                : ""
                        }
                        help={
                            !isTotalEqual
                                ? "Total harga tidak sama dengan jumlah beli + produksi"
                                : data.type === "sub" && !isTotalRekapEqual
                                ? "Total harga tidak sesuai dengan rekapitulasi"
                                : undefined
                        }
                    />
                </td>
            </tr>

            {/* DETAIL / RECOMMENDATION ROW */}
            <tr
                style={{
                    backgroundColor: data.flagBasket ? "#ffffcc" : "",
                    borderBottom: "1px solid",
                    borderRight: "1px solid",
                    borderLeft: "1px solid",
                }}
                hidden={!showDetailRow}
            >
                {data.type === "sub" ? (
                    // SUB rows: only 5, 7, 9 are present in this row (others row-spanned)
                    <>
                        {/* 5) Beli Harga (recommended) */}
                        <td style={styles.right}>
                            <TextRupiah
                                color={isBeliEqual ? "green" : "red"}
                                value={nz(subRekap.beli)}
                            />
                        </td>

                        {/* 7) Produksi Harga (recommended) */}
                        <td style={styles.right}>
                            <TextRupiah
                                color={isProduksiEqual ? "green" : "red"}
                                value={nz(subRekap.produksi)}
                            />
                        </td>

                        {/* 9) Total Harga: ALWAYS show calculated; for subs ALSO show recommended */}
                        <td style={styles.right}>
                            {/* calculated total (shown on both sub & non-sub) */}
                            <RupiahInput
                                inputName={names.totalHargaCalc}
                                readOnly
                                style={{
                                    color: isTotalEqual ? "green" : "red",
                                    backgroundColor: "inherit",
                                    border: "none",
                                    cursor: "text",
                                    display: "block",
                                    marginBottom: 4,
                                }}
                            />
                            {/* recommended total (subs only) */}
                            {/* <TextRupiah
                                color={isTotalRekapEqual ? "green" : "red"}
                                value={nz(subRekap.total)}
                            /> */}
                        </td>
                    </>
                ) : (
                    // NON-SUB rows: render 9 cells to match columns
                    <>
                        {placeholder("c1")}
                        {/* 1) id */}
                        {placeholder("c2")}
                        {/* 2) rincian */}
                        {placeholder("c3")}
                        {/* 3) satuan */}
                        {placeholder("c4")}
                        {/* 4) beli volume */}
                        {placeholder("c5")}
                        {/* 5) beli harga */}
                        {placeholder("c6")}
                        {/* 6) produksi volume */}
                        {placeholder("c7")}
                        {/* 7) produksi harga */}
                        {/* 8) total volume (calculated mirror) */}
                        <td style={styles.right}>
                            <Form.Item
                                name={names.totalVolCalc}
                                style={{
                                    color: isVolumeEqual ? "green" : "red",
                                    background: "inherit",
                                    border: "none",
                                    marginRight: 10,
                                }}
                            >
                                {totalVolCalc > 0 ? totalVolCalc : ""}
                            </Form.Item>
                        </td>
                        {/* 9) total harga (calculated mirror) — ALWAYS visible */}
                        <td style={styles.right}>
                            {/* <RupiahInput
                                inputName={names.totalHargaCalc}
                                readOnly
                                style={{
                                    color: isTotalEqual ? "green" : "red",
                                    backgroundColor: "inherit",
                                    border: "none",
                                    cursor: "text",
                                }}
                            /> */}
                            <TextRupiah
                                color={isTotalRekapEqual ? "green" : "red"}
                                value={nz(subRekap.total)}
                            />
                        </td>
                    </>
                )}
            </tr>
        </>
    );
};

export default React.memo(RowKonsumsi);
