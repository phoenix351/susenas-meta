import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useRef, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import {
    Button,
    Form,
    FormInstance,
    FormListFieldData,
    Space,
    Tabs,
    message,
} from "antd";
import axios from "axios";
import Blok1_2 from "@/Forms/Mak/Blok1_2";
import Blok4_1 from "@/Forms/Mak/Blok4_1";
import Blok4_1art from "@/Forms/Mak/Blok4_1_art";
import Blok4_3 from "@/Forms/Mak/Blok4_3";
import Worksheet from "@/Forms/Mak/Worksheet";
import { AnggotaRumahTangga, PageProps, SubTotal } from "@/types";
import Blok_QC from "@/Forms/Mak/Blok_QC";
import { SaveOutlined } from "@ant-design/icons";
const daftarRincian432 = [
    {
        id: 1,
        nomor: 1,
        rincian: "Padi-padian (R.1)",
        type: "standar",
    },
    {
        id: 2,
        nomor: 2,
        rincian: "Umbi-umbian (R.8)",
        type: "standar",
    },
    {
        id: 3,
        nomor: 3,
        rincian: "Ikan/udang/cumi/kerang (R.16)",
        type: "standar",
    },
    {
        id: 4,
        nomor: 4,
        rincian: "Daging (R.55)",
        type: "standar",
    },
    {
        id: 5,
        nomor: 5,
        rincian: "Telur dan Susu (R.65)",
        type: "standar",
    },
    {
        id: 6,
        nomor: 6,
        rincian: "Sayur-sayuran (R.75)",
        type: "standar",
    },
    {
        id: 7,
        nomor: 7,
        rincian: "Kacang-kacangan (R.102)",
        type: "standar",
    },
    {
        id: 8,
        nomor: 8,
        rincian: "Buah-buahan (R.110)",
        type: "standar",
    },
    {
        id: 9,
        nomor: 9,
        rincian: "Minyak dan Kelapa (R.126)",
        type: "standar",
    },
    {
        id: 10,
        nomor: 10,
        rincian: "Bahan Minuman (R.131)",
        type: "standar",
    },
    {
        id: 11,
        nomor: 11,
        rincian: "Bumbu-bumbuan (R.139)",
        type: "standar",
    },
    {
        id: 12,
        nomor: 12,
        rincian: "Bahan Makanan Lainnya (R.154)",
        type: "standar",
    },
    {
        id: 13,
        nomor: 13,
        rincian: "Makanan dan Minuman Jadi (Blok IV.3.1 Baris Jumlah)",
        type: "standar",
    },
    {
        id: 14,
        nomor: 14,
        rincian: "Rokok dan Tembakau (Blok IV.3.1 Baris Jumlah)",
        type: "standar",
    },
    {
        id: 15,
        nomor: 15,
        rincian: "SUBJUMLAH [R.1 s.d. R.14]",
        type: "standar",
    },
    {
        id: 16,
        nomor: 16,
        rincian: "RATA-RATA PENGELUARAN MAKANAN SEBULAN [R.15 x 30/7]",
        type: "average",
    },
    {
        id: 17,
        nomor: 17,
        rincian:
            "RATA-RATA PENGELUARAN BUKAN MAKANAN SEBULAN [salin dari Blok 4.3.3 rincian 8 kolom 3]",
        type: "average",
    },
    {
        id: 18,
        nomor: 18,
        rincian: "RATA-RATA PENGELUARAN MAKANAN SEBULAN [R.16 + R17]",
        type: "average",
    },
];

