import exportTableAsCsv from "@/Functions/ExportTable";
import { KomoditasSummary } from "@/types";
import { ExportOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { TablePaginationConfig, TableProps } from "antd/es/table";
import {
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
} from "antd/es/table/interface";
import { useState } from "react";

type OnChange = NonNullable<TableProps<KomoditasSummary>["onChange"]>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const GarisKemiskinanTabel = ({
    dataSource,
    loadingData,
}: {
    dataSource: KomoditasSummary[];
    loadingData: boolean;
}) => {
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [keyword, setKeyword] = useState<string>("");
    useState<KomoditasSummary[]>(dataSource);
    const KomoditasColumns: TableProps<any>["columns"] = [
        // kode_komoditas

        // average harga

        {
            title: "Kode Kabkot",
            dataIndex: "kode_kabkot",
            key: "kode_kabkot",
            render(value, record, index) {
                return `71${value}`;
            },
        },
        {
            title: "NKS",
            dataIndex: "nks",
            key: "nks",
        },
        {
            title: "Nomor Sampel",
            dataIndex: "nomor_sampel",
            key: "nomor_sampel",
        },
        {
            title: "Nomor ART",
            dataIndex: "nomor",
            key: "nomor",
        },
        // {
        //     title: "Nama",
        //     dataIndex: "nama_krt",
        //     key: "nama_krt",
        //     render: (value) =>
        //         value
        //             .split(" ")
        //             .map(
        //                 (word: string) =>
        //                     word.charAt(0).toUpperCase() +
        //                     word.slice(1).toLowerCase()
        //             )
        //             .join(" "),
        // },
        {
            title: "Pengeluaran",
            dataIndex: "pengeluaran_perkapita",
            key: "pengeluaran_perkapita",
            sorter: (a, b) => a.pengeluaran_perkapita - b.pengeluaran_perkapita,
            sortOrder:
                sortedInfo.columnKey === "pengeluaran_perkapita"
                    ? sortedInfo.order
                    : null,
            ellipsis: true,
            render: (value: number, record) =>
                `Rp ${value.toLocaleString("id-ID")}`,
        },
    ];
    function handleChange(
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter:
            | SorterResult<KomoditasSummary>
            | SorterResult<KomoditasSummary>[],
        extra: TableCurrentDataSource<KomoditasSummary>
    ): void {
        setSortedInfo(sorter as Sorts);
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>
                    Daftar Anggota Rumah Tangga Diatas Garis Kemiskinan
                    Sementara dan 20% dari populasi (clean dan warning)
                </h2>
                <Button
                    icon={<ExportOutlined />}
                    onClick={() =>
                        exportTableAsCsv(KomoditasColumns, dataSource)
                    }
                >
                    Export CSV
                </Button>
            </Space>
            <Table
                style={{ marginTop: 20 }}
                dataSource={dataSource}
                columns={KomoditasColumns}
                onChange={handleChange}
                loading={loadingData}
            />
        </div>
    );
};

export default GarisKemiskinanTabel;
