import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import { Button, Table, Space, Typography, message, Progress } from "antd";
// import { Table } from "ant-table-extensions";
import { ExportOutlined, SyncOutlined } from "@ant-design/icons";
import { CompareFn } from "antd/es/table/interface";
import TextRupiah from "@/Components/TextRupiah";
import { createNumberSorter } from "@/Functions/ColumnSorter";
import axios from "axios";
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
    const [current, setCurrent] = useState(0);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const calculateQc = async (id_rutas: string[]) => {
        try {
            messageApi.open({
                content: `sedang menghitung blok QC ruta 0 dari ${data.length}`,
                duration: 0,
                type: "loading",
                key: "calculate-qc",
            });
            id_rutas = id_rutas.filter((id_ruta) => id_ruta.length > 10);

            // Define the batch size and concurrency limit
            const batchSize = 5;
            const concurrencyLimit = 5;

            // Helper function to process a batch of requests
            const processBatch = async (batch: string[]) => {
                const batchRequests = batch.map(async (id_ruta) => {
                    const url = route("api.mak.calculate_qc", {
                        id_ruta: id_ruta,
                    });
                    // const response = await axios.get(url);
                    // return response.data;
                    try {
                        const response = await axios.get(url);
                        return response.data;
                    } catch (error) {
                        console.error(
                            `Error processing id_ruta ${id_ruta}:`,
                            error
                        );
                        return null; // Return null or some other value to mark the error
                    }
                });
                return await Promise.all(batchRequests);
            };

            // Process requests in batches with concurrency control
            for (let i = 0; i < id_rutas.length; i += batchSize) {
                const batch = id_rutas.slice(i, i + batchSize);
                const results = await Promise.all(
                    Array.from({ length: concurrencyLimit }, (_, index) => {
                        const startIdx = index * (batchSize / concurrencyLimit);
                        const endIdx =
                            (index + 1) * (batchSize / concurrencyLimit);
                        return processBatch(batch.slice(startIdx, endIdx));
                    })
                );

                // Handle results if needed
                setCurrent(i);
                messageApi.open({
                    content: `sedang menghitung blok QC ruta ${i} dari ${data.length} (${
                        Math.round(((i * 100) / data.length) * 100) / 100
                    } %)`,
                    duration: 0,
                    type: "loading",
                    icon: "",
                    key: "calculate-qc",
                });
                // break;
            }
        } catch (error) {
            console.log("Something went wrong", { error });
            messageApi.open({
                content: `terjadi kesalahan pada ruta ${data.length} dari ${data.length}`,
                duration: 1,
                type: "error",
                key: "calculate-qc",
            });
        } finally {
            setUpdateLoading(false);
            messageApi.open({
                content: `selesai menghitung blok QC ruta ${data.length} dari ${data.length}`,
                duration: 1,
                type: "success",
                key: "calculate-qc",
            });
        }
    };
    const revalidasi = async (id_rutas: string[]) => {
        try {
            messageApi.open({
                content: `sedang revalidasi ruta 0 dari ${data.length}`,
                duration: 0,
                type: "loading",
                key: "calculate-qc",
            });
            id_rutas = id_rutas.filter((id_ruta) => id_ruta.length > 10);

            // Define the batch size and concurrency limit
            const batchSize = 5;
            const concurrencyLimit = 5;

            // Helper function to process a batch of requests
            const processBatch = async (batch: string[]) => {
                const batchRequests = batch.map(async (id_ruta) => {
                    const url = route("api.mak.revalidasi", {
                        id_ruta: id_ruta,
                    });
                    // const response = await axios.get(url);
                    // return response.data;
                    try {
                        const response = await axios.get(url);
                        return response.data;
                    } catch (error) {
                        console.error(
                            `Error processing id_ruta ${id_ruta}:`,
                            error
                        );
                        return null; // Return null or some other value to mark the error
                    }
                });
                return await Promise.all(batchRequests);
            };

            // Process requests in batches with concurrency control
            for (let i = 0; i < id_rutas.length; i += batchSize) {
                const batch = id_rutas.slice(i, i + batchSize);
                const results = await Promise.all(
                    Array.from({ length: concurrencyLimit }, (_, index) => {
                        const startIdx = index * (batchSize / concurrencyLimit);
                        const endIdx =
                            (index + 1) * (batchSize / concurrencyLimit);
                        return processBatch(batch.slice(startIdx, endIdx));
                    })
                );

                // Handle results if needed
                setCurrent(i);
                messageApi.open({
                    content: `sedang revalidasi ruta ${i} dari ${data.length} (${
                        Math.round(((i * 100) / data.length) * 100) / 100
                    } %)`,

                    duration: 0,
                    type: "loading",
                    icon: "",
                    key: "calculate-qc",
                });
                // break;
            }
        } catch (error) {
            console.log("Something went wrong", { error });
            messageApi.open({
                content: `terjadi kesalahan pada ruta ${data.length} dari ${data.length}`,
                duration: 1,
                type: "error",
                key: "calculate-qc",
            });
        } finally {
            setUpdateLoading(false);
            messageApi.open({
                content: `selesai menghitung blok QC ruta ${data.length} dari ${data.length}`,
                duration: 1,
                type: "success",
                key: "calculate-qc",
            });
        }
    };
    const handleUpdateMonitoring = async () => {
        try {
            setUpdateLoading(true);
            const response = await axios.post(route("monitoring.update"));

            // const response = await axios.post(route('monitoring.update'));
        } catch (error) {
            console.log("Something went wrong", { error });
        } finally {
            setUpdateLoading(false);
        }
    };
    useEffect(() => {
        // console.log({ data });
        // Assuming data is an array of id_rutas
        // calculateQc(data);
    }, []);

    return (
        <>
            {contextHolder}
            <Head title="Periksa" />

            {/* <Title level={2}>{current}</Title> */}
            <Space
                style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    width: "100%",
                    justifyContent: "end",
                }}
                direction="vertical"
            >
                {/* <Button
                    type="primary"
                    // onClick={() => handleExport(columns, tableData)}
                >
                    <ExportOutlined />
                    Ekspor semua ruta
                </Button> */}
                <Button
                    type="primary"
                    onClick={() => calculateQc(data)}
                    loading={updateLoading}
                >
                    {updateLoading ?? <SyncOutlined />}
                    Kalkulasi Quality Controll
                </Button>

                <Button
                    type="primary"
                    onClick={() => revalidasi(data)}
                    loading={updateLoading}
                >
                    {updateLoading ?? <SyncOutlined />}
                    Revalidasi
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
            ></Space>
        </>
    );
};

Periksa.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Periksa</h2>}
        selectedKey="calculate"
        children={page}
    ></AuthenticatedLayout>
);
export default Periksa;
