import { Form, FormInstance, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { useEffect } from "react";
import { SubTotal } from "@/types";

const { Text, Title } = Typography;
const konten = [
    {
        nomor: 35,
        kode_coicop: "01131020",
        rincian: "Gurame",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 36,
        kode_coicop: "01131",
        rincian: "Ikan segar/basah lainnya",
        satuan: "Kg",
        type: "lain",
        subKey: 2,
    },
    {
        nomor: 37,
        kode_coicop: "01132004",
        rincian: "Udang, lobster",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 38,
        kode_coicop: "01132001/6",
        rincian: "Cumi-cumi, sotong, gurita",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 39,
        kode_coicop: "01132007/2/8",
        rincian: "Ketam, kepiting, rajungan",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 40,
        kode_coicop: "01132003/10/12",
        rincian: "Kerang, siput, bekicot, remis",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 41,
        kode_coicop: "01132",
        rincian: "Udang dan hewan air lainnya yang segar lainnya",
        satuan: "Kg",
        type: "lain",
        subKey: 2,
    },
    {
        nomor: 42,
        kode_coicop: "01133021/26/37",
        rincian: "Kembung diawetkan/peda",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 43,
        kode_coicop: "01133031",
        rincian: "Tenggiri diawetkan",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 44,
        kode_coicop: "01133033/34/08",
        rincian: "Tongkol/tuna/cakalang diawetkan",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 45,
        kode_coicop: "01133032",
        rincian: "Teri diawetkan",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 46,
        kode_coicop: "01133029",
        rincian: "Selar diawetkan",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 47,
        kode_coicop: "01133036",
        rincian: "Sepat diawetkan",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 48,
        kode_coicop: "01133002/3/4",
        rincian: "Bandeng diawetkan",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 49,
        kode_coicop: "01133011",
        rincian: "Gabus diawetkan",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 50,
        kode_coicop: "01134001",
        rincian: "Ikan dalam kaleng (sardencis, tuna dalam kaleng, dsb.)",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 51,
        kode_coicop: "01133",
        rincian: "Ikan diawetkan lainnya",
        satuan: "Ons",
        type: "lain",
        subKey: 2,
    },
    {
        nomor: 52,
        kode_coicop: "01133035",
        rincian: "Udang diawetkan (ebi, rebon)",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 53,
        kode_coicop: "01133009",
        rincian: "Cumi-cumi, sotong, gurita diawetkan",
        satuan: "Ons",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 54,
        kode_coicop: "01133",
        rincian: "Udang dan hewan air lainnya yang diawetkan",
        satuan: "Ons",
        type: "lain",
        subKey: 2,
    },
    {
        nomor: 55,
        kode_coicop: "",
        rincian: "D. DAGING [R.56 s.d. R.64]",
        satuan: "",
        type: "sub",
        subKey: 3,
    },
    {
        nomor: 56,
        kode_coicop: "01121001",
        rincian: "Daging sapi",
        satuan: "Kg",
        type: "standar",
        subKey: 3,
    },
    {
        nomor: 57,
        kode_coicop: "01123001",
        rincian: "Daging kambing, domba/biri-biri",
        satuan: "Kg",
        type: "standar",
        subKey: 3,
    },
    {
        nomor: 58,
        kode_coicop: "01122001",
        rincian: "Daging babi",
        satuan: "Kg",
        type: "standar",
        subKey: 3,
    },
    {
        nomor: 59,
        kode_coicop: "01124003",
        rincian: "Daging ayam ras",
        satuan: "Kg",
        type: "standar",
        subKey: 3,
    },
    {
        nomor: 60,
        kode_coicop: "01124002",
        rincian: "Daging ayam kampung",
        satuan: "Kg",
        type: "standar",
        subKey: 3,
    },
    {
        nomor: 61,
        kode_coicop: "01121/22/23/24",
        rincian: "Daging segar lainnya",
        satuan: "Kg",
        type: "lain",
        subKey: 3,
    },
    {
        nomor: 62,
        kode_coicop: "01125",
        rincian: "Daging diawetkan (sosis, abon, nugget, lainnya)",
        satuan: "Kg",
        type: "standar",
        subKey: 3,
    },
];

const Blok4_1_hal2: React.FC<{
    form: FormInstance;
    subTotalHarga: SubTotal[];
    calculate: ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => void;
    // record: any;
}> = ({ form, subTotalHarga, calculate }) => {
    //    const konten =
    useEffect(() => {
        const handleKeyPress = (event: {
            ctrlKey: any;
            key: string;
            preventDefault: () => void;
        }) => {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault(); // Prevent the default behavior (e.g., browser save)
                form.submit();
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener("keydown", handleKeyPress);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [form]);
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
                <Form.Item style={{ margin: "auto" }} name="hal2_jml_komoditas">
                    <InputNumber
                        max={30}
                        style={{ width: "40px" }}
                    ></InputNumber>
                </Form.Item>
            </Space>

            <TabelBlok
                form={form}
                konten={konten}
                title={title}
                subTotalHarga={subTotalHarga}
                calculate={calculate}
            />
        </Space>
    );
};

export default Blok4_1_hal2;
