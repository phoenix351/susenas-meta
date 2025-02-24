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

const PengeluaranTable = ({
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
            title: "Nama Kepala Ruta",
            dataIndex: "nama_krt",
            key: "nama_krt",
            render: (value) =>
                value
                    .split(" ")
                    .map(
                        (word: string) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                    )
                    .join(" "),
        },
        {
            title: "Pengeluaran per Kapita",
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
        <Table
            style={{ marginTop: 20 }}
            dataSource={dataSource}
            columns={KomoditasColumns}
            onChange={handleChange}
            loading={loadingData}
        />
    );
};

export default PengeluaranTable;
