import { Form, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { useEffect, useState } from "react";
import { SubTotal } from "@/types";

const { Text, Title } = Typography;

const Art: React.FC<{
    onFinish: (values: any) => void;
    rekapArt: any;
    kunci: any;
    setRekapArt: (value: any) => void;
    // record: any;
}> = ({ onFinish, rekapArt, kunci, setRekapArt }) => {
    //    const konten =

    // first initialize the rekap art
    const [form] = Form.useForm();
    useEffect(() => {
        if (!kunci) return;
        let newRekapArt = [...rekapArt];

        newRekapArt[kunci] = [
            { beli: 0, produksi: 0, total: 0 },
            { beli: 0, produksi: 0, total: 0 },
        ];

        setRekapArt(newRekapArt);
    }, []);

    const konten = [
        {
            nomor: 159,
            rincian: "MAKANAN JADI DAN MINUMAN",
            satuan: "",
            type: "sub",
            subKey: 0,
        },
        {
            nomor: 160,
            rincian: "Roti tawar",
            satuan: "Potong",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 161,
            rincian: "Roti manis/roti lainnya",
            satuan: "Potong",
            type: "lain",
            subKey: 0,
        },
        {
            nomor: 162,
            rincian: "Kue kering/biskuit/semprong",
            satuan: "Ons",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 163,
            rincian: "Kue basah",
            satuan: "Buah",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 164,
            rincian: "Makanan gorengan (tahu, tempe, bakwan, pisang)",
            satuan: "Potong",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 165,
            rincian: "Makanan gorengan lainnya",
            satuan: "Potong",
            type: "lain",
            subKey: 0,
        },
        {
            nomor: 166,
            rincian: "Bubur kacang hijau",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 167,
            rincian: "Gado‐gado/ketoprak/pecel",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 168,
            rincian: "Nasi campur/rames",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 169,
            rincian: "Nasi goreng",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 170,
            rincian: "Nasi putih",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 171,
            rincian: "Lontong/ketupat sayur",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 172,
            rincian: "Soto/gule/sop/rawon/cincang",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 173,
            rincian: "Sayur matang",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 174,
            rincian: "Sate/tongseng",
            satuan: "Porsi/5 tusuk",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 175,
            rincian: "Mie bakso/mie rebus/mie goreng",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 176,
            rincian: "Mie instan",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 177,
            rincian: "Makanan ringan anak‐anak/krupuk/kripik",
            satuan: "Ons",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 178,
            rincian: "Ikan matang",
            satuan: "Potong",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 179,
            rincian: "Ayam/daging matang",
            satuan: "Potong",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 180,
            rincian: "Daging olahan (sosis, nugget , daging asap, dsb.) matang",
            satuan: "Potong",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 181,
            rincian: "Bubur ayam",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 182,
            rincian: "Siomay/batagor",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 183,
            rincian: "Makanan jadi lainnya (sebutkan):",
            satuan: "",
            type: "lain",
            subKey: 0,
        },
        {
            nomor: 184,
            rincian: "Air kemasan",
            satuan: "Liter",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 185,
            rincian: "Air kemasan galon",
            satuan: "Galon",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 186,
            rincian: "Air teh kemasan",
            satuan: "Kotak/gelas kecil (250ml)",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 187,
            rincian: "Sari buah kemasan",
            satuan: "Kotak/gelas kecil (200ml)",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 188,
            rincian: "Minuman jadi (kopi, kopi susu, teh, susu cokelat, dsb.)",
            satuan: "Gelas",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 189,
            rincian: "Es krim",
            satuan: "Mangkok kecil",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 190,
            rincian: "Es lainnya (sebutkan):",
            satuan: "Porsi",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 191,
            rincian: "Minuman keras lainnya (sebutkan):",
            satuan: "Liter",
            type: "standar",
            subKey: 0,
        },
        {
            nomor: 192,
            rincian: "ROKOK DAN TEMBAKAU",
            satuan: "",
            type: "sub",
            subKey: 1,
        },
        {
            nomor: 193,
            rincian: "Rokok kretek filter",
            satuan: "Batang",
            type: "standar",
            subKey: 1,
        },
        {
            nomor: 194,
            rincian: "Rokok kretek tanpa filter",
            satuan: "Batang",
            type: "standar",
            subKey: 1,
        },
        {
            nomor: 195,
            rincian: "Rokok putih",
            satuan: "Batang",
            type: "standar",
            subKey: 1,
        },
        {
            nomor: 196,
            rincian: "Tembakau",
            satuan: "Ons",
            type: "standar",
            subKey: 1,
        },
        {
            nomor: 197,
            rincian: "Rokok dan tembakau lainnya (sebutkan):",
            satuan: "",
            type: "lain",
            subKey: 1,
        },
    ];
    const [subTotalHarga, setSubTotalHarga] = useState([
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
    ]);
    // const [totalProduksi, setTotalProduksi] = useState(0);
    const calculateSubTotalHarga = ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => {
        // console.log({ subKey, jenis });
        // ambil semua input dari form dengan akhiran jenis_hargasubkey    };
        const pattern = `${jenis}_harga${subKey}`;
        const allFieldValues = form.getFieldsValue();
        // console.log({ pattern, allFieldValues });

        const sum = Object.entries(allFieldValues)
            .filter(([fieldName]) => fieldName.endsWith(pattern))
            .reduce(
                (accumulator, [, value]) =>
                    accumulator + ((value as number) || 0),
                0
            );

        let newSubTotalHarga: SubTotal[] = [...subTotalHarga];
        newSubTotalHarga[subKey][jenis] = sum;
        setSubTotalHarga(newSubTotalHarga);
        // setRekapArt(newSubTotalHarga);
        let newRekapArt = [...rekapArt];
        newRekapArt[kunci] = newSubTotalHarga;
        setRekapArt(newRekapArt);
    };

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
                name="Art"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <TabelBlok
                    form={form}
                    konten={konten}
                    title={title}
                    calculate={calculateSubTotalHarga}
                    subTotalHarga={subTotalHarga}
                />
            </Form>
        </Space>
    );
};

export default Art;
