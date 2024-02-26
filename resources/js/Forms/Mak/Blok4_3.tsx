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
    console.log({ daftarArt });

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
    interface RekapMak {
        beli: number;
        produksi: number;
        total: number;
    }
    const [messageApi, contextHolder] = message.useMessage();

    const handleNonMakInput = (value: any) => {
        let updatedRekap = [...rekapMak];
        updatedRekap[16].total = value;
        updatedRekap[17].total =
            updatedRekap[15].total + updatedRekap[16].total;

        updatedRekap;

        setRekapMak(updatedRekap);
    };

    const renderBlok432: React.FC<{ rincian: Rincian; key: number }> = ({
        rincian,
        key,
    }) => {
        return (
            <tr>
                <td style={centerCell}>{rincian.nomor}</td>
                <td style={cellStyle}>{rincian.rincian}</td>

                <td style={rightCell}>
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
                <td style={rightCell}>
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
                <td style={rightCell}>
                    <>
                        <RupiahInput
                            key={key}
                            inputName={`blok4_32_${rincian.id - 1}_total`}
                            onChange={
                                key === 16 ? handleNonMakInput : undefined
                            }
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

    const [rekapArt, setRekapArt] = useState({
        12: { beli: 0, produksi: 0, total: 0 },
        13: { beli: 0, produksi: 0, total: 0 },
    });
    // const [rekapArt, setRekapArt] = useState([
    //     { beli: 0, produksi: 0, total: 0 },
    //     { beli: 0, produksi: 0, total: 0 },
    // ]);
    const calculateSummary = (data: any) => {
        console.log("call calculate");
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
        console.log({ rekapMak });
    }, [daftarArt]);
    useEffect(() => {
        const fetchArt = async () => {
            const { data } = await axios.get(
                route("entri.mak.art.fetch", { id_ruta: daftarArt[0]?.id_ruta })
            );
            console.log({ daftarArt });

            data.forEach((art: any, index: number) => {
                `blok4_31_${index}_id_art`;

                form.setFieldValue(`blok4_31_${index}_id_art`, art.id);
            });
        };
        fetchArt();
    }, []);

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
                            <td style={cellStyle}>
                                {art.nama}
                                <Form.Item
                                    key={`form-item-${index}`} // Add a unique key here
                                    name={`blok4_31_${index}_id_art`}
                                    label={null}
                                    initialValue={art.id}
                                    hidden
                                    // hidden
                                >
                                    <Input />
                                </Form.Item>
                            </td>

                            <td style={rightCell}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_mak_beli`}
                                    initialValue={art.mak_beli}
                                />
                                <TextRupiah
                                    color="red"
                                    // value={0}
                                    value={art.rekap[12]["beli"]}
                                />
                            </td>
                            <td style={rightCell}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_mak_produksi`}
                                    initialValue={art.mak_produksi}
                                />
                                <TextRupiah
                                    color="red"
                                    // value={0}
                                    value={art.rekap[12]["produksi"]}
                                />
                            </td>
                            <td style={rightCell}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_rokok_beli`}
                                    initialValue={art.rokok_beli}
                                />
                                <TextRupiah
                                    color="red"
                                    // value={0}
                                    value={art.rekap[13]["beli"]}
                                />
                            </td>
                            <td style={rightCell}>
                                <RupiahInput
                                    inputName={`blok4_31_${index}_rokok_produksi`}
                                    initialValue={art.rokok_produksi}
                                />
                                <TextRupiah
                                    color="red"
                                    // value={0}
                                    value={art.rekap[13]["produksi"]}
                                />
                            </td>
                        </tr>
                    ))}
                    {daftarArt.length > 0 && (
                        <tr>
                            <td style={cellStyle}></td>
                            <td style={cellStyle}>JUMLAH</td>

                            <td style={rightCell}>
                                <RupiahInput
                                    inputName={`blok4_31_jumlah_mak_beli`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={rekapArt[12]["beli"]}
                                />
                            </td>
                            <td style={rightCell}>
                                <RupiahInput
                                    inputName={`blok4_31_jumlah_mak_produksi`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={rekapArt[12]["produksi"]}
                                />
                            </td>
                            <td style={rightCell}>
                                <RupiahInput
                                    inputName={`blok4_31_jumlah_rokok_beli`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={rekapArt[13]["beli"]}
                                />
                            </td>
                            <td style={rightCell}>
                                <RupiahInput
                                    inputName={`blok4_31_jumlah_rokok_produksi`}
                                />
                                <TextRupiah
                                    color="red"
                                    value={rekapArt[13]["produksi"]}
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
                    {daftarRincian432.map(
                        (rincian, key) => renderBlok432({ rincian, key })
                        // <renderBlok432 key={key} rincian={rincian}/>
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
