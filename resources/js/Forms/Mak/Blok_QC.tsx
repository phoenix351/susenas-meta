import { Button, Form, FormInstance, InputNumber, Space, message } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import RupiahInput from "@/Components/RupiahInput";
import { RekapMak, Rincian, RincianQc } from "@/types";
import Blok from "@/Components/Blok";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

const Blok4_3: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    daftarQc: RincianQc[];
}> = ({ form, onFinish, tabContentStyle, daftarQc }) => {
    const cellStyle = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        padding: "5px",
    };
    const centerCell: React.CSSProperties = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        textAlign: "center",
        // backgroundColor: "#636f83",
        padding: "5px",
    };
    interface Rincian {
        id: number;
        nomor?: number;
        kode_coicop?: string;
        rincian: string;
        satuan?: string;
        type?: string;
        value: number;
        dataType: string;
    }
    // please define all usestate here
    const [messageApi, contextHolder] = message.useMessage();

    const renderQC: React.FC<{
        rincian: Rincian;
        key: number;
        // label: number | string;
    }> = ({ rincian, key }) => {
        return (
            <tr key={key}>
                <td style={{ ...centerCell, width: "30px" }}>{key + 1}</td>
                <td style={{ ...cellStyle, width: "auto" }}>
                    {rincian.rincian}
                </td>

                <td
                    style={{ ...cellStyle, width: "150px", textAlign: "right" }}
                >
                    {rincian.id === 5 ? (
                        <>
                            <RupiahInput
                                key={key}
                                inputName={`blokqc_${rincian.id}`}
                            />
                        </>
                    ) : (
                        <Space direction="vertical">
                            <Form.Item
                                name={`blokqc_${rincian.id}`}
                                label={null}
                                style={{
                                    marginBottom: "5px",
                                    textAlign: "center",
                                }}
                            >
                                <InputNumber
                                    className="custom-input-number" // Add a custom class
                                    key={key}
                                    style={{
                                        textAlign: "right",
                                        width: "100%",
                                        // backgroundColor: "red",
                                    }}
                                    formatter={(value) => {
                                        const numericValue = Number(value) ?? 0;
                                        const formattedValue = numericValue
                                            .toFixed(2)
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            );

                                        return rincian.dataType === "decimal"
                                            ? formattedValue
                                            : String(numericValue);
                                    }}
                                />
                            </Form.Item>
                            {/* <Text
                                style={{
                                    color: "red",
                                    paddingLeft: "11px",
                                    paddingRight: "11px",
                                }}
                            >
                                {`${Number(rincian.value).toFixed(2)}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )}
                            </Text> */}
                        </Space>
                    )}
                </td>
            </tr>
        );
    };

    return (
        <Space direction="vertical" style={tabContentStyle}>
            <Form
                form={form}
                name="Blok4_3"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Blok
                    title={"Quality Control"}
                    columnsCount={3}
                    columns={["No.", "Rincian", "Isian"]}
                    key={2}
                >
                    {daftarQc.map((rincian, key) => renderQC({ rincian, key }))}
                </Blok>

                {contextHolder}
                {/* Blok I  */}
                {/* <Form.Item name="kode_prov" label="Provinsi">
                    <Select
                        options={daftarProv}
                        onChange={() => setKabkotDisable(false)}
                    />
                </Form.Item> */}
            </Form>
        </Space>
    );
};

export default Blok4_3;
