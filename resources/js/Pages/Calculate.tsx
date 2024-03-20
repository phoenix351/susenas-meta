import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import { Button, Table, Space, Typography } from "antd";
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

    const calculateQc = async (id_rutas: string[]) => {
        try {
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
                console.log("Results:", results.flat());
                setCurrent(i);
                // break;
            }
        } catch (error) {
            console.log("Something went wrong", { error });
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
    const uniqueKabkot = new Set();

    return (
        <>
            <Head title="Periksa" />

            <Title level={2}>{current}</Title>
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
                    // onClick={() => handleExport(columns, tableData)}
                >
                    <ExportOutlined />
                    Export as CSV
                </Button>
                <Button
                    type="primary"
                    onClick={() => handleUpdateMonitoring()}
                    loading={updateLoading}
                >
                    {updateLoading ?? <SyncOutlined />}
                    Update Data Monitoring
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
        selectedKey="periksa"
        children={page}
    ></AuthenticatedLayout>
);
export default Periksa;
