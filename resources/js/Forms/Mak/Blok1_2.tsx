import {
    Button,
    Divider,
    Form,
    FormInstance,
    Image,
    Input,
    InputNumber,
    Select,
    Space,
    Table,
    Typography,
    message,
} from "antd";
import { useEffect, useRef, useState } from "react";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import _debounce from "lodash/debounce";

import MetaSelect from "@/Components/MetaSelect";

const { Text, Title } = Typography;

const Blok1_2: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    setDaftarArt: (value: any) => void;
    editable: boolean;
    // record: any;
}> = ({ form, onFinish, tabContentStyle, setDaftarArt, editable }) => {
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
        { label: "[1] Desa", value: "1" },
        { label: "[2] Kelurahan", value: "2" },
    ];
    const [messageApi, contextHolder] = message.useMessage();
    const [daftarProv, setDaftarProv] = useState([
        { label: "[71] SULAWESI UTARA", value: "71" },
    ]);
    const [daftarKabKot, setDaftarKabKot] = useState([]);
    const [daftarKecamatan, setDaftarKecamatan] = useState([]);
    const [daftarDesa, setDaftarDesa] = useState([]);

    const [daftarNks, setDaftarNks] = useState([]);
    const [daftarBs4, setDaftarBs4] = useState([]);

    const [kabkot, setKabkot] = useState(null);
    const fetchProvinsi = async () => {
        const url = route("api.entri.provinsi");

        const { data } = await axios.get(url);

        const daftarProvinsi = data.data.map((item: any) => ({
            label: `[${item.kode}] ${item.nama}`,
            value: item.kode,
        }));
        setDaftarProv(daftarProvinsi);
    };

    const fetchKabkot = async () => {
        const url = route("api.entri.kabkot");

        const { data } = await axios.get(url);
        const daftarKabkot = data.data.map((item: any) => ({
            label: `[${item.kode_kabkot}] ${item.kabkot}`,
            value: item.kode_kabkot,
        }));
        // console.log({ data });

        form.setFieldValue("kode_kabkot", data.kode_kabkot);
        setKabkot(data.kode_kabkot);
        setDaftarKabKot(daftarKabkot);
    };
    const fetchSemester = async () => {
        const url = route("api.entri.semester");

        const { data } = await axios.get(url);
        const daftarKabkot = data.map((item: any) => ({
            label: item.label,
            value: item.value,
        }));
        setDaftarKabKot(daftarKabkot);
    };
    const fetchNks = async (value: string) =>
        // kodeProv: string,
        // kodeKabkot: string,
        // semester: string
        {
            const url = route("api.entri.nks", {
                kodeKabkot: form.getFieldValue("kode_kabkot"),
                kodeKec: form.getFieldValue("kode_kec"),
                kodeDesa: form.getFieldValue("kode_desa"),
                kodeBs4: form.getFieldValue("kode_bs4"),
                // semester: form.getFieldValue("semester"),
            });

            const { data } = await axios.get(url);
            const daftarNks = data.map((item: any) => ({
                label: item,
                value: item,
            }));
            setDaftarNks(daftarNks);
        };
    const fetchKecamatan = async (value: string) =>
        // kodeProv: string,
        // kodeKabkot: string,
        // semester: string
        {
            const url = route("api.entri.kec", {
                kodeKabkot: value,
            });

            const { data } = await axios.get(url);
            const daftarKec = data.map((item: any) => ({
                label: `[${item.kode_kec}] ${item.kec} `,
                value: item.kode_kec,
            }));
            setDaftarKecamatan(daftarKec);
        };
    const fetchDesa = async (value: string) =>
        // kodeProv: string,
        // kodeKabkot: string,
        // semester: string
        {
            const url = route("api.entri.desa", {
                kodeKabkot: form.getFieldValue("kode_kabkot"),
                kodeKec: form.getFieldValue("kode_kec"),
            });

            const { data } = await axios.get(url);
            const daftarDesa = data.map((item: any) => ({
                label: `[${item.kode_desa}] ${item.desa} `,
                value: item.kode_desa,
            }));
            setDaftarDesa(daftarDesa);
        };
    const fetchBs4 = async (value: string) =>
        // kodeProv: string,
        // kodeKabkot: string,
        // semester: string
        {
            const url = route("api.entri.bs4", {
                kodeKabkot: form.getFieldValue("kode_kabkot"),
                kodeKec: form.getFieldValue("kode_kec"),
                kodeDesa: form.getFieldValue("kode_desa"),
            });

            const { data } = await axios.get(url);
            const daftarBs4 = data.map((item: any) => ({
                label: item,
                value: item,
            }));
            setDaftarBs4(daftarBs4);
        };
    useEffect(() => {
        try {
            // fetchProvinsi();
            fetchKabkot();
            form.setFieldValue("kode_prov", "71");
            // fetchSemester();
        } catch (error) {}
    }, []);
    useEffect(() => {
        if (kabkot) {
            fetchKecamatan(kabkot);
        }
    }, [kabkot]);

    const debouncedSetDaftarArt = _debounce((value) => {
        setDaftarArt((prev: any) => {
            let current = [...prev];
            current[0].nama = value;
            return current;
        });
    }, 600);
    const handleNamaKk = (event: { target: { value: any } }) => {
        const value = event.target.value;
        debouncedSetDaftarArt(value);
    };
    return (
        <Space direction="vertical" style={tabContentStyle}>
            <Space
                style={{ width: "100%", justifyContent: "space-between" }}
                direction="horizontal"
            >
                {/* <Image src= /> */}
                <Space direction="vertical" align="start">
                    <Image {...imageProps} src="/images/bps.png" />
                </Space>
                <Space
                    direction="vertical"
                    style={{ alignContent: "center", textAlign: "center" }}
                >
                    <Image {...imageProps} src="/images/garuda.png" />
                    <Title level={5}>
                        SURVEI SOSIAL EKONOMI SEMESTER I 2024
                    </Title>
                    <Text>KETERANGAN KONSUMSI MAKANAN RUMAH TANGGA</Text>
                </Space>
                <Space
                    style={{
                        color: "#fff",
                        // marginBottom: "0px",
                        // padding: "10px 10px",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        fontSize: "20px",
                        backgroundColor: "rgb(78, 84, 200)",
                        fontWeight: "600",
                    }}
                >
                    VSUSENAS.MAK
                </Space>
            </Space>
            <Form
                form={form}
                name="Blok1_2"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <table style={tableStyle}>
                    <thead
                        style={{
                            backgroundColor: "#fc0",
                            textAlign: "center",
                        }}
                    >
                        <tr>
                            <td style={cellStyle} colSpan={4}>
                                <Space direction="vertical">
                                    <Title level={4}>
                                        BLOK I. KETERANGAN TEMPAT
                                    </Title>
                                    <Text>
                                        [ disalin dari Blok I kuesioner Seruti
                                        Inti (VSUSENAS.INTI) ]
                                    </Text>
                                </Space>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr hidden>
                            <td style={cellStyle}>000</td>
                            <td style={cellStyle}>Identitas Database</td>
                            <td style={cellStyle}>
                                <Form.Item name="id" label={null}>
                                    <InputNumber readOnly={editable} />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>101</td>
                            <td style={cellStyle}>Provinsi</td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="kode_prov"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        disabled
                                        defaultValue={"71"}
                                        options={daftarProv}
                                        onChange={() => {
                                            form.setFieldsValue({
                                                kode_kabkot: "",
                                                kode_kec: "",
                                                kode_desa: "",
                                                kode_bs4: "",
                                                klas: "",
                                                semester: "",
                                                nks: "",
                                            });

                                            setDaftarKecamatan([]);
                                            setDaftarDesa([]);
                                            setDaftarNks([]);
                                            setDaftarBs4([]);
                                        }}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>102</td>
                            <td style={cellStyle}>Kabupaten / Kota *)</td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="kode_kabkot"
                                    label={null}
                                    style={formItemStyle}
                                    required
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        disabled={
                                            !(
                                                form.getFieldValue(
                                                    "kode_kabkot"
                                                ) === "00"
                                            )
                                        }
                                        optionFilterProp="label"
                                        options={daftarKabKot}
                                        onChange={(value: string) => {
                                            form.setFieldsValue({
                                                kode_kec: "",
                                                kode_desa: "",
                                                klas: "",
                                                kode_bs4: "",
                                                semester: "",
                                                nks: "",
                                            });

                                            // setDaftarKecamatan([]);
                                            fetchKecamatan(value);
                                            setDaftarDesa([]);
                                            setDaftarNks([]);
                                            setDaftarBs4([]);
                                        }}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>103</td>
                            <td style={cellStyle}>Kecamatan</td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="kode_kec"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        optionFilterProp="label"
                                        options={daftarKecamatan}
                                        disabled={!editable}
                                        onChange={(value: string) => {
                                            form.setFieldsValue({
                                                kode_desa: "",
                                                kode_bs4: "",
                                                semester: "",
                                                nks: "",
                                            });

                                            fetchDesa(value);
                                            setDaftarDesa([]);
                                        }}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>104</td>
                            <td style={cellStyle}>Desa / Kelurahan *)</td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="kode_desa"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        disabled={!editable}
                                        optionFilterProp="label"
                                        options={daftarDesa}
                                        onChange={(value: string) => {
                                            form.setFieldsValue({
                                                kode_bs4: "",
                                                semester: "",
                                            });

                                            fetchBs4(value);
                                        }}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>105</td>
                            <td style={cellStyle}>
                                Klasifikasi Desa/Kelurahan
                            </td>
                            <td style={cellStyle}>
                                <Form.Item
                                    name="klas"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        disabled={!editable}
                                        optionFilterProp="label"
                                        options={daftarKlas}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>106</td>
                            <td style={cellStyle}>Nomor Blok Sensus</td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="kode_bs4"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        disabled={!editable}
                                        optionFilterProp="label"
                                        options={daftarBs4}
                                        onChange={(value: string) => {
                                            form.setFieldValue("nks", "");
                                            fetchNks(value);
                                        }}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>107</td>
                            <td style={cellStyle}>Nomor Kode Sampel</td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="nks"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        disabled={!editable}
                                        options={daftarNks}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>108</td>
                            <td style={cellStyle}>
                                Nomor Urut Bangunan Fisik di Sketsa Peta WB
                            </td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r108"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <InputNumber min={1} max={1000} />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>109</td>
                            <td style={cellStyle}>
                                Nomor Urut Sampel Rumah Tangga
                            </td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r109"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <InputNumber disabled={!editable} min={1} />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>110</td>
                            <td style={cellStyle}>Nama Kepala Rumah Tangga</td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r110"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Input
                                        minLength={2}
                                        onChange={handleNamaKk}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>110</td>
                            <td style={cellStyle}>
                                {" "}
                                Alamat (Nama Jalan/Gang/RT/RW/Dusun){" "}
                            </td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r111"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Input minLength={5} />
                                </Form.Item>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* blok 2  */}
                <Divider />
                <table style={tableStyle}>
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#fc0",
                                textAlign: "center",
                            }}
                        >
                            <td colSpan={6} style={cellStyle}>
                                <Space direction="vertical">
                                    <Title level={4}>
                                        BLOK II. KETERANGAN PENCACAH
                                    </Title>
                                    <Text>
                                        [ disalin dari Blok II kuesioner Seruti
                                        Inti (VSUSENAS.INTI) ]
                                    </Text>
                                </Space>
                            </td>
                        </tr>
                        <tr>
                            <th style={cellStyle} colSpan={2}>
                                Uraian
                            </th>
                            <th style={cellStyle}>Nama Petugas</th>
                            <th style={cellStyle}>Jabatan</th>
                            <th style={cellStyle}>Waktu</th>
                            <th style={cellStyle}>Tanda Tangan</th>
                        </tr>
                    </thead>
                    <tbody
                        style={{ borderStyle: "solid", border: "solid 1px" }}
                    >
                        <tr>
                            <td style={cellStyle}>201</td>
                            <td style={cellStyle}>Pencacah</td>

                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td>
                                <Form.Item
                                    name="r201_nama"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Input minLength={2} />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r201_jabatan"
                                    style={formItemStyle}
                                    label={null}
                                >
                                    <Select
                                        // defaultValue={"0000"}
                                        showSearch
                                        optionFilterProp="label"
                                        options={[
                                            {
                                                label: "1. Staf BPS Provinsi",
                                                value: "1",
                                            },
                                            {
                                                label: "2. Staf BPS Kab/Kota",
                                                value: "2",
                                            },
                                            { label: "3. KSK", value: "3" },
                                            { label: "4. Mitra", value: "4" },
                                        ]}
                                        // onChange={() => setKabkotDisable(false)}
                                    />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r201_waktu"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    {/* datepicker */}
                                </Form.Item>
                            </td>
                            <td style={cellStyle}></td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>202</td>
                            <td style={cellStyle}>Pengawas</td>

                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r202_nama"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Input minLength={2} />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r202_jabatan"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="label"
                                        options={[
                                            {
                                                label: "1. Staf BPS Provinsi",
                                                value: "1",
                                            },
                                            {
                                                label: "2. Staf BPS Kab/Kota",
                                                value: "2",
                                            },
                                            { label: "3. KSK", value: "3" },
                                            { label: "4. Mitra", value: "4" },
                                        ]}
                                    />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item
                                    name="r202_waktu"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    {/* datepicker */}
                                </Form.Item>
                            </td>
                            <td style={cellStyle}></td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>203</td>
                            <td style={cellStyle}>Hasil pencacahan</td>

                            {/* <td>Sulawesi Utara</td> */}
                            <td style={cellStyle} colSpan={4}>
                                <MetaSelect
                                    name="r203"
                                    options={[
                                        {
                                            label: "[1] Terisi lengkap",
                                            value: "1",
                                        },
                                        {
                                            label: "[2] Terisi tidak lengkap",
                                            value: "2",
                                        },
                                        {
                                            label: "[3] Tidak ada ART/responden yang dapat memberi jawaban sampai akhir masa pencacahan",
                                            value: "3",
                                        },
                                        {
                                            label: "[4] Responden menolak",
                                            value: "4",
                                        },
                                        {
                                            label: "[5] Rumah tangga pindah/bangunan sensus sudah tidak ada",
                                            value: "5",
                                        },
                                    ]}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {contextHolder}
                {/* Blok I  */}
                {/* <Form.Item name="kode_prov" label="Provinsi">
                    <Select
                        options={daftarProv}
                        onChange={() => setKabkotDisable(false)}
                    />
                </Form.Item> */}
            </Form>
        </Space>
    );
};

export default Blok1_2;
