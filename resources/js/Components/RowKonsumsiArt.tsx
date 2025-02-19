import React, { useState, useEffect } from "react";
import { Form, FormInstance, Input, InputNumber, Typography } from "antd"; // Replace 'your-library' with the actual library you are using for Form, Input, and Text components
import RupiahInput from "./RupiahInput";

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

const YourRowComponent: React.FC<{
    data: any;
    form: FormInstance;
    subKey?: number;
}> = ({ data, form, subKey }) => {
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

    return (
        <tr>
            <td style={centerCell}>{data.nomor}</td>
            <td style={cellStyle}>{data.kode_coicop}</td>
            <td colSpan={2} style={data.type === "sub" ? blokStyle : cellStyle}>
                {data.rincian}
                {data.type === "lain" && (
                    <Form.Item name={`${data.nomor}_lainnya`}>
                        <Input placeholder="Sebutkan" />
                    </Form.Item>
                )}
            </td>
            <td style={data.type === "sub" ? darkCell : cellStyle}>
                {data.type === "sub" || (
                    <Form.Item name={`${data.nomor}_beli_volume`}>
                        <InputNumber
                            min={0}
                            onKeyDown={() =>
                                console.log(
                                    form.getFieldValue(
                                        `${data.nomor}_beli_harga`
                                    )
                                )
                            }
                        />
                    </Form.Item>
                )}
            </td>
            <td style={cellStyle}>
                <RupiahInput
                    inputName={`${data.nomor}_beli_harga`}
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
                    }}
                />
                {data.type === "sub" && (
                    <Text style={{ color: "red" }}>
                        {`Rp ${totalHarga}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            "."
                        )}
                    </Text>
                )}
            </td>
            <td style={data.type === "sub" ? darkCell : cellStyle}>
                {data.type === "sub" || (
                    <Form.Item name={`${data.nomor}_produksi_volume`}>
                        <InputNumber min={0} />
                    </Form.Item>
                )}
            </td>
            <td style={cellStyle}>
                <RupiahInput
                    inputName={`${data.nomor}${
                        subKey ? subKey : ""
                    }_produksi_harga`}
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
                    }}
                />
                {data.type === "sub" && (
                    <Text style={{ color: "red" }}>
                        {`Rp ${totalHarga}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            "."
                        )}
                    </Text>
                )}
            </td>
            <td style={data.type === "sub" ? darkCell : cellStyle}>
                {data.type === "sub" || (
                    <>
                        <Form.Item name={`${data.nomor}_total_volume`}>
                            <InputNumber min={0} />
                        </Form.Item>
                    </>
                )}
            </td>
            <td style={rightCell}>
                <RupiahInput inputName={`${data.nomor}_total_harga`} />

                <Text style={{ color: "red" }}>
                    {`Rp ${totalHarga}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Text>
            </td>
        </tr>
    );
};

export default YourRowComponent;
