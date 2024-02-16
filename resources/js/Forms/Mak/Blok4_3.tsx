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
import { RekapMak, Rincian, SubTotal } from "@/types";
import Blok from "@/Components/Blok";
import TextRupiah from "@/Components/TextRupiah";

const { Text, Title } = Typography;

const Blok4_3: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    daftarArt: any;
    rekapMak: RekapMak[];
    setRekapMak: React.Dispatch<React.SetStateAction<RekapMak[]>>;
    daftarRincian432: Rincian[];
}> = ({
    form,
    onFinish,
    tabContentStyle,
    rekapMak,
    setRekapMak,
    daftarArt,
    daftarRincian432,
}) => {
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

    // const calculateSubJumlah = (form: FormInstance) => {
    //     // console.log({ subKey, jenis });
    //     // ambil semua input dari form dengan akhiran jenis_hargasubkey    };

    //     const allFieldValues = form.getFieldsValue();
    //     // console.log({ pattern, allFieldValues });
    //     const pattern = {
    //         produksi: new RegExp(`^[0-9]|1[0-3]_produksi$`),
    //         beli: new RegExp(`^[0-9]|1[0-3]_beli$`),
    //     };

    //     const produksi = Object.entries(allFieldValues)
    //         .filter(([fieldName]) => {
    //             let isMatch = pattern.produksi.test(fieldName);

    //             return isMatch;
    //         })
    //         .reduce(
    //             (accumulator, [, value]) =>
    //                 accumulator + ((value as number) || 0),
    //             0
    //         );
    //     const beli = Object.entries(allFieldValues)
    //         .filter(([fieldName]) => {
    //             let isMatch = pattern.beli.test(fieldName);

    //             return isMatch;
    //         })
    //         .reduce(
    //             (accumulator, [, value]) =>
    //                 accumulator + ((value as number) || 0),
    //             0
    //         );

    //     let newRekap = rekapMak;
    //     newRekap.beli = beli;
    //     newRekap.produksi = produksi;
    //     newRekap.total = produksi + beli;
    //     newRekap.rerata = Math.round((newRekap.total * 30) / 7);
    //     setRekapMak(newRekap);
    //     console.log({ newRekap });
    //     form.setFieldValue(`blok4_32_14_beli`, beli);
    //     form.setFieldValue(`blok4_32_14_produksi`, produksi);

    //     form.setFieldValue(`blok4_32_14_total`, newRekap.total);
    //     form.setFieldValue(`blok4_32_15_total`, newRekap.rerata);
    // };

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
                        <>
                            <RupiahInput
                                key={key}
                                inputName={`blok4_32_${rincian.id - 1}_beli`}
                            />
                            <TextRupiah
                                color="red"
                                key={rincian.id}
                                value={rekapMak[rincian.id - 1].beli}
                            />
                        </>
                    )}
                </td>
                <td style={cellStyle}>
                    {rincian.id < 16 && (
                        <>
                            <RupiahInput
                                key={key}
                                inputName={`blok4_32_${
                                    rincian.id - 1
                                }_produksi`}
                            />
                            <TextRupiah
                                color="red"
                                key={rincian.id}
                                value={rekapMak[rincian.id - 1].produksi}
                            />
                        </>
                    )}
                </td>
                <td style={cellStyle}>
                    <>
                        <RupiahInput
                            key={key}
                            inputName={`blok4_32_${rincian.id - 1}_total`}
                        />
                        <TextRupiah
                            color="red"
                            key={rincian.id}
                            value={rekapMak[rincian.id - 1].total}
                        />
                    </>
                </td>
            </tr>
        );
    };

    // // define Values;
    // useEffect(() => {
    //     subTotalHarga.forEach((sub, index) => {
    //         let total = sub.total ?? 0;
    //         let produksi = sub.produksi ?? 0;
    //         let beli = sub.beli ?? 0;
    //         form.setFieldValue(`blok4_32_${index}_beli`, beli);
    //         form.setFieldValue(`blok4_32_${index}_total`, beli + produksi);
    //         form.setFieldValue(`blok4_32_${index}_produksi`, produksi);
    //     });
    // }, [subTotalHarga]);
    // useEffect(() => {
    //     rekapArt.forEach((art: any, index: number) => {
    //         form.setFieldValue(`blok4_31_${index}_mak_beli`, art[0]["beli"]);
    //         form.setFieldValue(
    //             `blok4_31_${index}_mak_produksi`,
    //             art[0]["produksi"]
    //         );
    //         form.setFieldValue(`blok4_31_${index}_rokok_beli`, art[1]["beli"]);
    //         form.setFieldValue(
    //             `blok4_31_${index}_rokok_produksi`,
    //             art[1]["produksi"]
    //         );
    //     });
    //     let summary = rekapArt.reduce(
    //         (acc: SubTotal[], innerArray: SubTotal[]) => {
    //             innerArray.forEach((item: SubTotal, index: number) => {
    //                 acc[index] = acc[index] || { beli: 0, produksi: 0 };
    //                 acc[index].beli += item.beli;
    //                 acc[index].produksi += item.produksi;
    //             });
    //             return acc;
    //         },
    //         []
    //     );
    //     if (summary.length < 1) {
    //         summary = [
    //             { beli: 0, produksi: 0 },
    //             { beli: 0, produksi: 0 },
    //         ];
    //     }

    //     form.setFieldValue(`blok4_31_jumlah_mak_beli`, summary[0]["beli"]);
    //     form.setFieldValue(`blok4_32_12_beli`, summary[0]["beli"]);
    //     form.setFieldValue(
    //         `blok4_31_jumlah_mak_produksi`,
    //         summary[0]["produksi"]
    //     );
    //     form.setFieldValue(`blok4_32_12_produksi`, summary[0]["produksi"]);
    //     form.setFieldValue(
    //         `blok4_32_12_total`,
    //         summary[0]["produksi"] + summary[0]["beli"]
    //     );
    //     form.setFieldValue(`blok4_31_jumlah_rokok_beli`, summary[1]["beli"]);
    //     form.setFieldValue(`blok4_32_13_beli`, summary[1]["beli"]);
    //     form.setFieldValue(
    //         `blok4_31_jumlah_rokok_produksi`,
    //         summary[1]["produksi"]
    //     );
    //     form.setFieldValue(`blok4_32_13_produksi`, summary[1]["produksi"]);
    //     form.setFieldValue(
    //         `blok4_32_13_total`,
    //         summary[1]["produksi"] + summary[1]["beli"]
    //     );
    // }, [rekapArt]);
    const [rekapArt, setRekapArt] = useState([
        { beli: 0, produksi: 0, total: 0 },
        { beli: 0, produksi: 0, total: 0 },
    ]);
    const calculateSummary = (data: any) => {
        console.log("call calculate");
        return data.reduce((summary: any[], item: any) => {
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
    };

    useEffect(() => {
        let summary = calculateSummary(daftarArt);
        setRekapArt(summary);
        setRekapMak((rekap: RekapMak[]) => {
            let newRekap = [...rekap];
            newRekap[12] = summary[0];
            newRekap[13] = summary[1];
            newRekap[14] = newRekap
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
            return [...newRekap];
        });
    }, [daftarArt]);

    return (
        <Space direction="vertical" style={tabContentStyle}>
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
                    {daftarArt.map((art: any, index: number) => (
                        <tr>
                            <td style={centerCell}>{index + 1}</td>
                            <td style={cellStyle}>{art.nama}</td>

                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_mak_beli`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={art.rekap[0]["beli"]}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_mak_produksi`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={art.rekap[0]["produksi"]}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_rokok_beli`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={art.rekap[1]["beli"]}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_rokok_produksi`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={art.rekap[1]["produksi"]}
                                />
                            </td>
                        </tr>
                    ))}
                    {daftarArt.length > 0 && (
                        <tr>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>JUMLAH</td>

                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_jumlah_mak_beli`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={rekapArt[0]["beli"]}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_jumlah_mak_produksi`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={rekapArt[0]["produksi"]}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_jumlah_rokok_beli`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={rekapArt[1]["beli"]}
                                />
                            </td>
                            <td style={cellStyle}>
                                <RupiahInput
                                    inputName={`blok4_31_jumlah_rokok_produksi`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={rekapArt[1]["produksi"]}
                                />
                            </td>
                        </tr>
                    )}
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
