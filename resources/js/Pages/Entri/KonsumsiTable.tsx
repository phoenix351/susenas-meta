import NumberInput from "@/Components/NumberInput";
import RupiahInput from "@/Components/RupiahInput";
import { FormInstance, Input, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { render } from "react-dom";

const KonsumsiTable = ({ form }: { form: FormInstance }) => {
    const columns = [
        { title: "Kode", dataIndex: "id_komoditas", key: "id" },
        {
            title: "Rincian",
            dataIndex: "rincian",
            key: "rincian",
            render: (_: any, record: any) => record.komoditas.nama_komoditas,
        },
        {
            title: "Banyaknya (0,00)",
            dataIndex: "beli_volume",
            key: "beli_volume",
            render: (_: any, record: any) => {
                const inputName = `${record.id}_volume_beli`;
                form.setFieldValue(inputName, record.volume_beli ?? 0);
                // return record.volume_beli;
                return (
                    record.type === "sub" || (
                        <NumberInput inputName={inputName} />
                    )
                );
            },
        },
        {
            title: "Nilai (Rp)",
            dataIndex: "harga_beli",
            key: "harga_beli",
            render: (_: any, record: any) => {
                const inputName = `${record.id}_harga_beli`;
                form.setFieldValue(inputName, record.harga_beli ?? 0);
                // return record.volume_beli;
                return (
                    record.type === "sub" || (
                        <RupiahInput inputName={inputName} />
                    )
                );
            },
        },
        {
            title: "Banyaknya (0,00)",
            dataIndex: "produksi_volume",
            key: "produksi_volume",
        },
        {
            title: "Nilai (Rp)",
            dataIndex: "produksi_volume",
            key: "produksi_volume",
        },
        {
            title: "Banyaknya (5) + (7) (0,00)",
            dataIndex: "total_volume",
            key: "total_volume",
        },
        {
            title: "Nilai (6) + (8) (Rp)",
            dataIndex: "total_harga",
            key: "total_harga",
        },
    ];

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    async function fetchKonsumsiRuta() {
        try {
            const { data } = await axios.get(
                route("api.konsumsi.ruta.fetch", {
                    ruta: form.getFieldValue("id_ruta"),
                })
            );
            setDataSource(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchKonsumsiRuta();
    }, []);

    return <Table columns={columns} dataSource={dataSource} />;
};

export default KonsumsiTable;
