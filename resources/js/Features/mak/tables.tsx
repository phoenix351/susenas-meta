// src/features/mak/tables.tsx
import { Typography } from "antd";
import TextRupiah from "@/Components/TextRupiah";

const { Text } = Typography;

export const rangeHargaColumns = [
    {
        title: "Nomor",
        dataIndex: "nomor",
        key: "nomor",
        width: 10,
        render: (_: any, __: any, idx: number) => idx + 1,
    },
    {
        title: "Komoditas",
        dataIndex: "komoditas",
        key: "komoditas",
        render: (_: any, r: any) => `[${r.id_komoditas}] ${r.nama_komoditas}`,
    },
    {
        title: "Harga per Satuan",
        dataIndex: "harga",
        key: "harga",
        width: "20%",
        render: (text: string) => (
            <TextRupiah color="#000" value={Number(text)} />
        ),
    },
    {
        title: "Rincian",
        dataIndex: "rincian",
        key: "rincian",
        render: (_: any, r: any) => (
            <Text>
                {r.rincian} (<TextRupiah value={r.min} color="red" /> s.d{" "}
                <TextRupiah value={r.max} color="red" />)
            </Text>
        ),
    },
];

export const errorColumns = [
    {
        title: "Nomor",
        dataIndex: "nomor",
        key: "nomor",
        width: 15,
        render: (_: any, __: any, idx: number) => idx + 1,
    },
    { title: "Blok", dataIndex: "blok", key: "blok" },
    { title: "Variabel", dataIndex: "variable", key: "variable" },
    { title: "Deskripsi", dataIndex: "rincian", key: "rincian" },
];
