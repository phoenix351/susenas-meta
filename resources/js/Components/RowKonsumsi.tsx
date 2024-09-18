import React, { useState, useEffect } from "react";
import { Form, FormInstance, Input, InputNumber, Typography } from "antd"; // Replace 'your-library' with the actual library you are using for Form, Input, and Text components
import _debounce from "lodash/debounce";
import RupiahInput from "./RupiahInput";
import { SubTotal } from "@/types";
import TextRupiah from "./TextRupiah";
import NumberInput from "./NumberInput";

const { Text } = Typography;
const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%",
};
const blokStyle: React.CSSProperties = {
    backgroundColor: "#fc0",
    fontWeight: "700",
    padding: "5px",
};
const cellStyle = {
    // border: "none",
    borderRight: "1px solid ",

    padding: "5px",
};
const centerCell: React.CSSProperties = {
    borderRight: "1px solid ",
    // borderStyle: "solid",
    // border: "solid 1px black",
    // width: "100%",
    textAlign: "center",
    padding: "5px",
};
const rightCell: React.CSSProperties = {
    borderRight: "1px solid ",
    // borderStyle: "solid",
    // border: "solid 1px black",
    // width: "100%",
    textAlign: "right",
    padding: "5px",
};
const rupiahCell: React.CSSProperties = {
    borderRight: "1px solid ",

    // borderStyle: "solid",
    // border: "solid 1px black",
    width: "200px",
    textAlign: "right",
    padding: "5px",
};
const darkCell: React.CSSProperties = {
    borderRight: "1px solid ",
    // borderStyle: "solid",
    // border: "solid 1px black",
    // width: "100%",
    // textAlign: "center",
    backgroundColor: "#636f83",
    padding: "5px",
};

