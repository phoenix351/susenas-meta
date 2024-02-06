import { Form, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";

const { Text, Title } = Typography;

const Blok4_1_hal6: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    // record: any;
}> = ({ form, onFinish }) => {
    //    const konten =
    const konten = [
        {
            nomor: 63,
            kode_coicop: "01121005",
            rincian: "Tetelan, sandung lamur",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 64,
            kode_coicop: "01127",
            rincian: "Lainnya ( hati, jeroan, iga, kaki, buntut, kepala, dsb)",
            satuan: "Kg",
            type: "lain",
        },
        {
            nomor: 65,
            kode_coicop: "",
            rincian: "E. TELUR DAN SUSU [R.66 s.d. R.74]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 66,
            kode_coicop: "01147002",
            rincian: "Telur ayam ras",
            satuan: "Butir",
            type: "standar",
        },
        {
            nomor: 67,
            kode_coicop: "01147001",
            rincian: "Telur ayam kampung",
            satuan: "Butir",
            type: "standar",
        },
        {
            nomor: 68,
            kode_coicop: "01147003",
            rincian: "Telur itik/telur itik manila",
            satuan: "Butir",
            type: "standar",
        },
        {
            nomor: 69,
            kode_coicop: "01147005/ 11111003/ 01147004",
            rincian:
                "Telur lainnya (telur puyuh, telur asin mentah maupun matang, telur penyu, telur angsa, dsb)",
            satuan: "Butir",
            type: "lain",
        },
        {
            nomor: 70,
            kode_coicop: "01143003",
            rincian: "Susu cair pabrik",
            satuan: "Kotak kecil (250ml)",
            type: "standar",
        },
        {
            nomor: 71,
            kode_coicop: "01143005",
            rincian: "Susu kental manis",
            satuan: "Kaleng (397gr)",
            type: "standar",
        },
        {
            nomor: 72,
            kode_coicop: "01143001/2",
            rincian: "Susu bubuk",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 73,
            kode_coicop: "01143007",
            rincian: "Susu bubuk bayi",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 74,
            kode_coicop: "01141/45/46",
            rincian: "Susu lainnya dan Hasil lain dari susu",
            satuan: "",
            type: "lain",
        },
        {
            nomor: 75,
            kode_coicop: "",
            rincian: "F. SAYUR-SAYURAN [R.76 s.d. R.101]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 76,
            kode_coicop: "01171012",
            rincian: "Bayam",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 77,
            kode_coicop: "01171014",
            rincian: "Kangkung",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 78,
            kode_coicop: "01172001/2/3",
            rincian: "Kol/kubis",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 79,
            kode_coicop: "01171016",
            rincian: "Sawi putih (petsai)",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 80,
            kode_coicop: "01171015",
            rincian: "Sawi hijau",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 81,
            kode_coicop: "01173003",
            rincian: "Buncis",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 82,
            kode_coicop: "01173008",
            rincian: "Kacang panjang",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 83,
            kode_coicop: "01173005",
            rincian: "Tomat sayur, tomat ceri",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 84,
            kode_coicop: "01174001",
            rincian: "Wortel",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 85,
            kode_coicop: "01173004",
            rincian: "Mentimun",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 86,
            kode_coicop: "01171010",
            rincian: "Daun ketela pohon/daun singkong",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 87,
            kode_coicop: "01173023/26",
            rincian: "Terong",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 88,
            kode_coicop: "01171017",
            rincian: "Tauge",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 89,
            kode_coicop: "01173014/15",
            rincian: "Labu, labu siam, labu parang",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 90,
            kode_coicop: "01171026",
            rincian: "Bahan sayur sop/capcay/ kimlo (paket)",
            satuan: "Bungkus",
            type: "standar",
        },
        {
            nomor: 91,
            kode_coicop: "01171024/25",
            rincian: "Bahan sayur asam/lodeh (paket)",
            satuan: "Bungkus",
            type: "standar",
        },
        {
            nomor: 92,
            kode_coicop: "01173017",
            rincian: "Nangka muda",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 93,
            kode_coicop: "01173020",
            rincian: "Pepaya muda",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 94,
            kode_coicop: "01173022",
            rincian: "Jengkol",
            satuan: "Kg",
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
                <Form.Item style={{ margin: "auto" }} name="hal6_jml_komoditas">
                    <InputNumber
                        max={30}
                        style={{ width: "40px" }}
                    ></InputNumber>
                </Form.Item>
            </Space>
            <Form
                form={form}
                name="Blok4_1_hal6"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <TabelBlok konten={konten} title={title} />
            </Form>
        </Space>
    );
};

export default Blok4_1_hal6;
