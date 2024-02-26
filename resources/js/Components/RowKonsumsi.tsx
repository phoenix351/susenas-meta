import React, { useState, useEffect } from "react";
import { Form, FormInstance, Input, InputNumber, Typography } from "antd"; // Replace 'your-library' with the actual library you are using for Form, Input, and Text components
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
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    // textAlign: "center",
    padding: "5px",
};
const centerCell: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    textAlign: "center",
    padding: "5px",
};
const rightCell: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    textAlign: "right",
    padding: "5px",
};
const darkCell: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
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

    useEffect(() => {
        const beliHarga = parseFloat(
            form.getFieldValue(`${data.nomor}_beli_harga`) || 0
        );
        const produksiHarga = parseFloat(
            form.getFieldValue(`${data.nomor}_produksi_harga`) || 0
        );
        const total = beliHarga + produksiHarga;
        setTotalHarga(total);
    }, [form, data.nomor]);

    function calculateHargaBeli(arg0: { nomor: any; subKey: any }) {
        throw new Error("Function not implemented.");
    }

    return (
        <tr style={{ backgroundColor: data.flagBasket ? "#ffffcc" : "" }}>
            <td style={centerCell}>{data.nomor}</td>
            <td style={cellStyle}>{data.kode_coicop}</td>

            <td colSpan={1} style={data.type === "sub" ? blokStyle : cellStyle}>
                {data.rincian}
                {data.type === "lain" && (
                    <Form.Item name={`${data.nomor}_item`}>
                        <Input placeholder="Sebutkan" />
                    </Form.Item>
                )}
            </td>
            <td
                colSpan={1}
                style={data.type === "sub" ? blokStyle : centerCell}
            >
                {data.type === "lain" ? (
                    <Form.Item name={`${data.nomor}_satuan`}>
                        <Input placeholder="Sebutkan" />
                    </Form.Item>
                ) : (
                    data.satuan
                )}
            </td>
            <td style={data.type === "sub" ? darkCell : cellStyle}>
                {data.type === "sub" || (
                    <NumberInput inputName={`${data.nomor}_beli_volume`} />
                )}
            </td>
            <td style={rightCell}>
                <RupiahInput
                    inputName={`${data.type === "sub" ? "jumlah" : ""}${
                        data.nomor
                    }_beli_harga${data.subKey}`}
                    onChange={(value: any) => {
                        form.setFieldsValue({
                            [`${data.nomor}_beli_harga`]: value,
                        });
                        // Manually trigger the useEffect
                        setTotalHarga(
                            parseFloat(value || 0) +
                                parseFloat(
                                    form.getFieldValue(
                                        `${data.nomor}_produksi_harga`
                                    ) || 0
                                )
                        );
                        if (data.type === "sub") return;
                        // calculate({
                        //     subKey: data.subKey,
                        //     jenis: "beli" as keyof SubTotal,
                        // });
                    }}
                />

                {data.type === "sub" && (
                    <TextRupiah
                        color="red"
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
            <td style={data.type === "sub" ? darkCell : cellStyle}>
                {data.type === "sub" || (
                    <NumberInput inputName={`${data.nomor}_produksi_volume`} />
                )}
            </td>
            <td style={rightCell}>
                <RupiahInput
                    inputName={`${data.type === "sub" ? "jumlah" : ""}${
                        data.nomor
                    }_produksi_harga${data.subKey}`}
                    onChange={(value: any) => {
                        form.setFieldsValue({
                            [`${data.nomor}_produksi_harga`]: value,
                        });
                        // Manually trigger the useEffect
                        setTotalHarga(
                            parseFloat(value || 0) +
                                parseFloat(
                                    form.getFieldValue(
                                        `${data.nomor}_beli_harga`
                                    ) || 0
                                )
                        );
                        if (data.type === "sub") return;
                        // calculate({
                        //     subKey: data.subKey,
                        //     jenis: "produksi" as keyof SubTotal,
                        // });
                    }}
                />
                {data.type === "sub" && (
                    <TextRupiah
                        color="red"
                        value={rekapMak[data.subKey]["produksi"] ?? 0}
                        // <TextRupiah
                        //     color="red"
                        //     value={
                        //         rekapMak[data.subKey]
                        //             ? rekapMak[data.subKey]["produksi"]
                        //             : 0
                        //     }
                        // value={0}
                    />
                )}
            </td>
            <td style={data.type === "sub" ? darkCell : cellStyle}>
                {data.type === "sub" || (
                    <NumberInput inputName={`${data.nomor}_total_volume`} />
                )}
            </td>
            <td style={rightCell}>
                <RupiahInput inputName={`${data.nomor}_total_harga`} />

                <TextRupiah
                    color="red"
                    value={
                        data.type === "sub"
                            ? rekapMak[data.subKey]["produksi"] +
                              rekapMak[data.subKey]["beli"]
                            : totalHarga
                    }
                />
            </td>
        </tr>
    );
};

export default RowKonsumsi;
