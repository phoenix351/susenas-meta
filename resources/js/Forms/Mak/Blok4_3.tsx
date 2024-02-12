import {
    Button,
    Divider,
    Form,
    FormInstance,
    Image,
    Input,
    InputNumber,
    Select,
    Space,
    Table,
    Typography,
    message,
} from "antd";
import { ReactNode, useEffect, useRef, useState } from "react";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { render } from "react-dom";
import RupiahInput from "@/Components/RupiahInput";
import { SubTotal } from "@/types";
import Blok from "@/Components/Blok";

const { Text, Title } = Typography;

const Blok4_3: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    subTotalHarga: SubTotal[];
    rekapArt: any;
    // record: any;
}> = ({ form, onFinish, tabContentStyle, subTotalHarga, rekapArt }) => {
    const formItemLayout = {
        // wrapperCol: { span: 24 },
    };
    const imageProps = {
        width: "70px",
        height: "auto",
        preview: false,
    };
    const tableStyle: React.CSSProperties = {
        borderCollapse: "collapse",
        width: "100%",
    };
    const cellStyle = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        padding: "5px",
    };
    const darkCell = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        // textAlign: "center",
        backgroundColor: "#636f83",
        padding: "5px",
    };
    const centerCell: React.CSSProperties = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        textAlign: "center",
        // backgroundColor: "#636f83",
        padding: "5px",
    };
    const blokStyle: React.CSSProperties = {
        backgroundColor: "#fc0",
        fontWeight: "700",
        padding: "5px",
    };
    const formItemStyle = {
        margin: "auto",
        padding: "5px",
    };
    interface Rincian {
        id: number;
        nomor: number;
        kode_coicop?: string;
        rincian: string;
        satuan?: string;
        type: string;
    }
    interface RekapMak {
        beli: number;
        produksi: number;
        total: number;
    }
    const [messageApi, contextHolder] = message.useMessage();
    const [rekapMak, setRekapMak] = useState({
        beli: 0,
        produksi: 0,
        total: 0,
        rerata: 0,
    });
    const calculateSubJumlah = (form: FormInstance) => {
        // console.log({ subKey, jenis });
        // ambil semua input dari form dengan akhiran jenis_hargasubkey    };

        const allFieldValues = form.getFieldsValue();
        // console.log({ pattern, allFieldValues });
        const pattern = {
            produksi: new RegExp(`^[0-9]|1[0-3]_produksi$`),
            beli: new RegExp(`^[0-9]|1[0-3]_beli$`),
        };

        const produksi = Object.entries(allFieldValues)
            .filter(([fieldName]) => {
                let isMatch = pattern.produksi.test(fieldName);

                return isMatch;
            })
            .reduce(
                (accumulator, [, value]) =>
                    accumulator + ((value as number) || 0),
                0
            );
        const beli = Object.entries(allFieldValues)
            .filter(([fieldName]) => {
                let isMatch = pattern.beli.test(fieldName);

                return isMatch;
            })
            .reduce(
                (accumulator, [, value]) =>
                    accumulator + ((value as number) || 0),
                0
            );

        let newRekap = rekapMak;
        newRekap.beli = beli;
        newRekap.produksi = produksi;
        newRekap.total = produksi + beli;
        newRekap.rerata = Math.round((newRekap.total * 30) / 7);
        setRekapMak(newRekap);
        console.log({ newRekap });
        form.setFieldValue(`blok4_32_14_beli`, beli);
        form.setFieldValue(`blok4_32_14_produksi`, produksi);

        form.setFieldValue(`blok4_32_14_total`, newRekap.total);
        form.setFieldValue(`blok4_32_15_total`, newRekap.rerata);
    };

    const renderBlok432: React.FC<{ rincian: Rincian; key: number }> = ({
        rincian,
        key,
    }) => {
        return (
            <tr>
                <td style={centerCell}>{rincian.nomor}</td>
                <td style={cellStyle}>{rincian.rincian}</td>

                <td style={cellStyle}>
                    {rincian.id < 16 && (
                        <RupiahInput
                            key={key}
                            inputName={`blok4_32_${rincian.id - 1}_beli`}
                            onChange={() => calculateSubJumlah(form)}
                        />
                    )}
                </td>
                <td style={cellStyle}>
                    {rincian.id < 16 && (
                        <RupiahInput
                            key={key}
                            inputName={`blok4_32_${rincian.id - 1}_produksi`}
                            onChange={() => calculateSubJumlah(form)}
                        />
                    )}
                </td>
                <td style={cellStyle}>
                    <RupiahInput
                        key={key}
                        inputName={`blok4_32_${rincian.id - 1}_total`}
                        onChange={() => calculateSubJumlah(form)}
                    />
                </td>
            </tr>
        );
    };
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
    ];
    // define Values;
    useEffect(() => {
        subTotalHarga.forEach((sub, index) => {
            let total = sub.total ?? 0;
            let produksi = sub.produksi ?? 0;
            let beli = sub.beli ?? 0;
            form.setFieldValue(`blok4_32_${index}_beli`, beli);
            form.setFieldValue(`blok4_32_${index}_total`, beli + produksi);
            form.setFieldValue(`blok4_32_${index}_produksi`, produksi);
        });
    }, [subTotalHarga]);
    useEffect(() => {
        rekapArt.forEach((art: any, index: number) => {
            form.setFieldValue(`blok4_31_${index}_mak_beli`, art[0]["beli"]);
            form.setFieldValue(
                `blok4_31_${index}_mak_produksi`,
                art[0]["produksi"]
            );
            form.setFieldValue(`blok4_31_${index}_rokok_beli`, art[1]["beli"]);
            form.setFieldValue(
                `blok4_31_${index}_rokok_produksi`,
                art[1]["produksi"]
            );
        });
        let summary = rekapArt.reduce(
            (acc: SubTotal[], innerArray: SubTotal[]) => {
                innerArray.forEach((item: SubTotal, index: number) => {
                    acc[index] = acc[index] || { beli: 0, produksi: 0 };
                    acc[index].beli += item.beli;
                    acc[index].produksi += item.produksi;
                });
                return acc;
            },
            []
        );
        if (summary.length < 1) {
            summary = [
                { beli: 0, produksi: 0 },
                { beli: 0, produksi: 0 },
            ];
        }

        form.setFieldValue(`blok4_31_jumlah_mak_beli`, summary[0]["beli"]);
        form.setFieldValue(`blok4_32_12_beli`, summary[0]["beli"]);
        form.setFieldValue(
            `blok4_31_jumlah_mak_produksi`,
            summary[0]["produksi"]
        );
        form.setFieldValue(`blok4_32_12_produksi`, summary[0]["produksi"]);
        form.setFieldValue(
            `blok4_32_12_total`,
            summary[0]["produksi"] + summary[0]["beli"]
        );
        form.setFieldValue(`blok4_31_jumlah_rokok_beli`, summary[1]["beli"]);
        form.setFieldValue(`blok4_32_13_beli`, summary[1]["beli"]);
        form.setFieldValue(
            `blok4_31_jumlah_rokok_produksi`,
            summary[1]["produksi"]
        );
        form.setFieldValue(`blok4_32_13_produksi`, summary[1]["produksi"]);
        form.setFieldValue(
            `blok4_32_13_total`,
            summary[1]["produksi"] + summary[1]["beli"]
        );
    }, [rekapArt]);

    const daftarArt = [
        { nama: "Bagas" },
        { nama: "Jaje" },
        { nama: "Messi" },
        { nama: "Dodo" },
    ];

    return (
        <Space direction="vertical" style={tabContentStyle}>
            <Button type="primary" onClick={() => calculateSubJumlah(form)}>
                Hitung Rekap
            </Button>
            <Form
                form={form}
                name="Blok4_3"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Blok
                    title={
                        "BLOK IV.3.1. REKAPITULASI PENGELUARAN MAKANAN DAN MINUMAN JADI SERTA ROKOK SELURUH ANGGOTA RUMAH TANGGA (DALAM RUPIAH)"
                    }
                    subtitle=""
                    columns={[
                        "No.",
                        "Nama ART",
                        "Makanan dan Minuman Jadi (Pembelian)",
                        "Makanan dan Minuman Jadi (Produksi sendiri, Pemberian, dsb)",
                        "Rokok dan Tembaku (Pembelian)",
                        "Rokok dan Tembaku (Produksi sendiri, Pemberian, dsb)",
                    ]}
                    columnsCount={6}
                    key={1}
                >
                    {daftarArt.map((art, index) => (
                        <tr>
                            <td style={centerCell}>{index + 1}</td>
                            <td style={cellStyle}>{art.nama}</td>

                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_mak_beli`}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_mak_produksi`}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_rokok_beli`}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_rokok_produksi`}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td style={cellStyle}></td>
                        <td style={cellStyle}>JUMLAH</td>

                        <td style={cellStyle}>
                            <RupiahInput
                                inputName={`blok4_31_jumlah_mak_beli`}
                            />
                        </td>
                        <td style={cellStyle}>
                            <RupiahInput
                                inputName={`blok4_31_jumlah_mak_produksi`}
                            />
                        </td>
                        <td style={cellStyle}>
                            <RupiahInput
                                inputName={`blok4_31_jumlah_rokok_beli`}
                            />
                        </td>
                        <td style={cellStyle}>
                            <RupiahInput
                                inputName={`blok4_31_jumlah_rokok_produksi`}
                            />
                        </td>
                    </tr>
                </Blok>
                {/* blok 4.3.2  */}

                <Divider />
                <Blok
                    title={
                        "BLOK IV.3.2. REKAPITULASI PENGELUARAN MAKANAN, MINUMAN, DAN ROKOK (DALAM RUPIAH)"
                    }
                    subtitle="[Kolom (3) Disalin dari Blok IV.1 Kolom (6), Blok IV.3.1 Kolom (3), atau (5)] dan [Kolom (4) Disalin dari Blok IV.1 Kolom (8), Blok IV.3.1 Kolom (4), atau (6)]"
                    columnsCount={5}
                    columns={[
                        "No.",
                        "Jenis Pengeluaran",
                        "Pembelian Seminggu Terakhir",
                        "Produksi Sendiri, Pemberian, dsb., Seminggu Terakhir",
                        "Total Seminggu Terakhir [Kolom 3 + Kolom 4]",
                    ]}
                    key={2}
                >
                    {daftarRincian432.map((rincian, key) =>
                        renderBlok432({ rincian, key })
                    )}
                </Blok>

                {contextHolder}
                {/* Blok I  */}
                {/* <Form.Item name="kode_prov" label="Provinsi">
                    <Select
                        options={daftarProv}
                        onChange={() => setKabkotDisable(false)}
                    />
                </Form.Item> */}
            </Form>
        </Space>
    );
};

export default Blok4_3;
