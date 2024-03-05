import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import { Button, Table, Space, Typography } from "antd";
// import { Table } from "ant-table-extensions";
import { ExportOutlined } from "@ant-design/icons";
import { CompareFn } from "antd/es/table/interface";
import TextRupiah from "@/Components/TextRupiah";
import { createNumberSorter } from "@/Functions/ColumnSorter";
const { Title } = Typography;

const handleExport = (columns: any[], tableData: any[]) => {
    // Convert Ant Design table data to CSV format
    // console.log({ tableData });

    const csvContent =
        columns.map((column) => column.title).join(";") +
        "\n" +
        tableData
            .map((row) =>
                columns
                    .map((column) => {
                        if (column.render) {
                            // Use custom render function if present
                            const renderedValue = column.render(
                                row[column.dataIndex],
                                row
                            );
                            const value =
                                renderedValue && renderedValue.props
                                    ? renderedValue.props.children
                                    : renderedValue;
                            return value;
                        } else {
                            return row[column.dataIndex];
                        }
                    })
                    .join(";")
            )
            .join("\n");
    // console.log({ csvContent });
    // return;

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const Periksa = ({
    data,
}: PageProps & {
    data: any;
}) => {
    const [tableData, setTableData] = useState<any[]>([]);
    useEffect(() => {
        // console.log({ data, rekap_kabkot });
        setTableData(data);
        // setTableDataKabkot(rekap_kabkot);
    }, []);
    const jumlahSorter = createNumberSorter("jumlah_art");
    const nksSorter = createNumberSorter("nks");
    const r109Sorter = createNumberSorter("r109");
    const rincian15Sorter = createNumberSorter("blok4_32_15_total");
    const rincian16Sorter = createNumberSorter("blok4_32_16_total");
    const blokQcMakSorter = createNumberSorter("blokqc_sum");
    const blokQcNonMakSorter = createNumberSorter("blokqc_3");
    const uniqueKabkot = new Set();
    const columns = [
        {
            title: "Kode Kabupaten/Kota",
            dataIndex: "kode_kabkot",
            key: "kode_kabkot",
            // render: (_: any, record: any) => `${record.nks}`,
            filters: tableData
                .filter(
                    (record) =>
                        !uniqueKabkot.has(record.kode_kabkot) &&
                        uniqueKabkot.add(record.kode_kabkot)
                )
                .map((record) => ({
                    text: record.kode_kabkot,
                    value: record.kode_kabkot,
                })),
            onFilter: (value: any, record: any) => record.kode_kabkot === value,
            // sorter: nksSorter as CompareFn<object>,
        },
        {
            title: "NKS",
            dataIndex: "nks",
            key: "nks",
            render: (_: any, record: any) => `${record.nks}`,
            sorter: nksSorter as CompareFn<object>,
        },
        {
            title: "Nomor Urut Sampel Rumah Tangga",
            dataIndex: "r109",
            key: "r109",
            // render: (_: any, record: any) => `${record.nks}`,
            sorter: r109Sorter as CompareFn<object>,
        },
        {
            title: "Jumlah Art",
            dataIndex: "jumlah_art",
            key: "jumlah_art",
            sorter: jumlahSorter as CompareFn<object>,
        },
        {
            title: "Jumlah Pengeluaran Makanan (Blok IV.3.2 rincian 16)",
            dataIndex: "blok4_32_15_total",
            key: "blok4_32_15_total",
            render: (text: number | null) => (
                <TextRupiah color="#000" value={text ?? 0} />
            ),
            sorter: rincian15Sorter as CompareFn<object>,
        },
        {
            title: "Jumlah Pengeluaran Non Makanan (Blok IV.3.2 rincian 17)",
            dataIndex: "blok4_32_16_total",
            key: "blok4_32_16_total",
            render: (text: number | null) => (
                <TextRupiah color="#000" value={text ?? 0} />
            ),
            sorter: rincian16Sorter as CompareFn<object>,
        },
        {
            title: "Jumlah Komoditas Bahan Makanan + Makanan Jadi/Rokok (Blok QC No. 3 + 4)",
            dataIndex: "blokqc_sum",
            key: "blokqc_sum",
            // sorter: jumlahSorter as CompareFn<object>,
            sorter: blokQcMakSorter as CompareFn<object>,
        },
        {
            title: "Jumlah Komoditas Non Makanan (Blok QC No. 5)",
            dataIndex: "blokqc_3",
            key: "blokqc_3",
            sorter: blokQcNonMakSorter as CompareFn<object>,
            // sorter: jumlahSorter as CompareFn<object>,
        },
    ];

    return (
        <>
            <Head title="Periksa" />

            <Title level={2}>Progress pendataan menurut Ruta </Title>
            <Space
                style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    width: "100%",
                    justifyContent: "end",
                }}
            >
                <Button
                    type="primary"
                    onClick={() => handleExport(columns, tableData)}
                >
                    <ExportOutlined />
                    Export as CSV
                </Button>
            </Space>
            <Space
                style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    minHeight: "300px",
                    padding: "10px 15px",
                }}
                direction="vertical"
            >
                <Table
                    columns={columns}
                    // size="large"
                    // style={{ width: "100%", backgroundColor: "red" }}
                    dataSource={tableData}
                    scroll={{ x: "100%" }}
                />
            </Space>
        </>
    );
};

Periksa.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Periksa</h2>}
        selectedKey="periksa"
        children={page}
    ></AuthenticatedLayout>
);
export default Periksa;
