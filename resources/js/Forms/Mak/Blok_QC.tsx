import { Button, Form, FormInstance, InputNumber, Space, message } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import RupiahInput from "@/Components/RupiahInput";
import { RekapMak, Rincian } from "@/types";
import Blok from "@/Components/Blok";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import QualityControl from "@/Components/QualityControl";

const Blok4_3: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    daftarQc: Rincian[];
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
                    {daftarQc.map((rincian, key) => (
                        <QualityControl
                            key={key}
                            row_index={key}
                            rincian={rincian}
                        />
                    ))}
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
