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
    Typography,
    message,
} from "antd";
import { useEffect, useRef, useState } from "react";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text, Title } = Typography;

const Blok4_1_hal2: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    // record: any;
}> = ({ form, onFinish }) => {
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
    const [messageApi, contextHolder] = message.useMessage();
    const [daftarProv, setDaftarProv] = useState([
        { label: "[71] SULAWESI UTARA", value: "71" },
    ]);
    const [daftarKabKot, setDaftarKabKot] = useState([]);
    const [daftarKecamatan, setDaftarKecamatan] = useState([]);
    const [daftarDesa, setDaftarDesa] = useState([]);
    const [daftarSemester, setDaftarSemester] = useState([]);

    const [daftarNks, setDaftarNks] = useState([]);

    const [kabkotDisable, setKabkotDisable] = useState(true);
    const [semesterDisable, setSemesterDisable] = useState(true);
    const [nksDisable, setNksDisable] = useState(true);

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
            label: `[${item.kode}] ${item.nama}`,
            value: item.kode,
        }));
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
    const fetchNks = async () =>
        // kodeProv: string,
        // kodeKabkot: string,
        // semester: string
        {
            const url = route("api.entri.nks", {
                kodeKabkot: form.getFieldValue("kode_kab"),
                semester: form.getFieldValue("semester"),
            });

            const { data } = await axios.get(url);
            // console.log("====================================");
            // console.log(url);
            // console.log("====================================");
            const daftarNks = data.data.map((item: any) => ({
                label: item.kode_nks,
                value: item.kode_nks,
            }));
            setDaftarNks(daftarNks);
        };
    useEffect(() => {
        try {
            // fetchProvinsi();
            fetchKabkot();
            // fetchSemester();
        } catch (error) {}
    }, []);

    return (
        <>
            <Button type="primary" onClick={() => form.submit()}>
                Simpan
            </Button>
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
                <Button type="primary" style={{ margin: "auto" }}>
                    <Text
                        style={{
                            color: "#fff",
                            // marginBottom: "0px",
                            margin: "auto",
                            fontSize: "20px",
                            fontWeight: "600",
                        }}
                    >
                        VSUSENAS.MAK
                    </Text>
                </Button>
            </Space>
            <Form
                form={form}
                name="Blok4_1_hal2"
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
                                        defaultValue={"71"}
                                        options={daftarProv}
                                        // onChange={() => setKabkotDisable(false)}
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
                                    name="kode_kab"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        options={daftarKabKot}
                                        showSearch
                                        // onChange={() => setKabkotDisable(false)}
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
                                        options={daftarKecamatan}
                                        // onChange={() => setKabkotDisable(false)}
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
                                        options={daftarDesa}
                                        // onChange={() => setKabkotDisable(false)}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>105</td>
                            <td style={cellStyle}>
                                Klasifikasi Desa/Kelurahan
                            </td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="klas"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        options={daftarKlas}
                                        // onChange={() => setKabkotDisable(false)}
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
                                    <Input maxLength={4} />
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
                                    <Input maxLength={6} />
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
                                    name="108"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <InputNumber />
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
                                    name="109"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <InputNumber />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>110</td>
                            <td style={cellStyle}>Nama Kepala Rumah Tangga</td>
                            {/* <td style={cellStyle}>Sulawesi Utara</td> */}
                            <td style={cellStyle}>
                                <Form.Item
                                    name="110"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Input />
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
                                    name="111"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Input />
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
                            <th style={cellStyle}>Nama dan Kode</th>
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
                                    name="201_kode"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        // defaultValue={"0000"}
                                        options={[]}
                                        // onChange={() => setKabkotDisable(false)}
                                    />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item
                                    name="201_jabatan"
                                    style={formItemStyle}
                                    label={null}
                                >
                                    <Select
                                        // defaultValue={"0000"}
                                        showSearch
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
                                    name="201_waktu"
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
                                    name="202_kode"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        // defaultValue={"0000"}
                                        options={[]}
                                        // onChange={() => setKabkotDisable(false)}
                                    />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item
                                    name="202_jabatan"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        showSearch
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
                                    name="202_waktu"
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
                                <Form.Item
                                    name="203"
                                    label={null}
                                    style={formItemStyle}
                                >
                                    <Select
                                        showSearch
                                        // defaultValue={"0000"}
                                        options={[
                                            {
                                                label: "1. Terisi lengkap",
                                                value: "1",
                                            },
                                            {
                                                label: "2. Terisi tidak lengkap",
                                                value: "2",
                                            },
                                            {
                                                label: "3. Tidak ada ART/responden yang dapat memberi jawaban sampai akhir masa pencacahan",
                                                value: "3",
                                            },
                                            {
                                                label: "4. Responden menolak",
                                                value: "4",
                                            },
                                            {
                                                label: "5. Rumah tangga pindah/bangunan sensus sudah tidak ada",
                                                value: "5",
                                            },
                                        ]}
                                        // onChange={() => setKabkotDisable(false)}
                                    />
                                </Form.Item>
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
        </>
    );
};

export default Blok4_1_hal2;
