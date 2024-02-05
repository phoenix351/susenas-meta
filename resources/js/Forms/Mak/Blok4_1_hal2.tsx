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
        // wrapperCol: { Text: 24 },
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
    const blokStyle: React.CSSProperties = {
        backgroundColor: "#fc0",
        fontWeight: "700",
    };
    const cellStyle = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        // textAlign: "center",
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
        <Space direction="vertical" style={{ width: "100%" }}>
            <Space
                style={{ width: "", justifyContent: "space-between" }}
                direction="horizontal"
            >
                <Space direction="horizontal">
                    <Text>Waktu mulai wawancara :</Text>
                    <Form.Item
                        style={{ margin: "auto" }}
                        name="waktu_mulai_jam"
                    >
                        <InputNumber max={23}></InputNumber>
                    </Form.Item>
                    <Form.Item
                        style={{ margin: "auto" }}
                        name="waktu_mulai_menit"
                    >
                        <InputNumber max={59}></InputNumber>
                    </Form.Item>
                </Space>
                <Space>
                    <Text>
                        Jumlah komoditas bahan makanan,bahan minuman, dan rokok
                        yang terisi pada halaman ini
                    </Text>
                    <Form.Item
                        style={{ margin: "auto" }}
                        name="hal2_jml_komoditas"
                    >
                        <InputNumber max={59}></InputNumber>
                    </Form.Item>
                </Space>
            </Space>
            <Form
                form={form}
                name="Blok4_1_hal2"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <table style={tableStyle}>
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#fc0",
                                textAlign: "center",
                            }}
                        >
                            <th style={cellStyle} colSpan={10}>
                                <Space direction="vertical">
                                    <Title level={4}>
                                        BLOK IV.1. KONSUMSI DAN PENGELUARAN
                                        BAHAN MAKANAN, BAHAN MINUMAN, DAN ROKOK
                                        SEMINGGU TERAKHIR
                                    </Title>
                                </Space>
                            </th>
                        </tr>
                        <tr>
                            <th style={cellStyle} rowSpan={2}>
                                No Urut
                            </th>{" "}
                            <th style={cellStyle} rowSpan={2}>
                                Kode COICOP
                            </th>{" "}
                            <th style={cellStyle} rowSpan={2}>
                                Rincian
                            </th>{" "}
                            <th style={cellStyle} rowSpan={2}>
                                Satuan standar
                            </th>{" "}
                            <th style={cellStyle} colSpan={2}>
                                Berasal dari pembelian (tunai/bon)
                            </th>{" "}
                            <th style={cellStyle} colSpan={2}>
                                Berasal dari produksi sendiri, pemberian, dsb
                            </th>{" "}
                            <th style={cellStyle} colSpan={2}>
                                Jumlah konsumsi
                            </th>
                        </tr>
                        <tr>
                            <th style={cellStyle}>Banyaknya (0,00)</th>{" "}
                            <th style={cellStyle}>Nilai (Rp)</th>{" "}
                            <th style={cellStyle}>Banyaknya (0,00)</th>{" "}
                            <th style={cellStyle}>Nilai (Rp)</th>{" "}
                            <th style={cellStyle}>
                                Banyaknya (5) + (7) (0,00)
                            </th>{" "}
                            <th style={cellStyle}>Nilai (6) + (8) (Rp)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width="55px" style={cellStyle}>
                                (1)
                            </td>
                            <td width="130px" style={cellStyle}>
                                (2)
                            </td>
                            <td style={cellStyle}>(3)</td>
                            <td width="80px" style={cellStyle}>
                                (4)
                            </td>
                            <td width="100px" style={cellStyle}>
                                (5)
                            </td>
                            <td style={cellStyle}>(6)</td>
                            <td width="100px" style={cellStyle}>
                                (7)
                            </td>
                            <td style={cellStyle}>(8)</td>
                            <td width="100px" style={cellStyle}>
                                (9)
                            </td>
                            <td style={cellStyle}>(10)</td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>1</td>
                            <td style={cellStyle}></td>
                            <td colSpan={2} style={blokStyle}>
                                A. PADI-PADIAN [R.2 s.d. R.7]
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>2</td>
                            <td style={cellStyle}>01111001</td>
                            <td style={cellStyle}>
                                <Text>
                                    Beras (beras lokal, medium, premium, dan
                                    impor)
                                </Text>
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="1_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="1_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="1_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="1_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="1_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="1_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>3</td>
                            <td style={cellStyle}>01111003</td>
                            <td style={cellStyle}>
                                <Text>Beras ketan</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>4</td>
                            <td style={cellStyle}>01111006</td>
                            <td style={cellStyle}>
                                <Text>Jagung basah dengan kulit</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>5</td>
                            <td style={cellStyle}>01111005/2</td>
                            <td style={cellStyle}>
                                <Text>
                                    Jagung pipilan/beras jagung/jagung titi
                                </Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>6</td>
                            <td style={cellStyle}>01115005</td>
                            <td style={cellStyle}>
                                <Text>Tepung terigu</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>7</td>
                            <td style={cellStyle}>0111</td>
                            <td style={cellStyle}>
                                <Text>Padi-padian lainnya</Text>{" "}
                                <Form.Item>
                                    <Input placeholder="Sebutkan" />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>8</td>
                            <td style={cellStyle}></td>
                            <td colSpan={2} style={blokStyle}>
                                B. UMBI-UMBIAN [R.9 s.d. R.15]
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>9</td>
                            <td style={cellStyle}>01178001</td>
                            <td style={cellStyle}>
                                <Text>Ketala pohon/singkong</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>10</td>
                            <td style={cellStyle}>01178002</td>
                            <td style={cellStyle}>
                                <Text>Ketela rambat/ubi jalar</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>11</td>
                            <td style={cellStyle}>01115007</td>
                            <td style={cellStyle}>
                                <Text>Sagu (bukan dari ketela pohon)</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>12</td>
                            <td style={cellStyle}>01178004</td>
                            <td style={cellStyle}>
                                <Text>Talas/keladi</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>13</td>
                            <td style={cellStyle}>01177000</td>
                            <td style={cellStyle}>
                                <Text>Kentang</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>14</td>
                            <td style={cellStyle}>01178001</td>
                            <td style={cellStyle}>
                                <Text>Gaplek</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>15</td>
                            <td style={cellStyle}>01178</td>
                            <td style={cellStyle}>
                                <Text>Umbi-umbian lainnya</Text>{" "}
                                <Form.Item>
                                    <Input placeholder="Sebutkan" />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>16</td>
                            <td style={cellStyle}></td>
                            <td colSpan={2} style={blokStyle}>
                                C. IKAN/UDANG/CUMI/KERANG [R.17 s.d. R.54]
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>
                                <Form.Item name="">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>17</td>
                            <td style={cellStyle}>01131017</td>
                            <td style={cellStyle}>
                                <Text>Ekor kuning</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>18</td>
                            <td style={cellStyle}>01131069</td>
                            <td style={cellStyle}>
                                <Text>Tongkol</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>19</td>
                            <td style={cellStyle}>01131072</td>
                            <td style={cellStyle}>
                                <Text>Tuna</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>20</td>
                            <td style={cellStyle}>01131013</td>
                            <td style={cellStyle}>
                                <Text>Cakalang, dencis</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>21</td>
                            <td style={cellStyle}>01131065</td>
                            <td style={cellStyle}>
                                <Text>Tenggiri</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>22</td>
                            <td style={cellStyle}>01131057</td>
                            <td style={cellStyle}>
                                <Text>Selar</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>23</td>
                            <td style={cellStyle}>01131028</td>
                            <td style={cellStyle}>
                                <Text>
                                    Kembung, lema/tatare, banyar/banyara
                                </Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>24</td>
                            <td style={cellStyle}>01131067</td>
                            <td style={cellStyle}>
                                <Text>Teri basah</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>25</td>
                            <td style={cellStyle}>01131003</td>
                            <td style={cellStyle}>
                                <Text>Bandeng</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>26</td>
                            <td style={cellStyle}>01131018</td>
                            <td style={cellStyle}>
                                <Text>Gabus</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>27</td>
                            <td style={cellStyle}>01131045</td>
                            <td style={cellStyle}>
                                <Text>Mujair</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>28</td>
                            <td style={cellStyle}>01131041</td>
                            <td style={cellStyle}>
                                <Text>Mas</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>29</td>
                            <td style={cellStyle}>01131046</td>
                            <td style={cellStyle}>
                                <Text>Nila</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>30</td>
                            <td style={cellStyle}>01131035</td>
                            <td style={cellStyle}>
                                <Text>Lele</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>31</td>
                            <td style={cellStyle}>01131023/24</td>
                            <td style={cellStyle}>
                                <Text>Kakap</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>32</td>
                            <td style={cellStyle}>01131004</td>
                            <td style={cellStyle}>
                                <Text>Baronang</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>33</td>
                            <td style={cellStyle}>01131051</td>
                            <td style={cellStyle}>
                                <Text>Patin</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>34</td>
                            <td style={cellStyle}>01131006</td>
                            <td style={cellStyle}>
                                <Text>Bawal</Text>{" "}
                            </td>
                            <td style={cellStyle}>
                                <Text>Kg</Text>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_beli_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_prod_dsb_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_vol">
                                    <Input />
                                </Form.Item>
                            </td>
                            <td style={cellStyle}>
                                <Form.Item name="2_jml_hrg">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </Space>
    );
};

export default Blok4_1_hal2;
