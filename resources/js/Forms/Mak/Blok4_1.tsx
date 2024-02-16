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
import _debounce from "lodash/debounce";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Blok4_1_hal10 from "./Blok4_1_hal10";
import Blok4_1_hal2 from "./Blok4_1_hal2";
import Blok4_1_hal4 from "./Blok4_1_hal4";
import Blok4_1_hal6 from "./Blok4_1_hal6";
import Blok4_1_hal8 from "./Blok4_1_hal8";
import { RekapMak, SubTotal } from "@/types";

const { Text, Title } = Typography;

const Blok4_1: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    subTotalHarga: SubTotal[];
    calculate: ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => void;
    rekapMak: RekapMak[];
    setRekapMak: React.Dispatch<React.SetStateAction<RekapMak[]>>;

    // record: any;
}> = ({
    form,
    onFinish,
    tabContentStyle,
    subTotalHarga,
    calculate,
    rekapMak,
}) => {
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

    const [messageApi, contextHolder] = message.useMessage();

    function handleChange(activeKey: string): void {}

    return (
        <Form
            form={form}
            name="Blok4_1_hal2"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            onValuesChange={() =>
                _debounce(() => calculate({ subKey: 1, jenis: "beli" }), 600)()
            }
        >
            <Form.Item name="id_ruta">
                <Input placeholder="id rt" />
            </Form.Item>
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
                                form={form}
                                calculate={calculate}
                                rekapMak={rekapMak}
                            />
                        ),
                    },
                    {
                        label: "Hal 4",
                        key: "2",
                        children: (
                            <Blok4_1_hal4
                                form={form}
                                calculate={calculate}
                                rekapMak={rekapMak}
                            />
                        ),
                    },
                    {
                        label: "Hal 6",
                        key: "3",
                        children: (
                            <Blok4_1_hal6
                                form={form}
                                calculate={calculate}
                                rekapMak={rekapMak}
                            />
                        ),
                    },
                    {
                        label: "Blok 8",
                        key: "4",
                        children: (
                            <Blok4_1_hal8
                                form={form}
                                calculate={calculate}
                                rekapMak={rekapMak}
                            />
                        ),
                    },
                    {
                        label: "Blok 10",
                        key: "5",
                        children: (
                            <Blok4_1_hal10
                                form={form}
                                calculate={calculate}
                                rekapMak={rekapMak}
                            />
                        ),
                    },
                ]}
            />
        </Form>
    );
};

export default Blok4_1;
