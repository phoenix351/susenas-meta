import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import {
    Button,
    Table,
    Space,
    Typography,
    message,
    Progress,
    Form,
    Checkbox,
    Select,
} from "antd";
// import { Table } from "ant-table-extensions";
import { ExportOutlined, SyncOutlined } from "@ant-design/icons";
import { CompareFn } from "antd/es/table/interface";
import TextRupiah from "@/Components/TextRupiah";
import { createNumberSorter } from "@/Functions/ColumnSorter";
import axios from "axios";
const { Title } = Typography;

const index = ({
    data,
}: PageProps & {
    data: any;
}) => {
    const [current, setCurrent] = useState(0);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [exportForm] = Form.useForm();
    const daftarTabel = [
        "users",
        "komoditas",
        "komoditas_non_makanan",
        "konsumsi",
        "konsumsi_art",
        "konsumsi_non_makanan",
        "range_harga_komoditas",
        "vsusenas_mak",
    ];

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

            // Helper function to process a batch of requests

            // Process requests in batches with concurrency control
            for (let i = 0; i < id_rutas.length; i += batchSize) {
                // Handle results if needed
                setCurrent(i);
                messageApi.open({
                    content: `sedang menghitung blok QC ruta ${i} dari ${
                        data.length
                    } (${Math.round(((i * 100) / data.length) * 100) / 100} %)`,
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

            // Helper function to process a batch of requests

            // Process requests in batches with concurrency control
            for (let i = 0; i < id_rutas.length; i += batchSize) {
                // Handle results if needed
                setCurrent(i);
                messageApi.open({
                    content: `sedang revalidasi ruta ${i} dari ${
                        data.length
                    } (${Math.round(((i * 100) / data.length) * 100) / 100} %)`,

                    duration: 0,
                    type: "loading",
                    icon: "",
                    key: "calculate-qc",
                });
                // break;
            }
        } catch (error) {
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
    async function handleExport(values: any) {
        let error_table = "";
        try {
            const table_names = [values.table_names];
            if (table_names.length > 0) {
                table_names.forEach(async (table_name: string) => {
                    error_table = table_name;
                    messageApi.open({
                        content: `sedang export data ${table_name} dari ${table_names.length}`,
                        duration: 0,
                        type: "loading",
                        key: "export",
                    });
                    // make request to stream current table_name
                    // Make request to stream current table_name
                    const downloadUrl = route("calculate.export", {
                        table_name,
                    });
                    const iframe = document.getElementById(
                        "csv-download"
                    ) as HTMLIFrameElement;
                    if (iframe) {
                        iframe.src = downloadUrl;
                    }
                });
            }
        } catch (error) {
            messageApi.open({
                content: `terjadi kesalahan ketika export tabel ${error_table}`,
                duration: 1,
                type: "error",
                key: "export",
            });
        } finally {
            setUpdateLoading(false);
            messageApi.open({
                content: `selesai export table ${values.table_names.length} dari ${values.table_names.length}`,
                duration: 1,
                type: "success",
                key: "export",
            });
        }
    }
    useEffect(() => {
        // console.log({ data });
        // Assuming data is an array of id_rutas
        // calculateQc(data);
    }, []);

    return (
        <>
            {contextHolder}
            <Head title="Periksa" />
            <iframe id="csv-download" style={{ display: "none" }}></iframe>

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
            >
                <h1>Export Tabel</h1>
                <Form onFinish={handleExport} form={exportForm}>
                    <Form.Item name={"table_names"}>
                        <Select
                            // mode="tags"
                            style={{ width: "100%" }}
                            // tokenSeparators={[","]}
                            options={daftarTabel.map((tabel) => ({
                                label: tabel,
                                value: tabel,
                            }))}
                        />
                    </Form.Item>
                    <Space>
                        <Button
                            type="dashed"
                            onClick={() => {
                                exportForm.setFieldValue("table_names", []);
                            }}
                        >
                            clear
                        </Button>
                        <Button
                            type="default"
                            onClick={() => {
                                exportForm.setFieldValue(
                                    "table_names",
                                    daftarTabel
                                );
                            }}
                        >
                            select all
                        </Button>
                        <Button type="primary" htmlType="submit">
                            export
                        </Button>
                    </Space>
                </Form>
            </Space>
        </>
    );
};

index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Periksa</h2>}
        selectedKey="calculate"
        children={page}
    ></AuthenticatedLayout>
);
export default index;
