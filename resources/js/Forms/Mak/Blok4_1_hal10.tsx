import { Form, FormInstance, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { SubTotal } from "@/types";
import { useEffect } from "react";

const { Text, Title } = Typography;

const konten = [
    {
        nomor: 128,
        kode_coicop: "01154001/4",
        rincian: "Minyak goreng (kelapa sawit, bunga matahari)",
        satuan: "Liter",
        type: "standar",
        subKey: 8,
    },
    {
        nomor: 129,
        kode_coicop: "01167033",
        rincian: "Kelapa (tidak termasuk santan instan)",
        satuan: "Butir",
        type: "standar",
        subKey: 8,
    },
    {
        nomor: 130,
        kode_coicop: "01151/52/53/54",
        rincian: "Minyak dan kelapa lainnya",
        satuan: "",
        type: "lain",
        subKey: 8,
    },
    {
        nomor: 131,
        kode_coicop: "",
        rincian: "J. BAHAN MINUMAN [R.132 s.d. R.138]",
        satuan: "",
        type: "sub",
        subKey: 9,
    },
    {
        nomor: 132,
        kode_coicop: "01181001",
        rincian: "Gula pasir",
        satuan: "Ons",
        type: "standar",
        subKey: 9,
    },
    {
        nomor: 133,
        kode_coicop: "01181002",
        rincian: "Gula merah, gula air (pohom aren, kelapa, lontar)",
        satuan: "Ons",
        type: "standar",
        subKey: 9,
    },
    {
        nomor: 134,
        kode_coicop: "01212001",
        rincian: "Teh bubuk",
        satuan: "Ons",
        type: "standar",
        subKey: 9,
    },
    {
        nomor: 135,
        kode_coicop: "01212002",
        rincian: "Teh celup (sachet)",
        satuan: "2 gram",
        type: "standar",
        subKey: 9,
    },
    {
        nomor: 136,
        kode_coicop: "01211001",
        rincian: "Kopi (bubuk, biji)",
        satuan: "Ons",
        type: "standar",
        subKey: 9,
    },
    {
        nomor: 137,
        kode_coicop: "01211002",
        rincian: "Kopi instan (sachet)",
        satuan: "20 gram",
        type: "standar",
        subKey: 9,
    },
    {
        nomor: 138,
        kode_coicop: "01222/3",
        rincian: "Bahan minuman lainnya",
        satuan: "",
        type: "lain",
        subKey: 9,
    },
    {
        nomor: 139,
        kode_coicop: "",
        rincian: "K. BUMBU-BUMBUAN [R.140 s.d. R.153]",
        satuan: "",
        type: "sub",
        subKey: 10,
    },
    {
        nomor: 140,
        kode_coicop: "01192001",
        rincian: "Garam",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 141,
        kode_coicop: "01192005",
        rincian: "Kemiri",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 142,
        kode_coicop: "01192006",
        rincian: "Ketumbar/jinten",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 143,
        kode_coicop: "01192007",
        rincian: "Merica/lada",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 144,
        kode_coicop: "01192003",
        rincian: "Jahe",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 145,
        kode_coicop: "01192000",
        rincian: "Kunyit",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 146,
        kode_coicop: "01173024",
        rincian: "Asam",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 147,
        kode_coicop: "01194003/4",
        rincian: "Terasi/petis",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 148,
        kode_coicop: "01191003",
        rincian: "Kecap",
        satuan: "100ml",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 149,
        kode_coicop: "01194008",
        rincian: "Penyedap masakan/vetsin",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 150,
        kode_coicop: "01191005",
        rincian: "Sambal jadi",
        satuan: "100ml",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 151,
        kode_coicop: "01191006-7",
        rincian: "Saus tomat",
        satuan: "100ml",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 152,
        kode_coicop: "01194007",
        rincian: "Bumbu maskan jadi/kemasan, bumbu racikan",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 153,
        kode_coicop: "01192003/4",
        rincian: "Bumbu dapur lainnya (kencur, pala, kapulaga, dsb.)",
        satuan: "Gram",
        type: "standar",
        subKey: 10,
    },
    {
        nomor: 154,
        kode_coicop: "",
        rincian: "L. BAHAN MAKANAN LAINNYA [R.155 s.d. R.158]",
        satuan: "",
        type: "sub",
        subKey: 11,
    },
    {
        nomor: 155,
        kode_coicop: "01115012",
        rincian: "Mie instan",
        satuan: "Bungkus (80gr)",
        type: "standar",
        subKey: 11,
    },
    {
        nomor: 156,
        kode_coicop: "01115018/9",
        rincian: "Kerupuk",
        satuan: "Ons",
        type: "standar",
        subKey: 11,
    },
    {
        nomor: 157,
        kode_coicop: "01115013",
        rincian: "Bubur bayi kemasan",
        satuan: "Kotak kecil (150 gr)",
        type: "lain",
        subKey: 11,
    },
    {
        nomor: 158,
        kode_coicop: "01112/15/76/94",
        rincian: "Lainnya",
        satuan: "",
        type: "",
        subKey: 11,
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