const Mak = ({
    data,
    konsumsi_ruta,
    art,
    garis_kemiskinan,
}: PageProps & {
    data: any;
    konsumsi_ruta: any[];
    art: any[];
    garis_kemiskinan: number;
}) => {
    // const [cariForm] = Form.useForm();
    const tabContentStyle: React.CSSProperties = {
        backgroundColor: "#fff",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "15px",
        width: "100%",
    };
    // define forms
    const [form] = Form.useForm();
    const [blok4_1Form] = Form.useForm();
    const [blok4_1artForm] = Form.useForm();
    const [blok4_3Form] = Form.useForm();
    let [artForm] = Form.useForm();

    const [wtfForm] = Form.useForm();
    const [daftarSampel, setDaftarSampel] = useState([]);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const [daftarArt, setDaftarArt] = useState<AnggotaRumahTangga[]>([]);
    const [rekapMak, setRekapMak] = useState(
        daftarRincian432.map((rincian) => ({ beli: 0, produksi: 0, total: 0 }))
    );

    const [messageApi, contextHolder] = message.useMessage();

    const blok1_2Finish = async (values: any) => {
        console.log({ values });
        // return;
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Menyimpan data...",
        });
        try {
            const url = route("entri.mak.update");
            const { data } = await axios.patch(url, values, {
                headers: { "Content-Type": "application/json" },
            });
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil menyimpan",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const artFormFinish = async (values: any) => {
        console.log({ values });
        // return;

        messageApi.open({
            type: "loading",
            key: "4_1",
            content: "Menyimpan data art...",
        });
        try {
            const url = route("entri.mak.art.store");
            const response = await axios.post(url, values, {
                headers: { "Content-Type": "application/json" },
            });
            console.log({ response });
            // setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "4_1",
                content: "Berhasil menyimpan data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "4_1",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const blok4_1Finish = async (values: any) => {
        console.log({ values });
        // return;
        messageApi.open({
            type: "loading",
            key: "4_1",
            content: "Memuat Data",
        });
        try {
            const url = route("entri.mak.konsumsi.store");
            const { data } = await axios.patch(url, values, {
                headers: { "Content-Type": "application/json" },
            });
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "4_1",
                content: "Berhasil menyimpan data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "4_1",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const blok4_1artFinish = async (values: any) => {
        console.log({ values });
        messageApi.open({
            type: "loading",
            key: "4_1",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.inti", values);
            const { data } = await axios.get(url);
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil mengambil data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const blok4_3Finish = async (values: any) => {
        console.log({ values });
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.inti", values);
            const { data } = await axios.get(url);
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil mengambil data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const wtfFinish = async (values: any) => {
        console.log({ values });
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.inti", values);
            const { data } = await axios.get(url);
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil mengambil data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };

    function handleChange(activeKey: string): void {}
    const [rekapArt, setRekapArt] = useState([]);
    const [subTotalHarga, setSubTotalHarga] = useState([
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
    ]);
    // const [totalProduksi, setTotalProduksi] = useState(0);
    const calculateKalori = async (
        formValues: FormListFieldData
    ): Promise<number> => {
        const withVolume = Object.entries(formValues).filter(
            ([fieldName, value]) =>
                fieldName.endsWith("volume") &&
                typeof value === "number" &&
                value > 0
        );

        const promises = withVolume.map(async (item) => {
            let id_komoditas = item[0].split("_")[0];
            let kuantitas: number = Number(item[1]) ?? 0;
            try {
                const { data } = await axios.get(
                    route("api.mak.komoditas.kalori.fetch", {
                        id: id_komoditas,
                    })
                );
                return kuantitas * data;
            } catch (error) {
                console.log("error ketika fetch data kalori");
                return 0;
            }
        });

        const kaloriArray = await Promise.all(promises);
        return kaloriArray.reduce((sum, kalori) => sum + kalori, 0);
    };
    const calculateSubTotalHarga = async () => {
        // return;
        // console.log({ subKey, jenis });
        // ambil semua input dari form dengan akhiran jenis_hargasubkey    };
        const allFieldValues = blok4_1Form.getFieldsValue();

        calculateKalori(allFieldValues).then((totalKalori) => {
            console.log("Total Kalori:", totalKalori);
        });

        const subArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17];
        const jenisArr = ["beli", "produksi"];
        subArr.forEach((sub: any) => {
            let newrekapMak: SubTotal[] = [...rekapMak];

            const pattern_beli = `beli_harga${sub}`;
            const sum_beli = Object.entries(allFieldValues)
                .filter(
                    ([fieldName]) =>
                        fieldName.endsWith(pattern_beli) &&
                        !fieldName.includes("jumlah")
                )
                .reduce(
                    (accumulator, [, value]) =>
                        accumulator + ((value as number) || 0),
                    0
                );
            newrekapMak[sub]["beli"] = sum_beli;
            const pattern_produksi = `produksi_harga${sub}`;
            const sum_produksi = Object.entries(allFieldValues)
                .filter(
                    ([fieldName]) =>
                        fieldName.endsWith(pattern_produksi) &&
                        !fieldName.includes("jumlah")
                )
                .reduce(
                    (accumulator, [, value]) =>
                        accumulator + ((value as number) || 0),
                    0
                );
            newrekapMak[sub]["produksi"] = sum_produksi;
            if (sub <= 13) {
                newrekapMak[sub]["total"] =
                    newrekapMak[sub]["beli"] + newrekapMak[sub]["produksi"];
            }
            // newrekapMak[14]["beli"] = Object.entries(newrekapMak)
            newrekapMak[14] = newrekapMak
                .slice(0, 13)
                // .filter(([fieldName]: any) => fieldName === "beli");
                .reduce(
                    (prev, current) => ({
                        beli: prev.beli + current.beli,
                        produksi: prev.produksi + current.produksi,
                        total: prev.total + current.total,
                    }),
                    { beli: 0, produksi: 0, total: 0 }
                );
            newrekapMak[15]["total"] = Math.round(
                (newrekapMak[14]["total"] * 30) / 7
            );
            newrekapMak[17]["total"] =
                newrekapMak[15]["total"] + newrekapMak[16]["total"];

            setRekapMak(newrekapMak);
        });
    };

    useEffect(() => {
        let newrekapMak = [...rekapMak];

        daftarArt?.forEach((item, index) => {
            artForm.setFieldValue(`${index}-id_art`, data.id);
            artForm.setFieldValue(`${index}-nama`, item.nama);
            // const [form] = Form.useForm();
            // setArtForms([...artForms,form])
        });

        const summary = daftarArt?.reduce((summary: any[], item: any) => {
            item.rekap.forEach((entry: any, index: number) => {
                summary[index] = summary[index] || {
                    beli: 0,
                    produksi: 0,
                    total: 0,
                };
                summary[index].beli += entry.beli;
                summary[index].produksi += entry.produksi;
                summary[index].total += entry.total;
            });
            return summary;
        }, []);
        newrekapMak[12] = summary ? summary[0] : 0;
        newrekapMak[13] = summary ? summary[1] : 0;
        newrekapMak[14] = newrekapMak
            .slice(0, 13)
            // .filter(([fieldName]: any) => fieldName === "beli");
            .reduce(
                (prev, current) => ({
                    beli: current ? prev.beli + current.beli : 0,
                    produksi: current ? prev.produksi + current.produksi : 0,
                    total: current ? prev.total + current.total : 0,
                }),
                { beli: 0, produksi: 0, total: 0 }
            );
        newrekapMak[15]["total"] = Math.round(
            (newrekapMak[14]["total"] * 30) / 7
        );
        newrekapMak[17]["total"] =
            newrekapMak[15]["total"] + newrekapMak[16]["total"];

        setRekapMak(newrekapMak);
    }, [daftarArt]);

    const isEffectSetUp = useRef(false);
    const handleKeyPress = (event: {
        ctrlKey: any;
        key: string;
        preventDefault: () => void;
    }) => {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault();
            form.submit();
        }
    };
    // initialize the form
    useEffect(() => {
        art = art.map((item) => ({
            ...item,
            rekap: [
                { produksi: 0, beli: 0, total: 0 },
                { produksi: 0, beli: 0, total: 0 },
            ],
        }));
        setDaftarArt([...art]);
        if (art.length < 1) {
            console.log("kurang dari 1");

            setDaftarArt((prev) => [
                ...prev,
                {
                    id: "",
                    id_ruta: data.id,
                    nama: data.r110,
                    nomor_art: 0,
                    rekap: [
                        { produksi: 0, beli: 0, total: 0 },
                        { produksi: 0, beli: 0, total: 0 },
                    ],
                },
            ]);
        } else {
        }

        document.addEventListener("keydown", handleKeyPress);
        form.setFieldsValue(data);
        form.setFieldValue("wtf_26", garis_kemiskinan);
        console.log({ art });

        blok4_1Form.setFieldsValue({ id_ruta: data.id });
        console.log({ data, konsumsi_ruta });
        const daftarSub = [1, 8, 16];
        let konsumsiRutaValues = konsumsi_ruta.map((item) => ({
            [`${daftarSub.includes(item.id_komoditas) ? "jumlah" : ""}${
                item.id_komoditas
            }_beli_harga${item.id_kelompok}`]: item.harga_beli,
            [`${daftarSub.includes(item.id_komoditas) ? "jumlah" : ""}${
                item.id_komoditas
            }_produksi_harga${item.id_kelompok}`]: item.harga_produksi,
            [`${item.id_komoditas}_total_harga`]: item.harga_total,
            [`${item.id_komoditas}_item`]: item.item,
            [`${item.id_komoditas}_satuan`]: item.satuan,
            [`${item.id_komoditas}_beli_volume`]: item.volume_beli,
            [`${item.id_komoditas}_produksi_volume`]: item.volume_produksi,
            [`${item.id_komoditas}_total_volume`]: item.volume_total,
        }));

        const singleObject = konsumsiRutaValues.reduce((result, obj) => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result[key] = obj[key];
                }
            }
            return result;
        }, {});
        // console.log({ singleObject });
        blok4_1Form.setFieldsValue(singleObject);
        artForm.setFieldsValue({
            id_ruta: data.id,
        });

        // initialize last saved
        setLastSaved(new Date(data.updated_at));
    }, []);

    return (
        <>
            {contextHolder}
            <Head title="Entri Kuesioner Inti" />
            <Space
                style={{
                    // backgroundColor: "#fff",
                    width: "100%",
                    minHeight: "300px",
                    padding: "10px 15px",
                }}
                direction="vertical"
            >
                <Space
                    direction="horizontal"
                    style={{
                        width: "100%",
                        justifyContent: "end",
                        // backgroundColor: "red",
                    }}
                >
                    Last Saved :
                    {lastSaved?.toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false,
                    }) || "Never"}
                    <Button
                        onClick={async () => {
                            try {
                                // Submit all forms concurrently using Promise.all
                                const [form1, form2, form3] = await Promise.all(
                                    [
                                        artForm.submit(),
                                        form.submit(),
                                        blok4_1Form.submit(),
                                    ]
                                );
                                artForm.submit();
                                // Now, all forms are submitted successfully
                                setLastSaved(new Date());
                                router.get(
                                    route("entri.mak.edit", { id: data.id }),
                                    {},
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    }
                                );
                            } catch (error) {
                                console.error("Error submitting forms:", error);
                                // Handle error if any of the forms fails to submit
                            }
                        }}
                    >
                        <SaveOutlined /> Simpan
                    </Button>
                </Space>
                <Tabs
                    onChange={handleChange}
                    type="card"
                    items={[
                        {
                            label: "Blok I, II",
                            key: "1",
                            children: (
                                <Blok1_2
                                    tabContentStyle={tabContentStyle}
                                    form={form}
                                    onFinish={blok1_2Finish}
                                    setDaftarArt={setDaftarArt}
                                    editable={false}
                                />
                            ),
                        },
                        {
                            label: "Worksheet",
                            key: "2",
                            children: (
                                <Worksheet
                                    tabContentStyle={tabContentStyle}
                                    form={form}
                                    onFinish={blok1_2Finish}
                                />
                            ),
                        },
                        {
                            label: "Blok IV.1",
                            key: "3",
                            children: (
                                <Blok4_1
                                    onFinish={blok4_1Finish}
                                    form={blok4_1Form}
                                    tabContentStyle={tabContentStyle}
                                    calculate={calculateSubTotalHarga}
                                    subTotalHarga={subTotalHarga}
                                    rekapMak={rekapMak}
                                    setRekapMak={setRekapMak}
                                    // onFinish={blok4_1Finish}
                                />
                            ),
                        },
                        {
                            label: "Blok IV.1 ART",
                            key: "4",
                            children: (
                                <Blok4_1art
                                    tabContentStyle={tabContentStyle}
                                    form={blok4_1artForm}
                                    artForm={artForm}
                                    onFinish={blok4_1artFinish}
                                    artFormFinish={artFormFinish}
                                    rekapArt={rekapArt}
                                    setRekapArt={setRekapArt}
                                    daftarArt={daftarArt}
                                    setDaftarArt={setDaftarArt}
                                    calculateKalori={calculateKalori}
                                />
                            ),
                        },
                        {
                            label: "Blok IV.3",
                            key: "5",
                            children: (
                                <Blok4_3
                                    tabContentStyle={tabContentStyle}
                                    form={form}
                                    onFinish={blok1_2Finish}
                                    daftarArt={daftarArt}
                                    rekapMak={rekapMak}
                                    daftarRincian432={daftarRincian432}
                                    setRekapMak={setRekapMak}
                                />
                            ),
                        },
                        {
                            label: "Blok QC",
                            key: "6",
                            children: (
                                <Blok_QC
                                    tabContentStyle={tabContentStyle}
                                    form={form}
                                    onFinish={blok1_2Finish}
                                    daftarArt={daftarArt}
                                    rekapMak={rekapMak}
                                    daftarRincian432={daftarRincian432}
                                    setRekapMak={setRekapMak}
                                />
                            ),
                        },
                    ]}
                />
                {/* <Table dataSource={dazftarSampel} columns={columns} />; */}
            </Space>
        </>
    );
};

Mak.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Dashboard</h2>}
        selectedKey="entri"
        children={page}
    ></AuthenticatedLayout>
);
export default Mak;
