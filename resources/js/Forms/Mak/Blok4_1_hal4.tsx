import { Form, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";

const { Text, Title } = Typography;

const Blok4_1_hal4: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    // record: any;
}> = ({ form, onFinish }) => {
    //    const konten =
    const konten = [
        {
            nomor: 35,
            kode_coicop: "01131020",
            rincian: "Gurame",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 36,
            kode_coicop: "01131",
            rincian: "Ikan segar/basah lainnya",
            satuan: "Kg",
            type: "lain",
        },
        {
            nomor: 37,
            kode_coicop: "01132004",
            rincian: "Udang, lobster",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 38,
            kode_coicop: "01132001/6",
            rincian: "Cumi-cumi, sotong, gurita",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 39,
            kode_coicop: "01132007/2/8",
            rincian: "Ketam, kepiting, rajungan",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 40,
            kode_coicop: "01132003/10/12",
            rincian: "Kerang, siput, bekicot, remis",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 41,
            kode_coicop: "01132",
            rincian: "Udang dan hewan air lainnya yang segar lainnya",
            satuan: "Kg",
            type: "lain",
        },
        {
            nomor: 42,
            kode_coicop: "01133021/26/37",
            rincian: "Kembung diawetkan/peda",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 43,
            kode_coicop: "01133031",
            rincian: "Tenggiri diawetkan",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 44,
            kode_coicop: "01133033/34/08",
            rincian: "Tongkol/tuna/cakalang diawetkan",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 45,
            kode_coicop: "01133032",
            rincian: "Teri diawetkan",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 46,
            kode_coicop: "01133029",
            rincian: "Selar diawetkan",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 47,
            kode_coicop: "01133036",
            rincian: "Sepat diawetkan",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 48,
            kode_coicop: "01133002/3/4",
            rincian: "Bandeng diawetkan",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 49,
            kode_coicop: "01133011",
            rincian: "Gabus diawetkan",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 50,
            kode_coicop: "01134001",
            rincian: "Ikan dalam kaleng (sardencis, tuna dalam kaleng, dsb.)",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 51,
            kode_coicop: "01133",
            rincian: "Ikan diawetkan lainnya",
            satuan: "Ons",
            type: "lain",
        },
        {
            nomor: 52,
            kode_coicop: "01133035",
            rincian: "Udang diawetkan (ebi, rebon)",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 53,
            kode_coicop: "01133009",
            rincian: "Cumi-cumi, sotong, gurita diawetkan",
            satuan: "Ons",
            type: "standar",
        },
        {
            nomor: 54,
            kode_coicop: "01133",
            rincian: "Udang dan hewan air lainnya yang diawetkan",
            satuan: "Ons",
            type: "lain",
        },
        {
            nomor: 55,
            kode_coicop: "",
            rincian: "D. DAGING [R.56 s.d. R.64]",
            satuan: "",
            type: "sub",
        },
        {
            nomor: 56,
            kode_coicop: "01121001",
            rincian: "Daging sapi",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 57,
            kode_coicop: "01123001",
            rincian: "Daging kambing, domba/biri-biri",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 58,
            kode_coicop: "01122001",
            rincian: "Daging babi",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 59,
            kode_coicop: "01124003",
            rincian: "Daging ayam ras",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 60,
            kode_coicop: "01124002",
            rincian: "Daging ayam kampung",
            satuan: "Kg",
            type: "standar",
        },
        {
            nomor: 61,
            kode_coicop: "01121/22/23/24",
            rincian: "Daging segar lainnya",
            satuan: "Kg",
            type: "lain",
        },
        {
            nomor: 62,
            kode_coicop: "01125",
            rincian: "Daging diawetkan (sosis, abon, nugget, lainnya)",
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
                <Form.Item style={{ margin: "auto" }} name="hal4_jml_komoditas">
                    <InputNumber
                        max={27}
                        style={{ width: "40px" }}
                    ></InputNumber>
                </Form.Item>
            </Space>
            <Form
                form={form}
                name="Blok4_1_hal4"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <TabelBlok konten={konten} title={title} />
            </Form>
        </Space>
    );
};

export default Blok4_1_hal4;
