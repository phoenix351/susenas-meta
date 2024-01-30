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
const MasterRuanganForm: React.FC<{
    form: any;
    onFinish: (values: any) => void;
}> = ({ form, onFinish }) => {
    const [namaItems, setNamaItems] = useState<string[]>([]);
    const [namaName, setNamaName] = useState("");
    const [penggunaItems, setPenggunaItems] = useState<string[]>([]);

    const inputRef = useRef<InputRef>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const saveKey = "updatable";

    const onNamaNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNamaName(event.target.value);
    };

    useEffect(() => {
        // call api jenis
        const fetchData = async () => {
            try {
                const namaResponse = await axios.get(
                    route("admin.master.ruangan.nama")
                );
                const penggunaResponse = await axios.get(route("users.get"));
                let penggunaItemsDB = penggunaResponse.data[0].map(
                    (item: any) => ({
                        id: item.id,
                        nama_lengkap: item.nama_lengkap,
                    })
                );
                setPenggunaItems([...penggunaItems, ...penggunaItemsDB]);

                let namaItemsDB = namaResponse.data[0].map(
                    (item: any) => item?.nama
                );
                setNamaItems([...namaItems, ...namaItemsDB]);

                // setJenisItems(response.data);
            } catch (error) {
                console.log({ error });
            }
        };
        fetchData();
    }, []);

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
            name="masterRuangan"
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
                <Input />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="Pegawai Pengguna"
                name="users_id"
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
        </Form>
    );
};
export default MasterRuanganForm;
