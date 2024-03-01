import RupiahInput from "@/Components/RupiahInput";
import { Form, Input, Select, Radio } from "antd";
import form, { FormInstance } from "antd/es/form";
import axios from "axios";
import { useEffect, useState } from "react";

const CreateUserForm: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    kode_kabkot: string;
}> = ({ form, onFinish, kode_kabkot }) => {
    const [listKabkot, setListKabkot] = useState([]);

    useEffect(() => {
        const fetchKabkot = async (kode_kabkot: string) => {
            const { data } = await axios.get(
                // route("api.entri.kabkot")
                route("api.entri.kabkot", { kode_kabkot: kode_kabkot })
            );
            // console.log({ data });
            let listData = data.data.map(
                (item: { kode_kabkot: any; kabkot: any }) => ({
                    label: `[${item.kode_kabkot}] ${item.kabkot}`,
                    value: item.kode_kabkot,
                })
            );
            if (kode_kabkot === "00") {
                listData.push({
                    label: `[00] SULAWESI UTARA`,
                    value: kode_kabkot,
                });
            }
            setListKabkot(listData);
        };
        fetchKabkot(kode_kabkot);
    }, [kode_kabkot]);

    const listRole: any[] | undefined = [
        { label: "PML", value: "PML" },
        { label: "ADMIN", value: "ADMIN" },
    ];
    return (
        <Form
            form={form}
            name="CreateUserForm"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item hidden name="id">
                <Input readOnly />
            </Form.Item>
            <Form.Item
                label="Assignment"
                name="kode_kabkot"
                // style={{ display: "none" }}
                rules={[
                    {
                        required: true,
                        message: "Silahkan Pilih Assignment",
                    },
                ]}
            >
                <Select options={listKabkot} />
            </Form.Item>
            <Form.Item
                label="Nama Petugas"
                name="nama_lengkap"
                // style={{ display: "none" }}
                rules={[
                    {
                        required: true,
                        message: "Silahkan masukkan nama petugas",
                    },
                ]}
            >
                <Input style={{ color: "#000" }} autoComplete="off" />
            </Form.Item>
            <Form.Item
                label="Kode Identitas (NIP/NIK)"
                name="nip"
                rules={[
                    {
                        pattern: /^[0-9]*$/,
                        message: "Please enter only numbers.",
                    },
                    {
                        required: true,
                        message: "Silahkan masukkan kode identitas",
                    },
                ]}
            >
                <Input style={{ color: "#000" }} />
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        pattern: /^[a-z0-9_]*$/,
                        message:
                            "Please enter only lowercase letters, numbers, and underscores.",
                    },
                    {
                        required: true,
                        message: "Silahkan isi username",
                    },
                ]}
            >
                <Input style={{ color: "#000" }} />
            </Form.Item>

            <Form.Item
                label="Password (isi apabila ingin diganti)"
                name="password"
                rules={[
                    {
                        min: 5,
                        message: "panjang minimal 5 karakter",
                    },
                ]}
            >
                <Input style={{ color: "#000" }} type="password" />
            </Form.Item>

            <Form.Item
                label="Peran"
                name="role"
                // style={{ display: "none" }}
                rules={[
                    {
                        required: true,
                        message: "Silahkan peran petugas",
                    },
                ]}
            >
                <Select
                    showSearch
                    options={listRole}
                    style={{ color: "#000" }}
                />
            </Form.Item>
        </Form>
    );
};

export default CreateUserForm;
