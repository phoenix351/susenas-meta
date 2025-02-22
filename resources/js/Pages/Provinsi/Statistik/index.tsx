import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { KomoditasSummary } from "@/types";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    LineChartOutlined,
    OrderedListOutlined,
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
import KomoditasSummaryTable from "./SummaryTable";
import CardSkeleton from "./CardSkeleton";
import Search from "antd/es/transfer/search";
import Title from "antd/es/typography/Title";
import { router } from "@inertiajs/react";
import LorenzCurve from "./LorenzCurve";

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
    const [pengeluaranPerkapita, setPengeluaranPerkapita] = useState([]);
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
            const response = await axios.get(route("api.provinsi.statistik.fetch",{kode_kabkot}));
            

            
            
            setPengeluaranPerkapita(response.data.pengeluaran_perkapita);
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

            setLoadingData(false);
            messageApi.open({
                content: "Update dashboard selesai",
                type: "success",
                key: "sync",
                duration: 2,
            });
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
                <Title>Statistik</Title>
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

            <Space
                direction="horizontal"
                style={{  marginTop: 20, justifyContent:"end",display:"flex" }}
            >
                <Button>
                    <LineChartOutlined />
                </Button>
                <Button>
                    <OrderedListOutlined />
                </Button>
            </Space>
            
                <LorenzCurve pengeluaranPerkapita={pengeluaranPerkapita}/>
            
        </div>
    );
};

index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">index</h2>}
        selectedKey="statistik"
        children={page}
    ></AuthenticatedLayout>
);
export default index;
