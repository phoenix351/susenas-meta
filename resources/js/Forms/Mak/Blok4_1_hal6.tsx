import { Form, FormInstance, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { SubTotal } from "@/types";
import { useEffect } from "react";

const { Text, Title } = Typography;

const konten = [
    {
        nomor: 63,
        kode_coicop: "01121005",
        rincian: "Tetelan, sandung lamur",
        satuan: "Kg",
        type: "standar",
        subKey: 3,
    },
    {
        nomor: 64,
        kode_coicop: "01127",
        rincian: "Lainnya ( hati, jeroan, iga, kaki, buntut, kepala, dsb)",
        satuan: "Kg",
        type: "lain",
        subKey: 3,
    },
    {
        nomor: 65,
        kode_coicop: "",
        rincian: "E. TELUR DAN SUSU [R.66 s.d. R.74]",
        satuan: "",
        type: "sub",
        subKey: 4,
    },
    {
        nomor: 66,
        kode_coicop: "01147002",
        rincian: "Telur ayam ras",
        satuan: "Butir",
        type: "standar",
        subKey: 4,
    },
    {
        nomor: 67,
        kode_coicop: "01147001",
        rincian: "Telur ayam kampung",
        satuan: "Butir",
        type: "standar",
        subKey: 4,
    },
    {
        nomor: 68,
        kode_coicop: "01147003",
        rincian: "Telur itik/telur itik manila",
        satuan: "Butir",
        type: "standar",
        subKey: 4,
    },
    {
        nomor: 69,
        kode_coicop: "01147005/ 11111003/ 01147004",
        rincian:
            "Telur lainnya (telur puyuh, telur asin mentah maupun matang, telur penyu, telur angsa, dsb)",
        satuan: "Butir",
        type: "lain",
        subKey: 4,
    },
    {
        nomor: 70,
        kode_coicop: "01143003",
        rincian: "Susu cair pabrik",
        satuan: "Kotak kecil (250ml)",
        type: "standar",
        subKey: 4,
    },
    {
        nomor: 71,
        kode_coicop: "01143005",
        rincian: "Susu kental manis",
        satuan: "Kaleng (397gr)",
        type: "standar",
        subKey: 4,
    },
    {
        nomor: 72,
        kode_coicop: "01143001/2",
        rincian: "Susu bubuk",
        satuan: "Kg",
        type: "standar",
        subKey: 4,
    },
    {
        nomor: 73,
        kode_coicop: "01143007",
        rincian: "Susu bubuk bayi",
        satuan: "Kg",
        type: "standar",
        subKey: 4,
    },
    {
        nomor: 74,
        kode_coicop: "01141/45/46",
        rincian: "Susu lainnya dan Hasil lain dari susu",
        satuan: "",
        type: "lain",
        subKey: 4,
    },
    {
        nomor: 75,
        kode_coicop: "",
        rincian: "F. SAYUR-SAYURAN [R.76 s.d. R.101]",
        satuan: "",
        type: "sub",
        subKey: 5,
    },
    {
        nomor: 76,
        kode_coicop: "01171012",
        rincian: "Bayam",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 77,
        kode_coicop: "01171014",
        rincian: "Kangkung",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 78,
        kode_coicop: "01172001/2/3",
        rincian: "Kol/kubis",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 79,
        kode_coicop: "01171016",
        rincian: "Sawi putih (petsai)",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 80,
        kode_coicop: "01171015",
        rincian: "Sawi hijau",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 81,
        kode_coicop: "01173003",
        rincian: "Buncis",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 82,
        kode_coicop: "01173008",
        rincian: "Kacang panjang",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 83,
        kode_coicop: "01173005",
        rincian: "Tomat sayur, tomat ceri",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 84,
        kode_coicop: "01174001",
        rincian: "Wortel",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 85,
        kode_coicop: "01173004",
        rincian: "Mentimun",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 86,
        kode_coicop: "01171010",
        rincian: "Daun ketela pohon/daun singkong",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 87,
        kode_coicop: "01173023/26",
        rincian: "Terong",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 88,
        kode_coicop: "01171017",
        rincian: "Tauge",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 89,
        kode_coicop: "01173014/15",
        rincian: "Labu, labu siam, labu parang",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 90,
        kode_coicop: "01171026",
        rincian: "Bahan sayur sop/capcay/ kimlo (paket)",
        satuan: "Bungkus",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 91,
        kode_coicop: "01171024/25",
        rincian: "Bahan sayur asam/lodeh (paket)",
        satuan: "Bungkus",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 92,
        kode_coicop: "01173017",
        rincian: "Nangka muda",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 93,
        kode_coicop: "01173020",
        rincian: "Pepaya muda",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
    },
    {
        nomor: 94,
        kode_coicop: "01173022",
        rincian: "Jengkol",
        satuan: "Kg",
        type: "standar",
        subKey: 5,
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
