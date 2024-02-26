import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";
import {
    Button,
    Table,
    Card,
    Col,
    Row,
    Space,
    Statistic,
    Typography,
} from "antd";
// import { Table } from "ant-table-extensions";
import {
    WarningOutlined,
    StopOutlined,
    CheckCircleOutlined,
    ExportOutlined,
} from "@ant-design/icons";
import { CompareFn, SortOrder } from "antd/es/table/interface";
const { Title } = Typography;

type Sorter<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

function createSorter<T>(property: keyof T): Sorter<T> {
    return (a: T, b: T, sortOrder?: SortOrder): number => {
        const valueA = String(a[property]);
        const valueB = String(b[property]);

        if (sortOrder === "ascend") {
            return valueA.localeCompare(valueB);
        }

        if (sortOrder === "descend") {
            return -valueB.localeCompare(valueA);
        }

        return 0;
    };
}
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

const Dashboard = ({
    data,
    rekap_kabkot,
}: PageProps & {
    data: any;
    rekap_kabkot: any;
}) => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [tableDataKabkot, setTableDataKabkot] = useState<any[]>([]);
    useEffect(() => {
        console.log({ data, rekap_kabkot });
        setTableData(data);
        setTableDataKabkot(rekap_kabkot);
    }, []);
    const jumlahSorter = createSorter("jumlah_dok");
    const nksSorter = createSorter("nks");
    const persentaseSorter = createSorter("persentase");
    const columns = [
        // {
        //     title: "No",
        //     dataIndex: "id",
        //     key: "id",
        //     render: (_: any, rec: any, index: number) => index + 1,
        // },
        {
            title: "Kabupaten",
            dataIndex: "kabupaten",
            key: "kabupaten",
            filters: tableDataKabkot.map((record) => ({
                text: `[${record.kode_prov}${record.kode_kabkot}] ${record.kabkot}`,
                value: record.kode_kabkot,
            })),
            onFilter: (value: any, record: any) => record.kode_kabkot === value,

            render: (_: any, record: any) =>
                `[${record.kode_prov}${record.kode_kabkot}] ${record.kabkot}`,
        },
        // {
        //     title: "Kecamatan",
        //     dataIndex: "kecamatan",
        //     key: "kecamatan",
        //     render: (_: any, record: any) =>
        //         `[${record.kode_kec}] ${record.kec}`,
        // },
        // {
        //     title: "Desa",
        //     dataIndex: "desa",
        //     key: "desa",
        //     render: (_: any, record: any) =>
        //         `[${record.kode_desa}] ${record.desa}`,
        // },
        {
            title: "NKS",
            dataIndex: "nks",
            key: "nks",
            render: (_: any, record: any) => `${record.nks}`,
            sorter: nksSorter as CompareFn<object>,
        },
        {
            title: "Jumlah Dokumen",
            dataIndex: "jumlah_dok",
            key: "jumlah_dok",
            sorter: jumlahSorter as CompareFn<object>,
        },
        {
            title: "Target Dokumen",
            dataIndex: "target_dok",
            key: "target_dok",
            render: () => 10,
        },

        {
            title: "%",
            dataIndex: "persentase",
            key: "persentase",
            sorter: (a: { jumlah_dok: any }, b: { jumlah_dok: any }) => {
                const valueA = ((Number(a.jumlah_dok) / 10) * 100).toFixed(2);
                const valueB = ((Number(b.jumlah_dok) / 10) * 100).toFixed(2);
                return parseFloat(valueA) - parseFloat(valueB);
            },
            render: (_: any, record: any) =>
                `${((Number(record.jumlah_dok) / 10) * 100).toFixed(2)} %`,
        },
    ];
    const columnsKabkot = [
        // {
        //     title: "No",
        //     dataIndex: "id",
        //     key: "id",
        //     render: (_: any, rec: any, index: number) => index + 1,
        // },
        {
            title: "Kabupaten",
            dataIndex: "kabupaten",
            key: "kabupaten",

            render: (_: any, record: any) =>
                `[${record.kode_prov}${record.kode_kabkot}] ${record.kabkot}`,
        },
        // {
        //     title: "Kecamatan",
        //     dataIndex: "kecamatan",
        //     key: "kecamatan",
        //     render: (_: any, record: any) =>
        //         `[${record.kode_kec}] ${record.kec}`,
        // },
        // {
        //     title: "Desa",
        //     dataIndex: "desa",
        //     key: "desa",
        //     render: (_: any, record: any) =>
        //         `[${record.kode_desa}] ${record.desa}`,
        // },
        // {
        //     title: "NKS",
        //     dataIndex: "nks",
        //     key: "nks",
        //     render: (_: any, record: any) => `${record.nks}`,
        //     sorter: nksSorter as CompareFn<object>,
        // },
        {
            title: "Jumlah Dokumen",
            dataIndex: "jumlah_dok",
            key: "jumlah_dok",
            sorter: jumlahSorter as CompareFn<object>,
        },
        {
            title: "Target Dokumen",
            dataIndex: "target_nks",
            key: "target_nks",
            render: (_: any, record: any) => `${record.target_nks * 10}`,
            sorter: (a: { target_nks: any }, b: { target_nks: any }) => {
                const valueA = (Number(a.target_nks) * 10 * 100).toFixed(2);
                const valueB = (Number(b.target_nks) * 10 * 100).toFixed(2);
                return parseFloat(valueA) - parseFloat(valueB);
            },
        },

        {
            title: "%",
            dataIndex: "persentase",
            key: "persentase",
            sorter: (a: { jumlah_dok: any }, b: { jumlah_dok: any }) => {
                const valueA = ((Number(a.jumlah_dok) / 10) * 100).toFixed(2);
                const valueB = ((Number(b.jumlah_dok) / 10) * 100).toFixed(2);
                return parseFloat(valueA) - parseFloat(valueB);
            },
            render: (_: any, record: any) =>
                `${(
                    (Number(record.jumlah_dok) / record.target_nks / 10) *
                    100
                ).toFixed(2)} %`,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <Title level={2}>Progress pendataan menurut Kabupaten/Kota </Title>
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
                    onClick={() => handleExport(columnsKabkot, tableDataKabkot)}
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
                    marginBottom: "30px",
                }}
                direction="vertical"
            >
                <Table
                    columns={columnsKabkot}
                    // size="large"
                    // style={{ width: "100%", backgroundColor: "red" }}
                    dataSource={tableDataKabkot}
                    scroll={{ x: "100%" }}
                />
            </Space>
            <Title level={2}>Progress pendataan menurut NKS </Title>
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

Dashboard.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Dashboard</h2>}
        selectedKey="dashboard"
        children={page}
    ></AuthenticatedLayout>
);
export default Dashboard;
