import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps, ProgressData, User } from "@/types";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";
import { Button, Table, Space, Typography, Tabs } from "antd";
// import { Table } from "ant-table-extensions";
import { ExportOutlined } from "@ant-design/icons";
import { CompareFn } from "antd/es/table/interface";
import { createNumberSorter, createSorter } from "@/Functions/ColumnSorter";
import axios from "axios";
import ProgressChart from "./ProgressChart";

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

const Index = () => {
    const [tableDataNks, setTableDataNks] = useState<any[]>([]);
    const [tableDataKabkot, setTableDataKabkot] = useState<any[]>([]);
    const [tableDataUser, setTableDataUser] = useState<any[]>([]);
    const [progressdata, setProgressData] = useState<ProgressData[]>([]);
    const [dataLoading, setdataLoading] = useState(false);

    useEffect(() => {
        // console.log({ rekap_kabkot });
        const fetchData = async () => {
            setdataLoading(true);
            try {
                const response_kabkot = await axios.get(
                    route("api.monitoring.rekap_kabkot")
                );
                setTableDataKabkot(response_kabkot.data.rekap_kabkot ?? []);
                const progress = response_kabkot.data.rekap_kabkot.map(
                    (kabkot: any) => ({
                        name: `${kabkot.kode_kabkot}. ${kabkot.kabkot}`,
                        target: kabkot.jumlah_dok,

                        error: kabkot.dok_error,
                        warning: kabkot.dok_warning,
                        clean: kabkot.dok_clean,
                    })
                );
                console.log({ progress });

                setProgressData(progress);
                const response_nks = await axios.get(
                    route("api.monitoring.rekap_nks")
                );
                setTableDataNks(response_nks.data.rekap_nks ?? []);
                const response_user = await axios.get(
                    route("api.monitoring.rekap_user")
                );
                setTableDataUser(response_user.data.rekap_user ?? []);

                console.log({ response_kabkot, response_user, response_nks });
            } catch (error) {
                console.log("something went wrong: ", { error });
            } finally {
                setdataLoading(false);
            }
        };
        fetchData();
        // setTableData(data);
        // setTableDataKabkot(rekap_kabkot);
        // setTableDataUser(users);
    }, []);
    const jumlahSorter = createNumberSorter("jumlah_dok");
    const jumlahDokumenSorter = createNumberSorter("jumlah_dokumen");
    const cleanSorter = createNumberSorter("dok_clean");
    const warningSorter = createNumberSorter("dok_warning");
    const errorSorter = createNumberSorter("dok_error");
    const nksSorter = createNumberSorter("nks");
    const columns = [
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

        {
            title: "NKS",
            dataIndex: "nks",
            key: "nks",
            render: (_: any, record: any) => `${record.nks}`,
            sorter: nksSorter as CompareFn<object>,
        },
        {
            title: "Target Dokumen",
            dataIndex: "target_dok",
            key: "target_dok",
            render: () => 10,
        },
        {
            title: "Jumlah Dokumen Dientri",
            dataIndex: "jumlah_dok",
            key: "jumlah_dok",
            sorter: jumlahSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Clean",
            dataIndex: "dok_clean",
            key: "dok_clean",
            sorter: cleanSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Warning",
            dataIndex: "dok_warning",
            key: "dok_warning",
            sorter: warningSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Error",
            dataIndex: "dok_error",
            key: "dok_error",
            sorter: errorSorter as CompareFn<object>,
        },

        {
            title: "% clean",
            dataIndex: "persentase",
            key: "persentase",
            sorter: (a: { dok_clean: any }, b: { dok_clean: any }) => {
                const valueA = ((Number(a.dok_clean) / 10) * 100).toFixed(2);
                const valueB = ((Number(b.dok_clean) / 10) * 100).toFixed(2);
                return parseFloat(valueA) - parseFloat(valueB);
            },
            render: (_: any, record: any) =>
                `${((Number(record.dok_clean) / 10) * 100).toFixed(2)} %`,
        },
    ];
    const columnsKabkot = [
        {
            title: "Kabupaten",
            dataIndex: "kabupaten",
            key: "kabupaten",

            render: (_: any, record: any) =>
                `[${record.kode_prov}${record.kode_kabkot}] ${record.kabkot}`,
        },
        {
            title: "Target Dokumen",
            dataIndex: "target_dok",
            key: "target_dok",
            render: (_: any, record: any) => record.target_nks * 10,
        },
        {
            title: "Jumlah Dokumen Dientri",
            dataIndex: "jumlah_dok",
            key: "jumlah_dok",
            sorter: jumlahSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Clean",
            dataIndex: "dok_clean",
            key: "dok_clean",
            sorter: cleanSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Warning",
            dataIndex: "dok_warning",
            key: "dok_warning",
            sorter: warningSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Error",
            dataIndex: "dok_error",
            key: "dok_error",
            sorter: errorSorter as CompareFn<object>,
        },

        {
            title: "%clean",
            dataIndex: "persentase",
            key: "persentase",
            sorter: (
                a: { dok_clean: any; target_nks: any },
                b: { dok_clean: any; target_nks: any }
            ) => {
                const valueA = (
                    (Number(a.dok_clean) / a.target_nks) *
                    100
                ).toFixed(2);
                const valueB = (
                    (Number(b.dok_clean) / b.target_nks) *
                    100
                ).toFixed(2);
                return parseFloat(valueA) - parseFloat(valueB);
            },
            render: (_: any, record: any) =>
                `${(
                    (Number(record.dok_clean) / record.target_nks / 10) *
                    100
                ).toFixed(2)} %`,
        },
    ];
    const columnUsers = [
        // {
        //     title: "No",
        //     dataIndex: "id",
        //     key: "id",
        //     render: (_: any, rec: any, index: number) => index + 1,
        // },
        {
            title: "Kabupaten",
            dataIndex: "kode_kabkot",
            key: "kabupaten",

            render: (_: any, record: any) =>
                `[${"71"}${record.kode_kabkot}] ${record.kabkot}`,
            filters: tableDataKabkot.map((record) => ({
                text: `[${record.kode_prov}${record.kode_kabkot}] ${record.kabkot}`,
                value: record.kode_kabkot,
            })),
            onFilter: (value: any, record: any) => record.kode_kabkot === value,
        },
        {
            title: "Nama Lengkap",
            dataIndex: "nama_lengkap",
            key: "nama_lengkap",
            // render: (_: any, record: any) => _.toUpperCase(),
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },

        {
            title: "Jumlah Dokumen Dientri",
            dataIndex: "jumlah_dokumen",
            key: "jumlah_dokumen",
            sorter: jumlahDokumenSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Clean",
            dataIndex: "dok_clean",
            key: "dok_clean",
            sorter: cleanSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Warning",
            dataIndex: "dok_warning",
            key: "dok_warning",
            sorter: warningSorter as CompareFn<object>,
        },
        {
            title: "Dokumen Error",
            dataIndex: "dok_error",
            key: "dok_error",
            sorter: errorSorter as CompareFn<object>,
        },
    ];
    const items = [
        {
            label: "Progress per Kabupaten/Kota",
            key: "1",
            children: (
                <>
                    <Title level={2}>
                        Progress pendataan menurut Kabupaten/Kota{" "}
                    </Title>
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
                            onClick={() =>
                                handleExport(columnsKabkot, tableDataKabkot)
                            }
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
                            pagination={{
                                pageSize: 20,
                                hideOnSinglePage: true,
                            }}
                            loading={{
                                spinning: dataLoading,
                                tip: "memuat data...",
                            }}
                            // style={{ width: "100%", backgroundColor: "red" }}
                            dataSource={tableDataKabkot}
                            scroll={{ x: "100%" }}
                        />
                    </Space>
                </>
            ),
        },
        {
            label: "Progress per NKS",
            key: "2",
            children: (
                <>
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
                            onClick={() => handleExport(columns, tableDataNks)}
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
                        {/* <Table
                            columns={columns}
                            loading={{
                                spinning: dataLoading,
                                tip: "memuat data...",
                            }}
                            dataSource={tableDataNks}
                            scroll={{ x: "100%" }}
                        /> */}
                        <ProgressChart data={progressdata} key={"2-1"} />
                    </Space>
                </>
            ),
        },
        {
            label: "Progress per PML",
            key: "3",
            children: (
                <>
                    <Title level={2}>Progress pendataan menurut PML </Title>
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
                            onClick={() =>
                                handleExport(columnUsers, tableDataUser)
                            }
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
                            columns={columnUsers}
                            loading={{
                                spinning: dataLoading,
                                tip: "memuat data...",
                            }}
                            dataSource={tableDataUser}
                            scroll={{ x: "100%" }}
                        />
                    </Space>
                </>
            ),
        },
    ];

    return (
        <>
            <Head title="Index" />
            <Tabs
                style={{ backgroundColor: "#fff", padding: "10px" }}
                items={items}
            />
        </>
    );
};

Index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Index</h2>}
        selectedKey="progress"
        children={page}
    ></AuthenticatedLayout>
);
export default Index;