const RowKonsumsi: React.FC<{
    data: any;
    form: FormInstance;
    subKey?: number;
    rekapMak: SubTotal[];
    calculate: ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => void;
}> = ({ data, form, subKey, rekapMak, calculate }) => {
    const [totalHarga, setTotalHarga] = useState(0);
    const [volume, setVolume] = useState(0);
    const [isTotalEqual, setIsTotalEqual] = useState<boolean>(false);
    const [isBeliEqual, setIsBeliEqual] = useState<boolean>(false);
    const [isProduksiEqual, setIsProduksiEqual] = useState<boolean>(false);
    const [isVolumeEqual, setIsVolumeEqual] = useState<boolean>(false);

    useEffect(() => {
        let beli = Number(
            form.getFieldValue(
                `${data.type === "sub" ? "jumlah" : ""}${
                    data.nomor
                }_beli_harga${data.subKey}`
            )
        );
        if (!beli) {
            beli = 0;
        }
        let produksi = Number(
            form.getFieldValue(
                `${data.type === "sub" ? "jumlah" : ""}${
                    data.nomor
                }_produksi_harga${data.subKey}`
            )
        );
        if (!produksi) {
            produksi = 0;
        }

        const total = beli + produksi;
        console.log({ beli, produksi, total });

        if (!total) return;
        form.setFieldsValue({
            [`${data.nomor}_total_harga_calculated`]: total,
        });
        totalHargaCek();
    }, [totalHarga]);
    useEffect(() => {
        totalHargaCek();
    }, [rekapMak[data.subKey]["produksi"], rekapMak[data.subKey]["beli"]]);

    useEffect(() => {
        const total =
            form.getFieldValue(`${data.nomor}_beli_harga`) +
            form.getFieldValue(`${data.nomor}_produksi_harga`);
        setTotalHarga(total);
        totalHargaCek();

        const totalVolume =
            form.getFieldValue(`${data.nomor}_beli_volume`) +
            form.getFieldValue(`${data.nomor}_produksi_volume`);
        setVolume(totalVolume);
    }, []);

    function calculateHargaBeli(arg0: { nomor: any; subKey: any }) {
        throw new Error("Function not implemented.");
    }

    function beliHargaCalculate(value: number | undefined): void {
        // Manually trigger the useEffect
        let hargaProduksi = form.getFieldValue(
            `${data.type === "sub" ? "jumlah" : ""}${
                data.nomor
            }_produksi_harga${data.subKey}`
        );
        let total = value + hargaProduksi;
        // console.log(value, hargaProduksi);

        form.setFieldsValue({
            [`${data.nomor}_total_harga_calculated`]: total,
        });
        setTotalHarga(total);
        if (data.type === "sub") return;
        // calculate({
        //     subKey: data.subKey,
        //     jenis: "beli" as keyof SubTotal,
        // });
    }

    function produksiHargaCalculate(value: number | undefined): void {
        setTotalHarga(
            parseFloat(String(value) ?? 0) +
                parseFloat(form.getFieldValue(`${data.nomor}_beli_harga`) || 0)
        );
        if (data.type === "sub") return;
    }
    function totalHargaCek(): void {
        const value = form.getFieldValue(`${data.nomor}_total_harga`);
        const totalHarga = form.getFieldValue(
            `${data.nomor}_total_harga_calculated`
        );

        setIsTotalEqual(value == totalHarga);
        if (data.type == "sub") {
            const hargaProduksi = form.getFieldValue(
                `${data.type === "sub" ? "jumlah" : ""}${
                    data.nomor
                }_produksi_harga${data.subKey}`
            );
            const hargaBeli = form.getFieldValue(
                `${data.type === "sub" ? "jumlah" : ""}${
                    data.nomor
                }_beli_harga${data.subKey}`
            );
            setIsBeliEqual(hargaBeli == rekapMak[data.subKey]["beli"]);
            setIsProduksiEqual(
                hargaProduksi == rekapMak[data.subKey]["produksi"]
            );
        }
    }
    function volumeCalculate(): void {
        const totalVolume =
            form.getFieldValue(`${data.nomor}_beli_volume`) +
            form.getFieldValue(`${data.nomor}_produksi_volume`);
        setVolume(totalVolume);
        const volumeInput = form.getFieldValue(`${data.nomor}_total_volume`);
        setIsVolumeEqual(volumeInput == totalVolume);
    }
    return (
        <>
            <tr
                style={{
                    backgroundColor: data.flagBasket ? "#ffffcc" : "",
                    borderTop: "1px solid ",
                    // borderRight: "1px solid ",
                    borderLeft: "1px solid ",
                }}
            >
                <td
                    style={{
                        ...centerCell,
                        width: "55px",
                    }}
                >
                    {data.nomor}
                </td>
                {/* <td style={{ ...cellStyle, width: "130px" }}>{data.kode_coicop}</td> */}

                <td
                    colSpan={1}
                    style={{
                        ...(data.type === "sub" ? blokStyle : cellStyle),
                    }}
                >
                    {data.rincian}
                    {data.type === "lain" && (
                        <Form.Item name={`${data.nomor}_item`}>
                            <Input placeholder="Sebutkan" />
                        </Form.Item>
                    )}
                </td>
                <td
                    colSpan={1}
                    style={{
                        ...(data.type === "sub" ? blokStyle : centerCell),

                        // width: "55px",
                    }}
                >
                    {data.type === "lain" ? (
                        <Form.Item name={`${data.nomor}_satuan`}>
                            <Input placeholder="Sebutkan" />
                        </Form.Item>
                    ) : (
                        data.satuan
                    )}
                </td>
                <td
                    style={{
                        ...(data.type === "sub" ? darkCell : cellStyle),
                    }}
                >
                    {data.type === "sub" || (
                        <NumberInput
                            inputName={`${data.nomor}_beli_volume`}
                            onChange={_debounce(volumeCalculate, 400)}
                        />
                    )}
                </td>
                <td style={{ ...rupiahCell }}>
                    <RupiahInput
                        inputName={`${data.type === "sub" ? "jumlah" : ""}${
                            data.nomor
                        }_beli_harga${data.subKey}`}
                        onChange={_debounce(beliHargaCalculate, 600)}
                    />
                </td>
                <td
                    style={{
                        ...(data.type === "sub" ? darkCell : cellStyle),
                    }}
                >
                    {data.type === "sub" || (
                        <NumberInput
                            inputName={`${data.nomor}_produksi_volume`}
                            onChange={_debounce(volumeCalculate, 400)}
                        />
                    )}
                </td>
                <td style={{ ...rightCell }}>
                    <RupiahInput
                        inputName={`${data.type === "sub" ? "jumlah" : ""}${
                            data.nomor
                        }_produksi_harga${data.subKey}`}
                        onChange={_debounce(produksiHargaCalculate, 600)}
                    />
                </td>
                <td style={data.type === "sub" ? darkCell : cellStyle}>
                    {data.type === "sub" || (
                        <NumberInput
                            inputName={`${data.nomor}_total_volume`}
                            onChange={_debounce(volumeCalculate, 400)}
                        />
                    )}
                </td>
                <td style={{ ...rightCell }}>
                    <RupiahInput
                        inputName={`${data.nomor}_total_harga`}
                        onChange={_debounce(totalHargaCek, 600)}
                    />
                </td>
            </tr>
            <tr
                style={{
                    backgroundColor: data.flagBasket ? "#ffffcc" : "",
                    borderBottom: "1px solid ",
                    borderRight: "1px solid ",
                    borderLeft: "1px solid ",
                }}
            >
                <td style={cellStyle}></td>
                <td style={cellStyle}></td>
                <td style={cellStyle}></td>
                <td style={cellStyle}></td>
                <td style={rightCell}>
                    {" "}
                    {data.type === "sub" && (
                        <TextRupiah
                            color={isBeliEqual ? "green" : "red"}
                            value={
                                rekapMak[data.subKey]
                                    ? rekapMak[data.subKey]["beli"] ?? 0
                                    : 0
                            }
                            // value={0}
                        />
                        // <Text>{JSON.stringify(rekapMak)}</Text>
                    )}
                </td>
                <td style={cellStyle}></td>
                <td style={rightCell}>
                    {data.type === "sub" && (
                        <TextRupiah
                            color={isProduksiEqual ? "green" : "red"}
                            value={rekapMak[data.subKey]["produksi"] ?? 0}
                        />
                    )}
                </td>
                <td style={rightCell}>
                    {data.type !== "sub" && (
                        <Form.Item
                            style={{
                                color: isVolumeEqual ? "green" : "red",
                                backgroundColor: "inherit",
                                border: "none",
                                marginRight: "10px",
                            }}
                            name={`${data.nomor}_total_volume_calculated`}
                        >
                            {volume > 0 ? volume : ""}
                            {/* <Input disabled={true} /> */}
                        </Form.Item>
                    )}
                </td>
                <td style={cellStyle}>
                    <RupiahInput
                        style={{
                            color: isTotalEqual ? "green" : "red",
                            backgroundColor: "inherit",
                            border: "none",
                        }}
                        disabled={true}
                        inputName={`${data.nomor}_total_harga_calculated`}
                    />
                </td>
            </tr>
        </>
    );
};

export default RowKonsumsi;
