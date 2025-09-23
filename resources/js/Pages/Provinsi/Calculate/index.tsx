import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import { Button, Space, message, Form, Select } from "antd";
// import { Table } from "ant-table-extensions";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";

const API_BASE = "https://susenas-meta.monitoringbps.com";

// Build endpoints here. Update `calculate` to your real route.
const ENDPOINTS = {
    revalidasi: (id: string) => `${API_BASE}/mak/revalidasi/${id}`,
    calculate: (id: string) => `${API_BASE}/mak/qc/${id}`, // TODO: change if different
};

async function runWithConcurrency<T>(
    items: T[],
    limit: number,
    worker: (item: T, idx: number) => Promise<any>
) {
    const results: PromiseSettledResult<any>[] = [];
    let i = 0;

    async function next(): Promise<void> {
        if (i >= items.length) return;
        const idx = i++;
        try {
            const res = await worker(items[idx], idx);
            results[idx] = {
                status: "fulfilled",
                value: res,
            } as PromiseFulfilledResult<any>;
        } catch (e) {
            results[idx] = {
                status: "rejected",
                reason: e,
            } as PromiseRejectedResult;
        }
        return next();
    }

    const runners = Array.from({ length: Math.min(limit, items.length) }, () =>
        next()
    );
    await Promise.all(runners);
    return results;
}

function pct(done: number, total: number) {
    if (total === 0) return 100;
    return Math.round((done / total) * 10000) / 100; // 2 decimals
}

function normalizeIds(id_rutas: string[]) {
    // keep only plausible UUIDs (your original length>10)
    return (id_rutas || []).filter(
        (s) => typeof s === "string" && s.length > 10
    );
}

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
        const ids = normalizeIds(id_rutas);
        const total = ids.length;
        if (total === 0) {
            messageApi.open({
                content: "Tidak ada ID ruta yang valid untuk dihitung.",
                type: "warning",
            });
            return;
        }

        setUpdateLoading(true);
        let done = 0,
            ok = 0,
            fail = 0;

        messageApi.open({
            content: `Mulai kalkulasi QC: 0/${total} (0%)`,
            duration: 0,
            type: "loading",
            key: "calculate-qc",
        });

        try {
            const CONCURRENCY = 5;

            await runWithConcurrency(ids, CONCURRENCY, async (id) => {
                const url = ENDPOINTS.calculate(id);
                const resp = await axios.get(url); // adjust to POST if your API expects it
                ok++;
                done++;
                setCurrent(done);
                messageApi.open({
                    content: `Kalkulasi QC ${done}/${total} (${pct(
                        done,
                        total
                    )}%) — sukses:${ok} gagal:${fail}`,
                    duration: 0,
                    type: "loading",
                    key: "calculate-qc",
                });
                return resp;
            });

            messageApi.open({
                content: `Selesai kalkulasi QC: ${ok}/${total} sukses, ${fail} gagal`,
                duration: 2,
                type: "success",
                key: "calculate-qc",
            });
        } catch (e) {
            // We also count failures in the worker above; this is a last-resort catch.
            messageApi.open({
                content: `Kalkulasi QC gagal: ${ok}/${total} sukses, ${fail} gagal`,
                duration: 2,
                type: "error",
                key: "calculate-qc",
            });
        } finally {
            setUpdateLoading(false);
        }
    };

    const revalidasi = async (id_rutas: string[]) => {
        const ids = normalizeIds(id_rutas);
        const total = ids.length;
        if (total === 0) {
            messageApi.open({
                content: "Tidak ada ID ruta yang valid untuk direvalidasi.",
                type: "warning",
            });
            return;
        }

        setUpdateLoading(true);
        let done = 0,
            ok = 0,
            fail = 0;

        messageApi.open({
            content: `Mulai revalidasi: 0/${total} (0%)`,
            duration: 0,
            type: "loading",
            key: "revalidasi",
        });

        try {
            const CONCURRENCY = 5;

            await runWithConcurrency(ids, CONCURRENCY, async (id) => {
                const url = ENDPOINTS.revalidasi(id);
                try {
                    const resp = await axios.get(url); // adjust to POST if needed
                    ok++;
                    return resp;
                } catch (err) {
                    fail++;
                    throw err;
                } finally {
                    done++;
                    setCurrent(done);
                    messageApi.open({
                        content: `Revalidasi ${done}/${total} (${pct(
                            done,
                            total
                        )}%) — sukses:${ok} gagal:${fail}`,
                        duration: 0,
                        type: "loading",
                        key: "revalidasi",
                    });
                }
            });

            messageApi.open({
                content: `Selesai revalidasi: ${ok}/${total} sukses, ${fail} gagal`,
                duration: 2,
                type: "success",
                key: "revalidasi",
            });
        } catch (e) {
            messageApi.open({
                content: `Revalidasi selesai dengan error: ${ok}/${total} sukses, ${fail} gagal`,
                duration: 2,
                type: "error",
                key: "revalidasi",
            });
        } finally {
            setUpdateLoading(false);
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
