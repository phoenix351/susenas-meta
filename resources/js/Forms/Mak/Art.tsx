import {
    Button,
    Form,
    FormListFieldData,
    Input,
    InputNumber,
    Skeleton,
    Space,
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
}> = ({
    onFinish,
    nomor_art,
    setDaftarArt,
    daftarArt,
    id_ruta,
    id_art,
    calculateKalori,
    konten,
}) => {
    //    const konten =

    // first initialize the rekap art

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [subTotalHarga, setSubTotalHarga] = useState({
        12: { beli: 0, produksi: 0, total: 0 },
        13: { beli: 0, produksi: 0, total: 0 },
    });

    const konsumsiArtFinish = async (values: any) => {
        console.log({ values });

        // messageApi.open({
        //     type: "loading",
        //     key: "4_1",
        //     content: "Memuat Data",
        // });
        try {
            const url = route("entri.mak.konsumsi_art.store");
            const { data } = await axios.patch(url, values, {
                headers: { "Content-Type": "application/json" },
            });
            console.log({ data });
            // messageApi.open({
            //     type: "success",
            //     key: "4_1",
            //     content: "Berhasil menyimpan data",
            // });
            console.log("sucess");
        } catch (error) {
            // messageApi.open({
            //     type: "error",
            //     key: "4_1",
            //     content: "Oops terjadi kesalahan, silahkan hubungi admin",
            // });
            console.log("error", { error });
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

        let newSubTotalHarga: any = { ...subTotalHarga };
        newSubTotalHarga[subKey][jenis] = sum;
        setSubTotalHarga(newSubTotalHarga);
        // setRekapArt(newSubTotalHarga)
        let newDaftarArt = [...daftarArt];
        const updatedArray = newDaftarArt.map((obj) =>
            obj.artKey === nomor_art ? { ...obj, rekap: newSubTotalHarga } : obj
        );
    };
    const calculateRekap = _debounce(() => {
        // console.log({ subKey, jenis });
        // ambil semua input dari form dengan akhiran jenis_hargasubkey    };
        // const pattern = `${jenis}_harga${subKey}`;
        const beli_0 = `beli_harga12`;
        const beli_1 = `beli_harga13`;
        const produksi_0 = `produksi_harga12`;
        const produksi_1 = `produksi_harga13`;

        const allFieldValues = form.getFieldsValue();
        // console.log({ allFieldValues });

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

        let newSubTotalHarga: any = { ...subTotalHarga };

        newSubTotalHarga["12"]["beli"] = sum_beli_0;
        newSubTotalHarga["13"]["beli"] = sum_beli_1;
        newSubTotalHarga["12"]["produksi"] = sum_produksi_0;
        newSubTotalHarga["13"]["produksi"] = sum_produksi_1;
        //calculate total for each
        newSubTotalHarga["12"]["total"] = sum_beli_0 + sum_produksi_0;
        newSubTotalHarga["13"]["total"] = sum_beli_1 + sum_produksi_1;
        if (
            newSubTotalHarga["12"]["total"] === 0 &&
            newSubTotalHarga["13"]["total"] === 0
        ) {
        } else {
            setSubTotalHarga(newSubTotalHarga);
        }
        // console.log({ allFieldValues, newSubTotalHarga });

        let newDaftarArt = [...daftarArt];
        const updatedArt = newDaftarArt.map((obj) =>
            obj.nomor_art === nomor_art
                ? { ...obj, rekap: newSubTotalHarga }
                : obj
        );

        setDaftarArt(updatedArt);
    }, 600);
    const handleSubmit = _debounce(() => form.submit(), 3000);
    const handleValueChange = (values: FormListFieldData) => {
        calculateRekap();
        handleSubmit();
        calculateKalori(form.getFieldsValue()).then((totalKalori) => {
            let newDaftarArt = [...daftarArt];
            newDaftarArt[nomor_art]["kalori"] = totalKalori;
        });
    };
    // kumpulan useeffect
    useEffect(() => {
        const fetchKonsumsiArt = async (id_art: string) => {
            setLoading(true);
            const { data } = await axios.get(
                route("api.mak.konsumsi.art", { id_art: id_art })
            );
            daftarArt.forEach((element: any) => {
                if (element.id === id_art) {
                    console.log({ element });
                    setSubTotalHarga(element.rekap);
                }
            });

            const daftarSub: number[] = [159, 192];
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
        };
        fetchKonsumsiArt(id_art);
        calculateRekap();
        setLoading(true);
    }, [id_art]);
    useEffect(() => {
        console.log({ konten });
    }, [subTotalHarga]);

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
                    style={{ width: "100%", justifyContent: "end" }}
                    direction="horizontal"
                >
                    <Text>
                        Jumlah komoditas bahan makanan,bahan minuman, dan rokok
                        yang terisi pada halaman ini
                    </Text>
                    <Form.Item style={{ margin: "auto" }} name="id_ruta" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item style={{ margin: "auto" }} name="id_art" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ margin: "auto" }}
                        name="hal6_jml_komoditas"
                    >
                        <InputNumber max={30} style={{ width: "40px" }} />
                    </Form.Item>
                </Space>
                {konten.length > 0 ? (
                    <TabelBlok
                        form={form}
                        konten={konten}
                        title={title}
                        calculate={calculateSubTotalHarga}
                        rekapMak={subTotalHarga}
                    />
                ) : (
                    <Skeleton active paragraph={{ rows: 10 }} />
                )}
            </Form>
        </Space>
    );
};

export default Art;
