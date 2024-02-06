import { Form, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";

const { Text, Title } = Typography;

const Blok4_1_hal8: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    // record: any;
}> = ({ form, onFinish }) => {
    //    const konten =
    const konten = [
        {
            nomor: 95,
            kode_coicop: "01174006",
            rincian: "Bawang merah",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 96,
            kode_coicop: "01174007",
            rincian: "Bawang putih",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 97,
            kode_coicop: "01174005",
            rincian: "Bawang bombay",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 98,
            kode_coicop: "01173012",
            rincian: "Cabe merah",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 99,
            kode_coicop: "01173016",
            rincian: "Cabe hijau",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 100,
            kode_coicop: "01173013",
            rincian: "Cabe rawit",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 101,
            kode_coicop: "01171/72/73/74/76",
            rincian: "Sayur-sayuran lainnya",
            satuan: "Kg",
            type: "lain",
        },
        {
            nomor: 102,
            kode_coicop: "",
            rincian: "G. KACANG-KACANGAN [R.103 s.d. R.109]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 103,
            kode_coicop: "01168010",
            rincian: "Kacang tanah tanpa kulit",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 104,
            kode_coicop: "01168004",
            rincian: "Kacang kedele",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 105,
            kode_coicop: "01168",
            rincian: "Kacang lainnya",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 106,
            kode_coicop: "01194011",
            rincian: "Tahu",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 107,
            kode_coicop: "01194013",
            rincian: "Tempe",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 108,
            kode_coicop: "01194010",
            rincian: "Oncom",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 109,
            kode_coicop: "01194",
            rincian: "Hasil lain dari kacang-kacangan",
            satuan: "Ons",
            type: "lain",
        },
        {
            nomor: 110,
            kode_coicop: "",
            rincian: "H. BUAH-BUAHAN [R.111 s.d. R.125]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 111,
            kode_coicop: "01161001-33",
            rincian: "Jeruk, jeruk bali",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 112,
            kode_coicop: "01167002-14",
            rincian: "Mangga",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 113,
            kode_coicop: "01163001-9",
            rincian: "Apel",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 114,
            kode_coicop: "01167040-49",
            rincian: "Rambutan",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 115,
            kode_coicop: "01167050/098",
            rincian: "Duku, langsat",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 116,
            kode_coicop: "01167059-85",
            rincian: "Durian",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 117,
            kode_coicop: "01165008-11",
            rincian: "Salak",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 118,
            kode_coicop: "01162001",
            rincian: "Pisang ambon",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 119,
            kode_coicop: "01162002-14",
            rincian: "Pisang lainnya",
            satuan: "Kg",
            type: "lain",
        },
        {
            nomor: 120,
            kode_coicop: "01167022-27",
            rincian: "Pepaya",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 121,
            kode_coicop: "01167028-32",
            rincian: "Semangka",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 122,
            kode_coicop: "01173002",
            rincian: "Tomat buah",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 123,
            kode_coicop: "01165004-6",
            rincian: "Alpukat",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 124,
            kode_coicop: "01167053",
            rincian: "Jambu biji",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 125,
            kode_coicop: "",
            rincian: "Buah-buahan lainnya",
            satuan: "Kg",
            type: "lain",
        },
        {
            nomor: 126,
            kode_coicop: "",
            rincian: "I. MINYAK DAN KELAPA [R.127 s.d. R.130]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 127,
            kode_coicop: "01154003",
            rincian: "Minyak kelapa",
            satuan: "Liter",
            type: "standar",
        },
    ];
    const title =
        "BLOK IV.1. KONSUMSI DAN PENGELUARAN BAHAN MAKANAN, BAHAN MINUMAN, DAN ROKOK SEMINGGU TERAKHIR";

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Space
                style={{ width: "100%", justifyContent: "end" }}
                direction="horizontal"
            >
                <Text>
                    Jumlah komoditas bahan makanan,bahan minuman, dan rokok yang
                    terisi pada halaman ini
                </Text>
                <Form.Item style={{ margin: "auto" }} name="hal8_jml_komoditas">
                    <InputNumber
                        max={32}
                        style={{ width: "40px" }}
                    ></InputNumber>
                </Form.Item>
            </Space>
            <Form
                form={form}
                name="Blok4_1_hal8"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <TabelBlok konten={konten} title={title} />
            </Form>
        </Space>
    );
};

export default Blok4_1_hal8;
