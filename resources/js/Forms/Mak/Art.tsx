import { Button, Form, Input, InputNumber, Space, Typography } from "antd";
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

    // record: any;
}> = ({ onFinish, nomor_art, setDaftarArt, daftarArt, id_ruta, id_art }) => {
    //    const konten =

    // first initialize the rekap art

    const [form] = Form.useForm();
    const konsumsiArtFinish = async (values: any) => {
        console.log({ values });
        console.log("sending");

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
    // kumpulan useeffect
    useEffect(() => {
        const fetchKonsumsiArt = async (id_art: string) => {
            const { data } = await axios.get(
                route("api.mak.konsumsi.art", { id_art: id_art })
            );
            console.log({ konsumsiArtFinish: data });
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
                    item.id_kelompok = item.id_komoditas < 192 ? 0 : 1;
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
            form.setFieldsValue(konsumsiArtValues);
            calculateRekap();
        };
        fetchKonsumsiArt(id_art);
    }, [id_art]);

    useEffect(() => {
        form.setFieldsValue({ id_ruta, id_art });
    }, [form]);
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
        const beli_0 = `beli_harga0`;
        const beli_1 = `beli_harga1`;
        const produksi_0 = `produksi_harga0`;
        const produksi_1 = `produksi_harga1`;

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

        let newSubTotalHarga: SubTotal[] = [...subTotalHarga];
        newSubTotalHarga["0"]["beli"] = sum_beli_0;
        newSubTotalHarga["1"]["beli"] = sum_beli_1;
        newSubTotalHarga["0"]["produksi"] = sum_produksi_0;
        newSubTotalHarga["1"]["produksi"] = sum_produksi_1;
        //calculate total for each
        newSubTotalHarga["0"]["total"] = sum_beli_0 + sum_produksi_0;
        newSubTotalHarga["1"]["total"] = sum_beli_1 + sum_produksi_1;
        setSubTotalHarga(newSubTotalHarga);

        let newDaftarArt = [...daftarArt];
        const updatedArt = newDaftarArt.map((obj) =>
            obj.nomor_art === nomor_art
                ? { ...obj, rekap: newSubTotalHarga }
                : obj
        );

        setDaftarArt(updatedArt);
    }, 600);
    const handleSubmit = _debounce(() => form.submit(), 3000);
    const handleValueChange = () => {
        calculateRekap();
        handleSubmit();
    };
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
                <TabelBlok
                    form={form}
                    konten={konten}
                    title={title}
                    calculate={calculateSubTotalHarga}
                    rekapMak={subTotalHarga}
                />
            </Form>
        </Space>
    );
};

export default Art;
