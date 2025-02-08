import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { KomoditasSummary } from "@/types";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    ShopOutlined,
    ShoppingOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    message,
    Row,
    Select,
    Skeleton,
    Space,
    Statistic,
} from "antd";
import axios from "axios";
import React, {
    JSXElementConstructor,
    ReactElement,
    ReactPortal,
    useEffect,
    useState,
} from "react";
import KomoditasSummaryTable from "./KomoditasSummaryTable";
import CardSkeleton from "./CardSkeleton";
import Search from "antd/es/transfer/search";
import Title from "antd/es/typography/Title";
import { router } from "@inertiajs/react";

interface KabkotSummary {
    dok_clean: number;
    dok_error: number;
    dok_warning: number;
    garis_kemiskinan: number;
    jumlah_dok: number;
    kabkot: string;
    kode_kabkot: string;
    kode_prov: string;
    konsumsi_perkapita_basket_komoditas: number;
    konsumsi_perkapita_total: number;
    target_nks: number;
}

const index = () => {
    const [daftarKabkot, setDaftarKabkot] = useState([]);
    const [kabkotSummary, setKabkotSummary] = useState<KabkotSummary | null>(
        null
    );
    const [komoditasSummaries, setKomoditasSummaries] = useState<
        KomoditasSummary[]
    >([]);
    const [keyword, setKeyword] = useState<string>("");

    const [messageApi, contextHolder] = message.useMessage();
    const [loadingData, setLoadingData] = useState<boolean>(false);
    async function getKabkot() {
        try {
            const { data } = await axios.get(route("api.wilayah.kabkot"));
            // console.log({ data });

            setDaftarKabkot(
                data.data.map(
                    (kabkot: { kabkot: string; kode_kabkot: string }) => ({
                        label: `[${kabkot.kode_kabkot}] ${kabkot.kabkot}`,
                        value: kabkot.kode_kabkot,
                    })
                )
            );
        } catch (error) {
            console.error("error fetch kabkot", error);
        }
    }
    async function showSummary(kode_kabkot: string) {
        try {
            setLoadingData(true);
            messageApi.open({
                content: "memuat data...",
                type: "loading",
                key: "show-summary",
            });
            const response_rekap_kabkot = await axios.get(
                route("api.monitoring.rekap_kabkot", { kode_kabkot })
            );
            const response_rekap_komoditas = await axios.get(
                route("api.monitoring.rekap_komoditas", { kode_kabkot })
            );

            const data_rekap_kabkot = response_rekap_kabkot.data;
            const data_rekap_komoditas = response_rekap_komoditas.data;

            setKabkotSummary(data_rekap_kabkot);
            setKomoditasSummaries(data_rekap_komoditas);
            messageApi.open({
                content: "selesai memuat data.",
                type: "info",
                key: "show-summary",
            });
        } catch (error) {
            messageApi.open({
                content: "error memuat data.",
                type: "error",
                key: "show-summary",
            });
            console.error("error fetch kabkot", error);
        } finally {
            setLoadingData(false);
        }
    }

    useEffect(() => {
        getKabkot();
    }, []);
    function pollJobStatus(jobId: number) {
        let interval = setInterval(async () => {
            try {
                const { data } = await axios.get(
                    route("api.dashboard.queue-status", { jobId })
                );

                if (data.status === "completed") {
                    clearInterval(interval);
                    messageApi.open({
                        content: "sinkron data sudah selesai",
                        type: "success",
                        key: "sync",
                    });
                }
            } catch (error) {
                clearInterval(interval);
                messageApi.open({
                    content: "error ketika cek status...",
                    type: "error",
                    key: "sync",
                });
                console.log(error);
            } finally {
                router.get(
                    route("dashboard"),
                    {},
                    { preserveScroll: true, preserveState: true }
                );
            }
        }, 5000);
    }
    async function syncSummary() {
        try {
            setLoadingData(true);
            messageApi.open({
                content:
                    "sedang sinkron data, anda bisa lanjut eksplorasi data",
                type: "loading",
                key: "sync",
                duration: 0,
            });
            const { data } = await axios.get(route("dashboard.update"));
            if (data.job_id) {
                pollJobStatus(data.job_id);
            }

            setLoadingData(false);
        } catch (error) {
            messageApi.open({
                content: "error ketika sinkron data...",
                type: "error",
                key: "sync",
            });
        }
    }
    return (
        <div>
            {contextHolder}
            <Space
                direction="horizontal"
                align="center"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <Title>Dashboard</Title>
                <Button icon={<SyncOutlined />} onClick={syncSummary}>
                    Sync Data
                </Button>
            </Space>
            <Form>
                <Form.Item>
                    <Select
                        options={[
                            ...daftarKabkot,
                            {
                                label: "[00] PROVINSI SULAWESI UTARA",
                                value: "00",
                            },
                        ]}
                        showSearch
                        showArrow
                        optionFilterProp="label"
                        placeholder="Pilih Kabupaten/Kota"
                        onChange={(value: string) => showSummary(value)}
                    />
                </Form.Item>
            </Form>
            <Divider />
            <Row gutter={16}>
                <Col span={8}>
                    <Card bordered={false}>
                        {loadingData ? (
                            <CardSkeleton />
                        ) : (
                            <Statistic
                                title="Konsumsi Perkapita Perhari (Total)"
                                value={
                                    kabkotSummary?.konsumsi_perkapita_total
                                        ? (
                                              kabkotSummary.konsumsi_perkapita_total /
                                              30
                                          ).toLocaleString("id-ID")
                                        : //   .replace(/\./g, "#") // Temporarily replace '.' with '#'
                                          //   .replace(/,/g, ".") // Replace ',' with '.'
                                          //   .replace(/#/g, ",")
                                          "-"
                                }
                                precision={3}
                                valueStyle={{ color: "#000" }}
                                prefix={<ShoppingOutlined />}
                                suffix="kalori"
                            />
                        )}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        {loadingData ? (
                            <CardSkeleton />
                        ) : (
                            <Statistic
                                title="Konsumsi Perkapita Perhari (Basket Komoditas)"
                                value={
                                    kabkotSummary?.konsumsi_perkapita_basket_komoditas
                                        ? (
                                              kabkotSummary.konsumsi_perkapita_basket_komoditas /
                                              30
                                          ).toLocaleString("id-ID")
                                        : //   .replace(/\./g, "#") // Temporarily replace '.' with '#'
                                          //   .replace(/,/g, ".") // Replace ',' with '.'
                                          //   .replace(/#/g, ",")
                                          "-"
                                }
                                precision={3}
                                valueStyle={{ color: "#3f8600" }}
                                prefix={<ShopOutlined />}
                                suffix="kalori"
                            />
                        )}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        {loadingData ? (
                            <CardSkeleton />
                        ) : (
                            <Statistic
                                title="Garis Kemisikinan Sementara"
                                value={
                                    kabkotSummary?.garis_kemiskinan
                                        ? kabkotSummary.garis_kemiskinan.toLocaleString(
                                              "id-ID"
                                          )
                                        : //   .replace(/\./g, "#") // Temporarily replace '.' with '#'
                                          //   .replace(/,/g, ".") // Replace ',' with '.'
                                          //   .replace(/#/g, ",")
                                          "-"
                                }
                                precision={3}
                                valueStyle={{ color: "#3f8600" }}
                                prefix={"Rp "}
                                suffix=""
                            />
                        )}
                    </Card>
                </Col>
            </Row>
            <Space
                direction="vertical"
                style={{ display: "block", marginTop: 20 }}
            >
                <Search
                    placeholder="Cari berdasarkan nama atau kelompok komoditas"
                    onChange={(event: any) => {
                        const newKeyword = event.target.value;
                        setKeyword(newKeyword);
                    }}
                />
            </Space>
            <KomoditasSummaryTable
                dataSource={komoditasSummaries.filter((data) => {
                    let nama_kelompok = data.nama_kelompok.toLowerCase();
                    let nama_komoditas = data.nama_komoditas.toLowerCase();
                    const kelompok_komoditas = `${nama_kelompok} ${nama_komoditas}`;
                    const komoditas_kelompok = `${nama_komoditas} ${nama_kelompok}`;
                    return (
                        komoditas_kelompok.includes(keyword) ||
                        kelompok_komoditas.includes(keyword)
                    );
                })}
                loadingData={loadingData}
            />
        </div>
    );
};

index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">index</h2>}
        selectedKey="dashboard"
        children={page}
    ></AuthenticatedLayout>
);
export default index;
