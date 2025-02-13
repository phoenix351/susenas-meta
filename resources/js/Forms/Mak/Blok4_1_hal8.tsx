import { Form, FormInstance, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { SubTotal } from "@/types";
import { useEffect } from "react";

const { Text, Title } = Typography;

const konten = [
    {
        nomor: 95,
        kode_coicop: "01174006",
        rincian: "Bawang merah",
        satuan: "Ons",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 96,
        kode_coicop: "01174007",
        rincian: "Bawang putih",
        satuan: "Ons",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 97,
        kode_coicop: "01174005",
        rincian: "Bawang bombay",
        satuan: "Ons",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 98,
        kode_coicop: "01173012",
        rincian: "Cabe merah",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 99,
        kode_coicop: "01173016",
        rincian: "Cabe hijau",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 100,
        kode_coicop: "01173013",
        rincian: "Cabe rawit",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 101,
        kode_coicop: "01171/72/73/74/76",
        rincian: "Sayur-sayuran lainnya",
        satuan: "Kg",
        type: "lain",
        subKey: 5,
    },
    {
        nomor: 102,
        kode_coicop: "",
        rincian: "G. KACANG-KACANGAN [R.103 s.d. R.109]",
        satuan: "",
        type: "sub",
        subKey: 6,
    },
    {
        nomor: 103,
        kode_coicop: "01168010",
        rincian: "Kacang tanah tanpa kulit",
        satuan: "Kg",
        type: "standar",
        subKey: 6,
    },
    {
        nomor: 104,
        kode_coicop: "01168004",
        rincian: "Kacang kedele",
        satuan: "Kg",
        type: "standar",
        subKey: 6,
    },
    {
        nomor: 105,
        kode_coicop: "01168",
        rincian: "Kacang lainnya",
        satuan: "Kg",
        type: "standar",
        subKey: 6,
    },
    {
        nomor: 106,
        kode_coicop: "01194011",
        rincian: "Tahu",
        satuan: "Kg",
        type: "standar",
        subKey: 6,
    },
    {
        nomor: 107,
        kode_coicop: "01194013",
        rincian: "Tempe",
        satuan: "Kg",
        type: "standar",
        subKey: 6,
    },
    {
        nomor: 108,
        kode_coicop: "01194010",
        rincian: "Oncom",
        satuan: "Ons",
        type: "standar",
        subKey: 6,
    },
    {
        nomor: 109,
        kode_coicop: "01194",
        rincian: "Hasil lain dari kacang-kacangan",
        satuan: "Ons",
        type: "lain",
        subKey: 6,
    },
    {
        nomor: 110,
        kode_coicop: "",
        rincian: "H. BUAH-BUAHAN [R.111 s.d. R.125]",
        satuan: "",
        type: "sub",
        subKey: 7,
    },
    {
        nomor: 111,
        kode_coicop: "01161001-33",
        rincian: "Jeruk, jeruk bali",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 112,
        kode_coicop: "01167002-14",
        rincian: "Mangga",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 113,
        kode_coicop: "01163001-9",
        rincian: "Apel",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 114,
        kode_coicop: "01167040-49",
        rincian: "Rambutan",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 115,
        kode_coicop: "01167050/098",
        rincian: "Duku, langsat",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 116,
        kode_coicop: "01167059-85",
        rincian: "Durian",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 117,
        kode_coicop: "01165008-11",
        rincian: "Salak",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 118,
        kode_coicop: "01162001",
        rincian: "Pisang ambon",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 119,
        kode_coicop: "01162002-14",
        rincian: "Pisang lainnya",
        satuan: "Kg",
        type: "lain",
        subKey: 7,
    },
    {
        nomor: 120,
        kode_coicop: "01167022-27",
        rincian: "Pepaya",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 121,
        kode_coicop: "01167028-32",
        rincian: "Semangka",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 122,
        kode_coicop: "01173002",
        rincian: "Tomat buah",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 123,
        kode_coicop: "01165004-6",
        rincian: "Alpukat",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 124,
        kode_coicop: "01167053",
        rincian: "Jambu biji",
        satuan: "Kg",
        type: "standar",
        subKey: 7,
    },
    {
        nomor: 125,
        kode_coicop: "",
        rincian: "Buah-buahan lainnya",
        satuan: "Kg",
        type: "lain",
        subKey: 7,
    },
    {
        nomor: 126,
        kode_coicop: "",
        rincian: "I. MINYAK DAN KELAPA [R.127 s.d. R.130]",
        satuan: "",
        type: "sub",
        subKey: 8,
    },
    {
        nomor: 127,
        kode_coicop: "01154003",
        rincian: "Minyak kelapa",
        satuan: "Liter",
        type: "standar",
        subKey: 8,
    },
];
const Blok4_1_hal2: React.FC<{
    form: FormInstance;
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
