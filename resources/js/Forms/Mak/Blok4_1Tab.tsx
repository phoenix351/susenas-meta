import { Form, InputNumber, Skeleton, Space, Typography } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { useEffect, useState } from "react";
import { SubTotal } from "@/types";
import axios from "axios";
import NumberInput from "@/Components/NumberInput";

const { Text, Title } = Typography;

const Blok4_1Tab: React.FC<{
    form: any;
    rekapMak: SubTotal[];
    calculate: ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => void;
    from: number;
    to: number;
    hal: number;
    // record: any;
}> = ({ form, rekapMak, calculate, from, to, hal }) => {
    //    const konten =
    const [listKomoditas, setListKomoditas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKomoditasList = async (from: number, to: number) => {
            const { data } = await axios.get(
                route("api.mak.komoditas.list", { from: from, to: to })
            );
            const konten = data.map((item: any) => ({
                id: item.id,
                kode_coicop: item.kode_coicop,
                rincian: item.nama_komoditas,
                satuan: item.satuan,
                // type: item.nama_komoditas.toLowerCase().includes("lain")
                //     ? "lain"
                //     : Number(item.kalori) > 0
                //     ? "standar"
                //     : "sub",
                type: item.type,
                subKey: item.id_kelompok,
                flagBasket: item.flag_basket,
            }));
            // console.log({ konten });
            setListKomoditas([...konten]);
            setLoading(false);
        };
        fetchKomoditasList(from, to);
    }, []);

    const title =
        "BLOK IV.1. KONSUMSI DAN PENGELUARAN BAHAN MAKANAN & MINUMAN SEMINGGU TERAKHIR";

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Space
                style={{ width: "100%", justifyContent: "end" }}
                direction="horizontal"
            >
                <Text>
                    Jumlah komoditas bahan makanan dan bahan minuman terisi pada
                    halaman ini
                </Text>
                {/* <Form.Item
                    style={{ margin: "auto" }}
                    name={`hal${hal}_jml_komoditas`}
                >
                    <InputNumber
                        max={30}
                        style={{ width: "40px" }}
                    ></InputNumber>
                </Form.Item> */}

                <NumberInput inputName={`hal${hal}_jml_komoditas`} />
            </Space>

            <TabelBlok
                form={form}
                konten={loading ? [] : listKomoditas}
                title={title}
                rekapMak={rekapMak}
                calculate={calculate}
            />
            {loading && <Skeleton active paragraph={{ rows: 10 }} />}
        </Space>
    );
};

export default Blok4_1Tab;
