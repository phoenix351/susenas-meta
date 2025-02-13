import { Form, InputNumber, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { useEffect, useState } from "react";
import { SubTotal } from "@/types";
import axios from "axios";

const { Text, Title } = Typography;


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
    const [listKomoditas, setListKomoditas] = useState<any[]>([]);

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

    useEffect(() => {
        const fetchKomoditasList = async (from: number, to: number) => {
            const { data } = await axios.get(
                route("api.mak.komoditas.list", { from: from, to: to })
            );
            const konten = data.map((item: any) => ({
                nomor: item.id,
                kode_coicop: item.kode_coicop,
                rincian: item.nama_komoditas,
                satuan: item.satuan,
                type: item.nama_komoditas.toLowerCase().includes("lain")
                    ? "lain"
                    : Number(item.kalori) > 0
                    ? "standar"
                    : "sub",
                subKey: item.id_kelompok,
                flagBasket: item.flag_basket,
            }));
            console.log({ konten });
            setListKomoditas([...konten]);
        };
        fetchKomoditasList(1, 34);
    }, []);

    const title =
        "BLOK IV.1. KONSUMSI DAN PENGELUARAN BAHAN MAKANAN, BAHAN MINUMAN, DAN ROKOK SEMINGGU TERAKHIR";

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            
            <TabelBlok
                form={form}
                konten={listKomoditas}
                title={title}
                rekapMak={rekapMak}
                calculate={calculate}
            />
        </Space>
    );
};

export default Blok4_1_hal2;
