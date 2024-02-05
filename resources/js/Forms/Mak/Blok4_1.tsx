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
import Blok4_1_hal10 from "./Blok4_1_hal10";
import Blok4_1_hal2 from "./Blok4_1_hal2";
import Blok4_1_hal4 from "./Blok4_1_hal4";
import Blok4_1_hal6 from "./Blok4_1_hal6";
import Blok4_1_hal8 from "./Blok4_1_hal8";

const { Text, Title } = Typography;

const Blok4_1: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    // record: any;
}> = ({ form, onFinish, tabContentStyle }) => {
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
    // define forms
    const [blok4_1_hal2Form] = Form.useForm();
    const [blok4_1_hal4Form] = Form.useForm();
    const [blok4_1_hal6Form] = Form.useForm();
    const [blok4_1_hal8Form] = Form.useForm();
    const [blok4_1_hal10Form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const blok4_1_hal2Finish = (values: any) => {
        console.log({ values });
    };
    const blok4_1_hal4Finish = (values: any) => {
        console.log({ values });
    };
    const blok4_1_hal6Finish = (values: any) => {
        console.log({ values });
    };
    const blok4_1_hal8Finish = (values: any) => {
        console.log({ values });
    };
    const blok4_1_hal10Finish = (values: any) => {
        console.log({ values });
    };

    useEffect(() => {
        try {
            // fetchProvinsi();
            // fetchSemester();
        } catch (error) {}
    }, []);

    function handleChange(activeKey: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <Tabs
            onChange={handleChange}
            type="line"
            style={{ backgroundColor: "#fff", padding: "10px" }}
            items={[
                {
                    label: "Hal 2",
                    key: "1",
                    children: (
                        <Blok4_1_hal2
                            form={blok4_1_hal2Form}
                            onFinish={blok4_1_hal2Finish}
                        />
                    ),
                },
                {
                    label: "Hal 4",
                    key: "2",
                    children: (
                        <Blok4_1_hal4
                            form={blok4_1_hal4Form}
                            onFinish={blok4_1_hal4Finish}
                        />
                    ),
                },
                {
                    label: "Hal 6",
                    key: "3",
                    children: (
                        <Blok4_1_hal6
                            form={blok4_1_hal6Form}
                            onFinish={blok4_1_hal6Finish}
                        />
                    ),
                },
                {
                    label: "Blok 8",
                    key: "4",
                    children: (
                        <Blok4_1_hal8
                            form={blok4_1_hal8Form}
                            onFinish={blok4_1_hal8Finish}
                        />
                    ),
                },
                {
                    label: "Blok 10",
                    key: "5",
                    children: (
                        <Blok4_1_hal10
                            form={blok4_1_hal10Form}
                            onFinish={blok4_1_hal10Finish}
                        />
                    ),
                },
            ]}
        />
    );
};

export default Blok4_1;
