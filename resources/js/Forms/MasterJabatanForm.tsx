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
let indexNama = 0;
let indexTingkat = 0;
const MasterJabatanForm: React.FC<{
    form: any;
    onFinish: (values: any) => void;
}> = ({ form, onFinish }) => {
    const [jenisItems, setJenisItems] = useState<string[]>([]);
    const [jenisName, setJenisName] = useState("");
    const [namaItems, setNamaItems] = useState<string[]>([]);
    const [namaName, setNamaName] = useState("");
    const inputRef = useRef<InputRef>(null);
    const [tingkatItems, setTingkatItems] = useState<string[]>([]);
    const [tingkatName, setTingkatName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const saveKey = "updatable";

    const onJenisNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJenisName(event.target.value);
    };
    const onNamaNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNamaName(event.target.value);
    };
    const onTingkatNameChanged = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTingkatName(event.target.value);
    };
    useEffect(() => {
        // call api jenis
        const fetchData = async () => {
            try {
                const namaResponse = await axios.get(
                    route("admin.master.jabatan.nama")
                );
                const jenisResponse = await axios.get(
                    route("admin.master.jabatan.jenis")
                );
                const tingkatResponse = await axios.get(
                    route("admin.master.jabatan.tingkat")
                );

                // console.log({ arr: response.data[0] });
                let jenisItemsDB = jenisResponse.data[0].map(
                    (item: any) => item?.jenis
                );
                setJenisItems([...jenisItems, ...jenisItemsDB]);

                let namaItemsDB = namaResponse.data[0].map(
                    (item: any) => item?.nama
                );
                setNamaItems([...namaItems, ...namaItemsDB]);

                let tingkatItemsDB = tingkatResponse.data[0].map(
                    (item: any) => item?.tingkat
                );
                setTingkatItems([...tingkatItems, ...tingkatItemsDB]);

                // setJenisItems(response.data);
            } catch (error) {
                console.log({ error });
            }
            console.log({ jenisItems });
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
    const addTingkatItem = (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        event.preventDefault();
        setTingkatItems([
            ...tingkatItems,
            tingkatName || `New jenis item ${indexTingkat++}`,
        ]);
        setTingkatName("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const addNamaItem = (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        event.preventDefault();
        setNamaItems([
            ...namaItems,
            namaName || `New jenis item ${indexNama++}`,
        ]);
        setNamaName("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    return (
        <Form
            form={form}
            name="masterJabatan"
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
                label="Nama"
                name="nama"
                rules={[
                    {
                        required: true,
                        message: "Isian Nama Jabatan harus diisi",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Pilih Nama Jabatan"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space style={{ padding: "0 8px 4px" }}>
                                <Input
                                    placeholder="Please enter item"
                                    onChange={onNamaNameChanged}
                                />
                                <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    onClick={addNamaItem}
                                >
                                    Add item
                                </Button>
                            </Space>
                        </>
                    )}
                    options={namaItems.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
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
                label="Tingkat Jabatan"
                name="tingkat"
                rules={[
                    {
                        required: true,
                        message: "Isian Tingkat Jabatan harus diisi",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Pilih Tingkat"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space style={{ padding: "0 8px 4px" }}>
                                <Input
                                    placeholder="Tingkat Jabatan"
                                    onChange={onTingkatNameChanged}
                                />
                                <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    onClick={addTingkatItem}
                                >
                                    Add item
                                </Button>
                            </Space>
                        </>
                    )}
                    options={tingkatItems.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
            </Form.Item>
        </Form>
    );
};
export default MasterJabatanForm;
