import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input,
    InputRef,
    Select,
    Space,
    message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import { router } from "@inertiajs/react";

const formItemLayout = {
    wrapperCol: { span: 24 },
};
let indexJenis = 0;
let indexMerk = 0;
let indexTipe = 0;
const HistoryBarangForm: React.FC<{
    form: any;
    onFinish: (values: any) => void;
}> = ({ form, onFinish }) => {
    const [jenisItems, setJenisItems] = useState<string[]>([]);
    const [jenisName, setJenisName] = useState("");
    const [merkItems, setMerkItems] = useState<string[]>([]);
    const [merkName, setMerkName] = useState("");
    const inputRef = useRef<InputRef>(null);
    const [tipeItems, setTipeItems] = useState<string[]>([]);
    const [tipeName, setTipeName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const saveKey = "updatable";

    const onJenisNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJenisName(event.target.value);
    };
    const onMerkNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMerkName(event.target.value);
    };
    const onTipeNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipeName(event.target.value);
    };
    useEffect(() => {
        // call api jenis
        const fetchData = async () => {
            try {
                const jenisResponse = await axios.get(route("jenis.get"));
                const merkResponse = await axios.get(route("merk.get"));
                const tipeResponse = await axios.get(route("tipe.get"));

                // console.log({ arr: response.data[0] });
                let jenisItemsDB = jenisResponse.data[0].map(
                    (item: any) => item?.jenis
                );
                setJenisItems([...jenisItems, ...jenisItemsDB]);

                let merkItemsDB = merkResponse.data[0].map(
                    (item: any) => item?.merk
                );
                setMerkItems([...merkItems, ...merkItemsDB]);

                let tipeItemsDB = tipeResponse.data[0].map(
                    (item: any) => item?.tipe
                );
                setTipeItems([...tipeItems, ...tipeItemsDB]);

                // setJenisItems(response.data);
            } catch (error) {
                console.error({ error });
            }
            // console.log({ jenisItems });
        };
        fetchData();
    }, []);

    const addJenisItem = (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        event.preventDefault();
        setJenisItems([
            ...jenisItems,
            jenisName || `New jenis item ${indexJenis++}`,
        ]);
        setJenisName("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const addTipeItem = (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        event.preventDefault();
        setTipeItems([
            ...tipeItems,
            tipeName || `New jenis item ${indexTipe++}`,
        ]);
        setTipeName("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const addMerkItem = (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        event.preventDefault();
        setMerkItems([
            ...merkItems,
            merkName || `New jenis item ${indexMerk++}`,
        ]);
        setMerkName("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    return (
        <Form
            form={form}
            name="HistoryBarangForm"
            onFinish={onFinish}
            autoComplete="off"
            style={{ maxWidth: "600px" }}
            layout="vertical"
        >
            {contextHolder}
            <Form.Item
                {...formItemLayout}
                label="id"
                name="id"
                style={{ display: "none" }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Jenis"
                name="jenis"
                rules={[
                    {
                        required: true,
                        message: "Isian Jenis harus diisi",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Pilih Jenis"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space style={{ padding: "0 8px 4px" }}>
                                <Input
                                    placeholder="Please enter item"
                                    onChange={onJenisNameChanged}
                                />
                                <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    onClick={addJenisItem}
                                >
                                    Add item
                                </Button>
                            </Space>
                        </>
                    )}
                    options={jenisItems.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Merk"
                name="merk"
                rules={[
                    {
                        required: true,
                        message: "Isian Merk harus diisi",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Pilih Merk"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space style={{ padding: "0 8px 4px" }}>
                                <Input
                                    placeholder="Please enter item"
                                    ref={inputRef}
                                    value={merkName}
                                    onChange={onMerkNameChanged}
                                />
                                <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    onClick={addMerkItem}
                                >
                                    Add item
                                </Button>
                            </Space>
                        </>
                    )}
                    options={merkItems.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Tipe"
                name="tipe"
                rules={[
                    {
                        required: true,
                        message: "Isian Tipe harus diisi",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Pilih Tipe"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space style={{ padding: "0 8px 4px" }}>
                                <Input
                                    placeholder="Please enter item"
                                    ref={inputRef}
                                    value={tipeName}
                                    onChange={onTipeNameChanged}
                                />
                                <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    onClick={addTipeItem}
                                >
                                    Add item
                                </Button>
                            </Space>
                        </>
                    )}
                    options={tipeItems.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="Tahun Perolehan"
                name="tanggal_peroleh"
                rules={[
                    {
                        required: true,
                        message: "Isian Tahun Perolehan harus diisi",
                    },
                ]}
            >
                <DatePicker picker="date" />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Nomor Seri"
                name="nomor_seri"
                rules={[
                    {
                        required: true,
                        message: "Isian nomor seri harus diisi",
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};
export default HistoryBarangForm;
