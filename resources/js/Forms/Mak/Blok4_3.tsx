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
import RekapArt from "@/Components/RekapArt";
import RekapRT from "@/Components/RekapRT";

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
    // console.log({ daftarArt });

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
    const rightCell: React.CSSProperties = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        textAlign: "right",
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

    const [messageApi, contextHolder] = message.useMessage();


    const [rekapArt, setRekapArt] = useState({
        12: { beli: 0, produksi: 0, total: 0 },
        13: { beli: 0, produksi: 0, total: 0 },
    });
    // const [rekapArt, setRekapArt] = useState([
    //     { beli: 0, produksi: 0, total: 0 },
    //     { beli: 0, produksi: 0, total: 0 },
    // ]);
    const calculateSummary = (data: any) => {
        // console.log("call calculate");
        let calculate = data.reduce((summary: any[], item: any) => {
            Object.values(item.rekap).forEach((entry: any, index: number) => {
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
        return {
            12: calculate[0],
            13: calculate[1],
        };
    };

    useEffect(() => {
        let summary = calculateSummary(daftarArt);

        const fetchArt = async () => {
            const { data } = await axios.get(
                route("entri.mak.art.fetch", { id_ruta: daftarArt[0]?.id_ruta })
            );
            // console.log({ data });

            data.forEach((art: any, index: number) => {
                `blok4_31_${index}_id_art`;

                form.setFieldValue(`blok4_31_${index}_id_art`, art.id);
            });
        };
        fetchArt();
        setRekapArt(summary);
        setRekapMak((rekap: RekapMak[]) => {
            let newRekap = [...rekap];
            newRekap[12] = summary[12];
            newRekap[13] = summary[13];
            newRekap[14] = newRekap
                .slice(0, 14)
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
        // console.log({ rekapMak });
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
                        <RekapArt
                            art={art}
                            index={index}
                            key={index}
                            form={form}
                            tipe="individu"
                        />
                    ))}
                    {daftarArt.length > 0 && (
                        <RekapArt
                            art={{ rekap: rekapArt }}
                            index={99}
                            key={99}
                            form={form}
                            tipe="jumlah"
                        />
                       
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
                    {daftarRincian432.map(
                        // (rincian, key) => renderBlok432({ rincian, key })
                        (rincian, key) => (
                            <RekapRT
                                form={form}
                                rincian={rincian}
                                key={key}
                                index={key}
                                rekapMak={rekapMak}
                                setRekapMak={setRekapMak}
                            />
                        )
                        // <renderBlok432 key={key} rincian={rincian}/>
                    )}
                </Blok>

                {contextHolder}
            </Form>
        </Space>
    );
};

export default Blok4_3;
