import exportTableAsCsv from "@/Functions/ExportTable";
import { KomoditasDataType, KomoditasSummary } from "@/types";
import { Button, Space, Table } from "antd";
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
    garisKemiskinanSementara,
}: {
    dataSource: KomoditasSummary[];
    loadingData: boolean;
    garisKemiskinanSementara: number;
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
        {
            title: "Flag Kemiskinan",
            dataIndex: "flag_kemiskinan",
            key: "flag_kemiskinan",

            render: (value: number, record) =>
                record.pengeluaran_perkapita < garisKemiskinanSementara
                    ? "miskin"
                    : "tidak miskin",
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
                <h2>Daftar Rumah Tangga kondisi clean dan warning</h2>
                <Button
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

export default PengeluaranTable;
