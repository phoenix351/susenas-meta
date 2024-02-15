import { Form, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { useEffect } from "react";
import { SubTotal } from "@/types";

const { Text, Title } = Typography;
const konten = [
    {
        nomor: 1,
        kode_coicop: "",
        rincian: "A. PADI-PADIAN [R.2 s.d. R.7]",
        satuan: "",
        type: "sub",
        subKey: 0,
    },
    {
        nomor: 2,
        kode_coicop: "01111001",
        rincian: "Beras (beras lokal, medium, premium, dan impor)",
        satuan: "Kg",
        type: "standar",
        subKey: 0,
    },
    {
        nomor: 3,
        kode_coicop: "01111003",
        rincian: "Beras ketan",
        satuan: "Kg",
        type: "standar",
        subKey: 0,
    },
    {
        nomor: 4,
        kode_coicop: "01111006",
        rincian: "Jagung basah dengan kulit",
        satuan: "Kg",
        type: "standar",
        subKey: 0,
    },
    {
        nomor: 5,
        kode_coicop: "01111005/2",
        rincian: "Jagung pipilan/beras jagung/jagung titi",
        satuan: "Kg",
        type: "standar",
        subKey: 0,
    },
    {
        nomor: 6,
        kode_coicop: "01115005",
        rincian: "Tepung terigu",
        satuan: "Kg",
        type: "standar",
        subKey: 0,
    },
    {
        nomor: 7,
        kode_coicop: "0111",
        rincian: "Padi-padian lainnya",
        satuan: "Kg",
        type: "lain",
        subKey: 0,
    },
    {
        nomor: 8,
        kode_coicop: "",
        rincian: "B. UMBI-UMBIAN [R.9 s.d. R.15]",
        satuan: "",
        type: "sub",
        subKey: 1,
    },
    {
        nomor: 9,
        kode_coicop: "01178001",
        rincian: "Ketala pohon/singkong",
        satuan: "Kg",
        type: "standar",
        subKey: 1,
    },
    {
        nomor: 10,
        kode_coicop: "01178002",
        rincian: "Ketela rambat/ubi jalar",
        satuan: "Kg",
        type: "standar",
        subKey: 1,
    },
    {
        nomor: 11,
        kode_coicop: "01115007",
        rincian: "Sagu (bukan dari ketela pohon)",
        satuan: "Kg",
        type: "standar",
        subKey: 1,
    },
    {
        nomor: 12,
        kode_coicop: "01178004",
        rincian: "Talas/keladi",
        satuan: "Kg",
        type: "standar",
        subKey: 1,
    },
    {
        nomor: 13,
        kode_coicop: "01177000",
        rincian: "Kentang",
        satuan: "Kg",
        type: "standar",
        subKey: 1,
    },
    {
        nomor: 14,
        kode_coicop: "01178001",
        rincian: "Gaplek",
        satuan: "Kg",
        type: "standar",
        subKey: 1,
    },
    {
        nomor: 15,
        kode_coicop: "01178",
        rincian: "Umbi-umbian lainnya",
        satuan: "Kg",
        type: "lain",
        subKey: 1,
    },
    {
        nomor: 16,
        kode_coicop: "",
        rincian: "C. IKAN/UDANG/CUMI/KERANG [R.17 s.d. R.54]",
        satuan: "",
        type: "sub",
        subKey: 2,
    },
    {
        nomor: 17,
        kode_coicop: "01131017",
        rincian: "Ekor kuning",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 18,
        kode_coicop: "01131069",
        rincian: "Tongkol",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 19,
        kode_coicop: "01131072",
        rincian: "Tuna",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 20,
        kode_coicop: "01131013",
        rincian: "Cakalang, dencis",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 21,
        kode_coicop: "01131065",
        rincian: "Tenggiri",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 22,
        kode_coicop: "01131057",
        rincian: "Selar",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 23,
        kode_coicop: "01131028",
        rincian: "Kembung, lema/tatare, banyar/banyara",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 24,
        kode_coicop: "01131067",
        rincian: "Teri basah",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 25,
        kode_coicop: "01131003",
        rincian: "Bandeng",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 26,
        kode_coicop: "01131018",
        rincian: "Gabus",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 27,
        kode_coicop: "01131045",
        rincian: "Mujair",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 28,
        kode_coicop: "01131041",
        rincian: "Mas",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 29,
        kode_coicop: "01131046",
        rincian: "Nila",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 30,
        kode_coicop: "01131035",
        rincian: "Lele",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 31,
        kode_coicop: "01131023/24",
        rincian: "Kakap",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 32,
        kode_coicop: "01131004",
        rincian: "Baronang",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 33,
        kode_coicop: "01131051",
        rincian: "Patin",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
    {
        nomor: 34,
        kode_coicop: "01131006",
        rincian: "Bawal",
        satuan: "Kg",
        type: "standar",
        subKey: 2,
    },
];

const Blok4_1_hal2: React.FC<{
    form: any;
    rekapMak: SubTotal[];
    calculate: ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => void;
    // record: any;
}> = ({ form, rekapMak, calculate }) => {
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
                rekapMak={rekapMak}
                calculate={calculate}
            />
        </Space>
    );
};

export default Blok4_1_hal2;
