import { KomoditasDataType, KomoditasSummary } from "@/types";
import { Space, Table } from "antd";
import {
    ColumnProps,
    ColumnType,
    TablePaginationConfig,
    TableProps,
} from "antd/es/table";
import {
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
} from "antd/es/table/interface";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";

type OnChange = NonNullable<TableProps<KomoditasSummary>["onChange"]>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const KomoditasSummaryTable = ({
    dataSource,
    loadingData,
}: {
    dataSource: KomoditasSummary[];
    loadingData: boolean;
}) => {
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [keyword, setKeyword] = useState<string>("");
    useState<KomoditasSummary[]>(dataSource);
    const KomoditasColumns: TableProps<KomoditasSummary>["columns"] = [
        // kode_komoditas
        {
            title: "Kode Komoditas",
            dataIndex: "id_komoditas",
            key: "id_komoditas",
            sorter: (a, b) => a.id_komoditas - b.id_komoditas,
            sortOrder:
                sortedInfo.columnKey === "id_komoditas"
                    ? sortedInfo.order
                    : null,
            ellipsis: true,
        },
        // nama_kelompok
        {
            title: "Kelompok",
            dataIndex: "nama_kelompok",
            key: "nama_kelompok",
        },
        // nama komoditas
        {
            title: "Nama Komoditas",
            dataIndex: "nama_komoditas",
            key: "nama_komoditas",
        },
        {
            title: "Jumlah Konsumsi",
            key: "jumlah_konsumsi",
            children: [
                // volume
                {
                    title: "Konsumsi",
                    dataIndex: "sum_volume",
                    key: "sum_volume",
                    sorter: (a, b) => a.sum_volume - b.sum_volume,
                    sortOrder:
                        sortedInfo.columnKey === "sum_volume"
                            ? sortedInfo.order
                            : null,
                    ellipsis: true,
                    render: (value: number, record: KomoditasSummary) =>
                        `${value
                            .toLocaleString()
                            .replace(/\./g, "#") // Temporarily replace '.' with '#'
                            .replace(/,/g, ".") // Replace ',' with '.'
                            .replace(/#/g, ",")} ${record.satuan}`, // Replace '#' with ','
                },
                // kalori
                {
                    title: "Kalori",
                    dataIndex: "sum_kalori",
                    key: "sum_kalori",
                    sorter: (a, b) => a.sum_kalori - b.sum_kalori,
                    sortOrder:
                        sortedInfo.columnKey === "sum_kalori"
                            ? sortedInfo.order
                            : null,
                    ellipsis: true,
                    render: (value: number) =>
                        value
                            .toLocaleString()
                            .replace(/\./g, "#") // Temporarily replace '.' with '#'
                            .replace(/,/g, ".") // Replace ',' with '.'
                            .replace(/#/g, ","), // Replace '#' with ','
                },
            ],
        },

        // average harga
        {
            title: "Rata-rata Harga Per Satuan",
            dataIndex: "average_harga",
            key: "average_harga",
            sorter: (a, b) => a.average_harga - b.average_harga,
            sortOrder:
                sortedInfo.columnKey === "average_harga"
                    ? sortedInfo.order
                    : null,
            ellipsis: true,
            render: (value: number, record) =>
                `Rp ${value
                    .toLocaleString()
                    .replace(/\./g, "#") // Temporarily replace '.' with '#'
                    .replace(/,/g, ".") // Replace ',' with '.'
                    .replace(/#/g, ",")} / ${record.satuan}`,
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
        <Table
            style={{ marginTop: 20 }}
            dataSource={dataSource}
            columns={KomoditasColumns}
            onChange={handleChange}
            loading={loadingData}
        />
    );
};

export default KomoditasSummaryTable;
