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

let indexArsitektur = 0;

const MasterSistemOperasiForm: React.FC<{
    form: any;
    onFinish: (values: any) => void;
}> = ({ form, onFinish }) => {
    const [arsitekturItems, setArsitekturItems] = useState<string[]>([]);
    const [arsitekturName, setArsitekturName] = useState("");
    const [namaItems, setNamaItems] = useState<string[]>([]);
    const [namaName, setNamaName] = useState("");
    const inputRef = useRef<InputRef>(null);
    const [tingkatItems, setTingkatItems] = useState<string[]>([]);
    const [tingkatName, setTingkatName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const saveKey = "updatable";

    const onArsitekturNameChanged = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setArsitekturName(event.target.value);
    };

    useEffect(() => {
        // call api jenis
        const fetchData = async () => {
            try {
                // const namaResponse = await axios.get(
                //     route("admin.master.sistem_operasi.nama")
                // );
                const arsitekturResponse = await axios.get(
                    route("admin.master.sistem_operasi.arsitektur")
                );

                // console.log({ arr: response.data[0] });
                let arsitekturItemsDB = arsitekturResponse.data[0].map(
                    (item: any) => item?.arsitektur
                );
                setArsitekturItems([...arsitekturItems, ...arsitekturItemsDB]);

                // let namaItemsDB = namaResponse.data[0].map(
                //     (item: any) => item?.nama
                // );
                // setNamaItems([...namaItems, ...namaItemsDB]);

                // setJenisItems(response.data);
            } catch (error) {
                console.log({ error });
            }
        };
        fetchData();
    }, []);

    const addArsitekturItem = (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        event.preventDefault();
        setArsitekturItems([
            ...arsitekturItems,
            arsitekturName || `New Arsitektur item ${indexArsitektur++}`,
        ]);
        setArsitekturName("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <Form
            form={form}
            name="masterSistemOperasi"
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
                <Input placeholder="Ketik Nama Sistem Operasi" />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="arsitektur"
                name="arsitektur"
                rules={[
                    {
                        required: true,
                        message: "Isian Arsitektur harus diisi",
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Pilih Arsitektur"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space style={{ padding: "0 8px 4px" }}>
                                <Input
                                    placeholder="Please enter item"
                                    onChange={onArsitekturNameChanged}
                                />
                                <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    onClick={addArsitekturItem}
                                >
                                    Add item
                                </Button>
                            </Space>
                        </>
                    )}
                    options={arsitekturItems.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
            </Form.Item>
        </Form>
    );
};
export default MasterSistemOperasiForm;
