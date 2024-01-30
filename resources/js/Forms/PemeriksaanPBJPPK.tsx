import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input,
    Select,
    Upload,
    message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";

const PemeriksaanPBJPPK: React.FC<{
    form: any;
    // record: any;
}> = ({ form }) => {
    const formItemLayout = {
        wrapperCol: { span: 24 },
    };
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState<
        string | ArrayBuffer | null
    >(null);

    const handleChange = (info: any) => {
        // console.log({info})
        const { fileList } = info;

        const file = fileList.length > 0 ? fileList[0] : false;
        if (!file) {
            setFile(null);
            setPreviewImage(null);
            return false;
        }

        // console.log({file})
        if (file.originFileObj) {
            setFile(file);
            handlePreview(file);
        }
    };
    const handlePreview = async (file: any) => {
        console.log({ file });
        if (file.url) {
            setPreviewImage(file.url);
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file.originFileObj);
        }
    };
    const onFinish = async (values: any) => {
        // values.spek_path = values.spek_path.file;
        messageApi.open({
            key: "saveKey",
            content: "Sedang menambahkan data...",
            type: "loading",
        });
        try {
            const response = await axios.post(
                route("maintenance.inspect.pbj-ppk.store"),
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            messageApi.open({
                key: "saveKey",
                content: "Berhasil menambahkan data",
                type: "success",
            });
        } catch (error: any) {
            messageApi.open({
                key: "saveKey",
                content: error.message,
                type: "error",
            });
        }
    };
    const [daftarPerusahaan, setDaftarPerusahaan] = useState([]);
    const [daftarPj, setDaftarPj] = useState([]);

    const fetchData = async (getUrl: string) => {
        try {
            const response = await axios.get(getUrl);

            return response.data.data;
        } catch (error) {
            console.log("Error fetching data", error);
            throw error;
        }
    };

    useEffect(() => {
        const route_ = route("master.perusahaan.fetch");
        fetchData(route_).then((data) => {
            const daftar_perusahaan = data.map(
                (item: { nama: any; id: any }) => ({
                    label: item.nama,
                    value: item.id,
                })
            );
            setDaftarPerusahaan(daftar_perusahaan);
        });
    }, []);

    const handlePerusahaanChange = (value: any) => {
        const perusahaan_id = value;
        const route_ = route("master.perusahaan.fetch", {
            perusahaan_id: perusahaan_id,
        });
        fetchData(route_).then((data) => {
            const fieldsValue = {
                // nama_pj: data.nama_pj,
                // jabatan_pj: data.jabatan_pj,
                alamat: data.alamat,
                nomor_rekening: data.nomor_rekening,
                npwp: data.npwp,
            };
            form.setFieldsValue(fieldsValue);
            const route_ = route("master.perusahaan.pj.fetch", {
                perusahaan_id: perusahaan_id,
            });
            fetchData(route_).then((data) => {
                const daftar_pj = data.map((item: { nama: any; id: any }) => ({
                    label: item.nama,
                    value: item.id,
                }));
                setDaftarPj(daftar_pj);
            });
        });
    };
    const handlePjChange = (value: any) => {
        const penanggung_jawab_id = value;
        const route_ = route("master.perusahaan.pj.fetch", {
            perusahaan_id: 0,
            penanggung_jawab_id: penanggung_jawab_id,
        });
        fetchData(route_).then((data) => {
            const fieldsValue = {
                jabatan_pj: data.jabatan,
                email: data.email,
                nomor_wa: data.nomor_wa,
                // npwp: data.npwp,
            };
            form.setFieldsValue(fieldsValue);
        });
    };

    return (
        <>
            <Form
                form={form}
                name="HistoryBarangForm"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                {contextHolder}
                <Form.Item
                    {...formItemLayout}
                    label="sequence_id"
                    name="sequence_id"
                    // style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="barang_id"
                    name="barang_id"
                    style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="users_id"
                    name="users_id"
                    style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="merk"
                    name="merk"
                    // style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="tipe"
                    name="tipe"
                    // style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label="Estimasi Penyelesaian"
                    name="estimasi_penyelesaian"
                    rules={[
                        {
                            required: true,
                            message: "Estimasi Penyelesaian harus diisi",
                        },
                    ]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        format="DD MMMM YYYY" // Set the display format for the selected date
                        disabledDate={(current: any) => {
                            // Can not select days before today and today
                            return (
                                current &&
                                current <
                                    dayjs().subtract(1, "day").endOf("day")
                            );
                        }}
                    />
                </Form.Item>
                <b>Detail Penyedia</b>

                <Form.Item
                    {...formItemLayout}
                    label="Perusahaan"
                    name="perusahaan_id"
                    rules={[
                        {
                            required: true,
                            message: "Perusahaan harus dipilih",
                        },
                    ]}

                    // style={{ display: "none" }}
                >
                    {/* <Input readOnly={true} style={{ color: "#000" }} /> */}
                    <Select
                        onChange={(value) => handlePerusahaanChange(value)}
                        options={daftarPerusahaan}
                        allowClear={true}
                    />
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label="alamat"
                    name="alamat"
                    // style={{ display: "none" }}
                >
                    <Input readOnly={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="npwp"
                    name="npwp"
                    // style={{ display: "none" }}
                >
                    <Input readOnly={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="nomor_rekening"
                    name="nomor_rekening"
                    // style={{ display: "none" }}
                >
                    <Input readOnly={true} style={{ color: "#000" }} />
                </Form.Item>
                <b>Identitas Penanggung Jawab</b>
                <Form.Item
                    {...formItemLayout}
                    label="Nama Penanggung Jawab"
                    name="penanggung_jawab_id"
                    // style={{ display: "none" }}
                >
                    <Select
                        onChange={(value) => handlePjChange(value)}
                        options={daftarPj}
                        allowClear={true}
                    />
                    {/* <Input readOnly={true} style={{ color: "#000" }} /> */}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Jabatan Penanggun Jawab"
                    name="jabatan_pj"
                    // style={{ display: "none" }}
                >
                    <Input readOnly={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Email Penanggung Jawab"
                    name="email"
                    // style={{ display: "none" }}
                >
                    <Input readOnly={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Nomor HP Penanggun Jawab"
                    name="nomor_wa"
                    // style={{ display: "none" }}
                >
                    <Input readOnly={true} style={{ color: "#000" }} />
                </Form.Item>
            </Form>
        </>
    );
};

export default PemeriksaanPBJPPK;
