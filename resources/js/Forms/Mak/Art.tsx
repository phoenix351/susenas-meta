import {
    Button,
    Form,
    FormListFieldData,
    Input,
    InputNumber,
    Skeleton,
    Space,
    Spin,
    Typography,
} from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TabelBlok from "@/Components/TabelBlok";
import { useEffect, useState } from "react";
import { SubTotal } from "@/types";

import _debounce from "lodash/debounce";
import axios from "axios";

const { Text, Title } = Typography;

const Art: React.FC<{
    onFinish: (values: any) => void;
    nomor_art: number;
    daftarArt: any;
    setDaftarArt: (value: any) => void;
    id_ruta: string;
    id_art: string;
    calculateKalori: (formValues: FormListFieldData) => Promise<number>;
    konten: any[]; // record: any;
    art: any;
}> = ({
    onFinish,
    nomor_art,
    setDaftarArt,
    daftarArt,
    id_ruta,
    id_art,
    calculateKalori,
    konten,
    art,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // const [subTotalHarga, setSubTotalHarga] = useState({
    //     12: { beli: 0, produksi: 0, total: 0 },
    //     13: { beli: 0, produksi: 0, total: 0 },
    // });

    const konsumsiArtFinish = async (values: any) => {
        try {
            setLoading(true);
            const url = route("entri.mak.konsumsi_art.store");
            const { data } = await axios.patch(url, values, {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            console.log("error", { error });
        } finally {
            setLoading(false);
        }
    };
    // const [totalProduksi, setTotalProduksi] = useState(0);
    const calculateSubTotalHarga = ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => {
        // ambil semua input dari form dengan akhiran jenis_hargasubkey    };
        const pattern = `${jenis}_harga${subKey}`;
        const allFieldValues = form.getFieldsValue();

        const sum = Object.entries(allFieldValues)
            .filter(([fieldName]) => fieldName.endsWith(pattern))
            .reduce(
                (accumulator, [, value]) =>
                    accumulator + ((value as number) || 0),
                0
            );

        let newDaftarArt = [...daftarArt];

        const updatedArray = newDaftarArt.map((obj) => {
            let rekap = { ...obj.rekap };
            rekap[subKey][jenis] = sum;
            return obj.id === id_art ? { ...obj, rekap: rekap } : obj;
        });
        setDaftarArt(updatedArray);
    };
    const calculateRekap = _debounce(() => {
        // ambil semua input dari form dengan akhiran jenis_hargasubkey    };
        // const pattern = `${jenis}_harga${subKey}`;
        const beli_0 = `beli_harga12`;
        const beli_1 = `beli_harga13`;
        const produksi_0 = `produksi_harga12`;
        const produksi_1 = `produksi_harga13`;

        const allFieldValues = form.getFieldsValue();

        const sum_beli_0 = Object.entries(allFieldValues)
            .filter(
                ([fieldName]) =>
                    fieldName.endsWith(beli_0) && !fieldName.includes("jumlah")
            )
            .reduce(
                (accumulator, [, value]) =>
                    accumulator + ((value as number) || 0),
                0
            );
        const sum_beli_1 = Object.entries(allFieldValues)
            .filter(
                ([fieldName]) =>
                    fieldName.endsWith(beli_1) && !fieldName.includes("jumlah")
            )
            .reduce(
                (accumulator, [, value]) =>
                    accumulator + ((value as number) || 0),
                0
            );
        const sum_produksi_0 = Object.entries(allFieldValues)
            .filter(
                ([fieldName]) =>
                    fieldName.endsWith(produksi_0) &&
                    !fieldName.includes("jumlah")
            )
            .reduce(
                (accumulator, [, value]) =>
                    accumulator + ((value as number) || 0),
                0
            );
        const sum_produksi_1 = Object.entries(allFieldValues)
            .filter(
                ([fieldName]) =>
                    fieldName.endsWith(produksi_1) &&
                    !fieldName.includes("jumlah")
            )
            .reduce(
                (accumulator, [, value]) =>
                    accumulator + ((value as number) || 0),
                0
            );

        let newDaftarArt = [...daftarArt];
        const updatedArt = newDaftarArt.map((obj) => {
            let newSubTotalHarga = { ...obj.rekap }; // Create a new object

            newSubTotalHarga["12"] = {
                beli: sum_beli_0,
                produksi: sum_produksi_0,
                total: sum_beli_0 + sum_produksi_0,
            };

            newSubTotalHarga["13"] = {
                beli: sum_beli_1,
                produksi: sum_produksi_1,
                total: sum_beli_1 + sum_produksi_1,
            };

            return obj.id === id_art
                ? { ...obj, rekap: newSubTotalHarga }
                : obj;
        });

        setDaftarArt(updatedArt);
    }, 600);

    const handleValueChange = _debounce(() => {
        calculateRekap();
        form.submit();
        calculateKalori(form.getFieldsValue()).then((totalKalori) => {
            let newDaftarArt = [...daftarArt];
            newDaftarArt[nomor_art]["kalori"] = totalKalori;
        });
    }, 1000);
    // kumpulan useeffect
    useEffect(() => {
        const fetchKonsumsiArt = async (id_art: string) => {
            setLoading(true);
            const { data } = await axios.get(
                route("api.mak.konsumsi.art", { id_art: id_art })
            );

            const daftarSub: number[] = [187, 225];
            let konsumsiArt = data.map(
                (item: {
                    id_komoditas: any;
                    id_kelompok: any;
                    harga_beli: any;
                    harga_produksi: any;
                    harga_total: any;
                    item: any;
                    satuan: any;
                    volume_beli: any;
                    volume_produksi: any;
                    volume_total: any;
                }) => {
                    return {
                        [`${
                            daftarSub.includes(item.id_komoditas)
                                ? "jumlah"
                                : ""
                        }${item.id_komoditas}_beli_harga${item.id_kelompok}`]:
                            item.harga_beli,
                        [`${
                            daftarSub.includes(item.id_komoditas)
                                ? "jumlah"
                                : ""
                        }${item.id_komoditas}_produksi_harga${
                            item.id_kelompok
                        }`]: item.harga_produksi,
                        [`${item.id_komoditas}_total_harga`]: item.harga_total,
                        [`${item.id_komoditas}_item`]: item.item,
                        [`${item.id_komoditas}_satuan`]: item.satuan,
                        [`${item.id_komoditas}_beli_volume`]: item.volume_beli,
                        [`${item.id_komoditas}_produksi_volume`]:
                            item.volume_produksi,
                        [`${item.id_komoditas}_total_volume`]:
                            item.volume_total,
                    };
                }
            );
            const konsumsiArtValues = konsumsiArt.reduce(
                (
                    result: { [x: string]: any },
                    obj: {
                        [x: string]: any;
                        hasOwnProperty: (arg0: string) => any;
                    }
                ) => {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            result[key] = obj[key];
                        }
                    }
                    return result;
                },
                {}
            );
            konsumsiArtValues[`blok4_31_${nomor_art}_id_art`] = id_art;
            form.setFieldsValue(konsumsiArtValues);
            // setLoading(false);
            setLoading(false);
        };
        fetchKonsumsiArt(id_art);
        // calculateRekap();
    }, [id_art]);

    useEffect(() => {
        form.setFieldsValue({ id_ruta, id_art });
        calculateKalori(form.getFieldsValue()).then((totalKalori) => {
            let newDaftarArt = [...daftarArt];
            newDaftarArt[nomor_art]["kalori"] = totalKalori;
        });
    }, [form]);

    const title =
        "BLOK IV.1. KONSUMSI DAN PENGELUARAN BAHAN MAKANAN, BAHAN MINUMAN, DAN ROKOK SEMINGGU TERAKHIR";

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Form
                form={form}
                name="Art"
                onFinish={konsumsiArtFinish}
                autoComplete="off"
                layout="vertical"
                onValuesChange={handleValueChange}
            >
                <Space
                    style={{ width: "100%", justifyContent: "space-between" }}
                    direction="horizontal"
                >
                    <Space style={{ display: loading ? "" : "none" }}>
                        Menyimpan... <Spin />
                    </Space>

                    <Space>
                        <Text>
                            Jumlah komoditas bahan makanan,bahan minuman, dan
                            rokok yang terisi pada halaman ini
                        </Text>
                        <Form.Item
                            style={{ margin: "auto" }}
                            name="id_ruta"
                            hidden
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: "auto" }}
                            name="id_art"
                            hidden
                        >
                            <Input readOnly />
                        </Form.Item>
                    </Space>
                </Space>

                <TabelBlok
                    form={form}
                    konten={konten}
                    title={title}
                    calculate={calculateSubTotalHarga}
                    rekapMak={art.rekap}
                />
            </Form>
        </Space>
    );
};

export default Art;
