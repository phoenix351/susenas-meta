import {
    Button,
    Divider,
    Form,
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

const { Text, Title } = Typography;

const Blok4_3: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    // record: any;
}> = ({ form, onFinish, tabContentStyle }) => {
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
    const [messageApi, contextHolder] = message.useMessage();

    const Blok: React.FC<{
        title: string;
        subtitle?: string;
        columnsCount?: number;
        columns?: string[];
        children?: ReactNode;
    }> = ({ title, subtitle, columnsCount, columns, children }) => {
        return (
            <table style={tableStyle}>
                <thead
                    style={{
                        backgroundColor: "#fc0",
                        textAlign: "center",
                    }}
                >
                    <tr>
                        <td colSpan={columnsCount} style={cellStyle}>
                            <Space direction="vertical">
                                <Title level={4}>{title}</Title>
                                <Text>{subtitle}</Text>
                            </Space>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {columns && (
                        <>
                            <tr>
                                {columns.map((column) => (
                                    <th style={cellStyle}>{column}</th>
                                ))}
                            </tr>
                            <tr>
                                {Array.from(Array(columnsCount).keys()).map(
                                    (num) => (
                                        <td style={centerCell}>({num + 1})</td>
                                    )
                                )}
                            </tr>
                        </>
                    )}
                    {children}
                </tbody>
            </table>
        );
    };
    const renderBlok432 = (rincian: Rincian) => {
        return (
            <tr>
                <td style={centerCell}>{rincian.nomor}</td>
                <td style={cellStyle}>{rincian.rincian}</td>

                <td style={cellStyle}>
                    <Form.Item name={`blok4_32_${rincian.id}_beli`}>
                        <RupiahInput />
                    </Form.Item>
                </td>
                <td style={cellStyle}>
                    <Form.Item name={`blok4_32_${rincian.id}_produksi`}>
                        <RupiahInput />
                    </Form.Item>
                </td>
                <td style={cellStyle}>
                    <Form.Item name={`blok4_32_${rincian.id}_total`}>
                        <RupiahInput />
                    </Form.Item>
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
                    columnsCount={6}
                >
                    <tr>
                        <td style={cellStyle}></td>
                        <td style={cellStyle}>JUMLAH</td>

                        <td style={cellStyle}>
                            <Form.Item name={`blok4_3_mak_beli`}>
                                <Input />
                            </Form.Item>
                        </td>
                        <td style={cellStyle}>
                            <Form.Item name={`blok4_3_mak_produksi`}>
                                <Input />
                            </Form.Item>
                        </td>
                        <td style={cellStyle}>
                            <Form.Item name={`blok4_3_rokok_beli`}>
                                <Input />
                            </Form.Item>
                        </td>
                        <td style={cellStyle}>
                            <Form.Item name={`blok4_3_rokok_produksi`}>
                                <Input />
                            </Form.Item>
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
                >
                    {daftarRincian432.map((rincian) => renderBlok432(rincian))}
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
