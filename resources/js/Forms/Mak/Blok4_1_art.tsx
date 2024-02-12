import {
    Button,
    Divider,
    Form,
    Image,
    Input,
    InputNumber,
    Select,
    Space,
    Table,
    Tabs,
    Typography,
    message,
} from "antd";
import { useEffect, useRef, useState } from "react";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

import Art from "./Art";

const { Text, Title } = Typography;

const Blok4_1: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    rekapArt: any;
    setRekapArt: (value: any) => void;
    // record: any;
}> = ({ form, onFinish, tabContentStyle, rekapArt, setRekapArt }) => {
    const formItemLayout = {
        // wrapperCol: { span: 24 },
    };
    const imageProps = {
        width: "70px",
        height: "auto",
        preview: false,
    };
    const tableStyle: React.CSSProperties = {
        borderCollapse: "collapse",
        width: "100%",
    };
    const cellStyle = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        padding: "5px",
    };
    const formItemStyle = {
        margin: "auto",
        padding: "5px",
    };
    // konstanta
    const daftarKlas: any[] | undefined = [
        { label: "Desa", value: "1" },
        { label: "Kelurahan", value: "2" },
    ];
    const daftarArt = [
        { nama: "Bagas" },
        { nama: "Jaje" },
        { nama: "Messi" },
        { nama: "Dodo" },
    ];
    // define forms
    const [blok4_1_hal2Form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const blok4_1_hal2Finish = (values: any) => {
        console.log({ values });
    };

    useEffect(() => {
        try {
            // fetchProvinsi();
            // fetchSemester();
        } catch (error) {}
    }, []);

    return (
        <Tabs
            type="line"
            style={{ backgroundColor: "#fff", padding: "10px" }}
            items={daftarArt.map((art, index) => {
                return {
                    label: art.nama,
                    key: String(index + 1),
                    children: (
                        <Art
                            onFinish={blok4_1_hal2Finish}
                            kunci={index}
                            rekapArt={rekapArt}
                            setRekapArt={setRekapArt}
                        />
                    ),
                };
            })}
        />
    );
};

export default Blok4_1;
