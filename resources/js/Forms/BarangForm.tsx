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
const disabledStyle = {
    color: "#000",
};
let indexJenis = 0;
let indexMerk = 0;
let indexTipe = 0;
const HistoryBarangForm: React.FC<{
    form: any;
    onFinish: (values: any) => void;
}> = ({ form, onFinish }) => {
    const [penggunaName, setPenggunaName] = useState("");
    const [penggunaItems, setPenggunaItems] = useState<string[]>([]);
    const [jenisItems, setJenisItems] = useState<string[]>([]);
    const [jenisName, setJenisName] = useState("");

    const [lokasiItems, setLokasiItems] = useState<string[]>([]);
    const [lokasiName, setLokasiName] = useState("");

    const inputRef = useRef<InputRef>(null);

    const [messageApi, contextHolder] = message.useMessage();
    const saveKey = "updatable";

    const onPenggunaNameChanged = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPenggunaName(event.target.value);
    };

    useEffect(() => {
        // call api jenis
        const fetchData = async () => {
            try {
                const penggunaResponse = await axios.get(route("users.get"));
                const lokasiResponse = await axios.get(route("lokasi.get"));

                // console.log({ arr: response.data[0] });
                let penggunaItemsDB = penggunaResponse.data[0].map(
                    (item: any) => ({
                        id: item.id,
                        nama_lengkap: item.nama_lengkap,
                    })
                );
                setPenggunaItems([...penggunaItems, ...penggunaItemsDB]);

                let lokasiDB = lokasiResponse.data[0].map((item: any) => ({
                    id: item.id,
                    name: item.nama,
                }));

                setLokasiItems([...lokasiItems, ...lokasiDB]);

                // setJenisItems(response.data);
            } catch (error) {
                console.log({ error });
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
                label="Pegawai Pengguna"
                name="pengguna_id"
                rules={[
                    {
                        required: true,
                        message: "Isian Pengguna harus diisi",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Pilih Pengguna"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                        </>
                    )}
                    options={penggunaItems.map((item: any) => ({
                        label: item.nama_lengkap,
                        value: item.id,
                    }))}
                    optionFilterProp="label"
                />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Lokasi Barang"
                name="ruangan_id"
                rules={[
                    {
                        required: true,
                        message: "Isian nomor seri harus diisi",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Pilih Lokasi"
                    onSearch={(value) => {}}
                    optionFilterProp="label"
                    options={lokasiItems.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                    }))}
                />
            </Form.Item>

            <Divider />
            <Form.Item
                {...formItemLayout}
                label="Jenis"
                name="jenis"
                // rules={[
                //     {
                //         required: true,
                //         message: "Isian Jenis harus diisi",
                //     },
                // ]}
            >
                <Input disabled style={disabledStyle} />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="merk"
                name="merk"
                // rules={[
                //     {
                //         required: true,
                //         message: "Isian Jenis harus diisi",
                //     },
                // ]}
            >
                <Input disabled style={disabledStyle} />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="tipe"
                name="tipe"
                // rules={[
                //     {
                //         required: true,
                //         message: "Isian Jenis harus diisi",
                //     },
                // ]}
                style={disabledStyle}
            >
                <Input disabled style={disabledStyle} />
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="Tanggal Peroleh"
                name="tanggal_peroleh"
            >
                <DatePicker disabled style={disabledStyle} />
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
                <Input disabled style={disabledStyle} />
            </Form.Item>
        </Form>
    );
};
export default HistoryBarangForm;
