import { Form, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";

const { Text, Title } = Typography;

const Blok4_1_hal10: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    // record: any;
}> = ({ form, onFinish }) => {
    //    const konten =
    const konten = [
        {
            nomor: 128,
            kode_coicop: "01154001/4",
            rincian: "Minyak goreng (kelapa sawit, bunga matahari)",
            satuan: "Liter",
            type: "standar",
        },
        {
            nomor: 129,
            kode_coicop: "01167033",
            rincian: "Kelapa (tidak termasuk santan instan)",
            satuan: "Butir",
            type: "standar",
        },
        {
            nomor: 130,
            kode_coicop: "01151/52/53/54",
            rincian: "Minyak dan kelapa lainnya",
            satuan: "",
            type: "lain",
        },
        {
            nomor: 131,
            kode_coicop: "",
            rincian: "J. BAHAN MINUMAN [R.132 s.d. R.138]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 132,
            kode_coicop: "01181001",
            rincian: "Gula pasir",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 133,
            kode_coicop: "01181002",
            rincian: "Gula merah, gula air (pohom aren, kelapa, lontar)",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 134,
            kode_coicop: "01212001",
            rincian: "Teh bubuk",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 135,
            kode_coicop: "01212002",
            rincian: "Teh celup (sachet)",
            satuan: "2 gram",
            type: "standar",
        },
        {
            nomor: 136,
            kode_coicop: "01211001",
            rincian: "Kopi (bubuk, biji)",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 137,
            kode_coicop: "01211002",
            rincian: "Kopi instan (sachet)",
            satuan: "20 gram",
            type: "standar",
        },
        {
            nomor: 138,
            kode_coicop: "01222/3",
            rincian: "Bahan minuman lainnya",
            satuan: "",
            type: "lain",
        },
        {
            nomor: 139,
            kode_coicop: "",
            rincian: "K. BUMBU-BUMBUAN [R.140 s.d. R.153]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 140,
            kode_coicop: "01192001",
            rincian: "Garam",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 141,
            kode_coicop: "01192005",
            rincian: "Kemiri",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 142,
            kode_coicop: "01192006",
            rincian: "Ketumbar/jinten",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 143,
            kode_coicop: "01192007",
            rincian: "Merica/lada",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 144,
            kode_coicop: "01192003",
            rincian: "Jahe",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 145,
            kode_coicop: "01192000",
            rincian: "Kunyit",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 146,
            kode_coicop: "01173024",
            rincian: "Asam",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 147,
            kode_coicop: "01194003/4",
            rincian: "Terasi/petis",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 148,
            kode_coicop: "01191003",
            rincian: "Kecap",
            satuan: "100ml",
            type: "standar",
        },
        {
            nomor: 149,
            kode_coicop: "01194008",
            rincian: "Penyedap masakan/vetsin",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 150,
            kode_coicop: "01191005",
            rincian: "Sambal jadi",
            satuan: "100ml",
            type: "standar",
        },
        {
            nomor: 151,
            kode_coicop: "01191006-7",
            rincian: "Saus tomat",
            satuan: "100ml",
            type: "standar",
        },
        {
            nomor: 152,
            kode_coicop: "01194007",
            rincian: "Bumbu maskan jadi/kemasan, bumbu racikan",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 153,
            kode_coicop: "01192003/4",
            rincian: "Bumbu dapur lainnya (kencur, pala, kapulaga, dsb.)",
            satuan: "Gram",
            type: "standar",
        },
        {
            nomor: 154,
            kode_coicop: "",
            rincian: "L. BAHAN MAKANAN LAINNYA [R.155 s.d. R.158]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 155,
            kode_coicop: "01115012",
            rincian: "Mie instan",
            satuan: "Bungkus (80gr)",
            type: "standar",
        },
        {
            nomor: 156,
            kode_coicop: "01115018/9",
            rincian: "Kerupuk",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 157,
            kode_coicop: "01115013",
            rincian: "Bubur bayi kemasan",
            satuan: "Kotak kecil (150 gr)",
            type: "lain",
        },
        {
            nomor: 158,
            kode_coicop: "01112/15/76/94",
            rincian: "Lainnya",
            satuan: "",
            type: "",
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
                <Form.Item
                    style={{ margin: "auto" }}
                    name="hal10_jml_komoditas"
                >
                    <InputNumber
                        max={28}
                        style={{ width: "40px" }}
                    ></InputNumber>
                </Form.Item>
            </Space>
            <Form
                form={form}
                name="Blok4_1_hal10"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <TabelBlok konten={konten} title={title} />
            </Form>
        </Space>
    );
};

export default Blok4_1_hal10;
