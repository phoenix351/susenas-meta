// src/pages/entri/mak/EditMak.tsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    ReactElement,
    JSXElementConstructor,
    ReactPortal,
    useEffect,
    useState,
} from "react";
import { Head, router } from "@inertiajs/react";
import {
    Badge,
    Button,
    Form,
    Space,
    Spin,
    Table,
    Tabs,
    Typography,
    message,
} from "antd";
import {
    ArrowLeftOutlined,
    DollarOutlined,
    ReloadOutlined,
    SaveOutlined,
} from "@ant-design/icons";

import Blok1_2 from "@/Forms/Mak/Blok1_2";
import Blok4_1 from "@/Forms/Mak/Blok4_1";
import Blok4_1art from "@/Forms/Mak/Blok4_1_art";
import Blok4_3 from "@/Forms/Mak/Blok4_3";
import Worksheet from "@/Forms/Mak/Worksheet";
import BlokNonMakanan from "@/Forms/NonMakanan/NonMakanan";

import { defaultSubTotal, daftarRincian432 } from "@/Features/mak/constants";
import { tabContentStyle } from "@/Features/mak/styles";
import { rangeHargaColumns, errorColumns } from "@/Features/mak/tables";
import {
    useCtrlSSubmit,
    useSubTotalCalculator,
    useSimpanAll,
    doRevalidasi,
} from "@/Features/mak/hooks";

import MyModal from "@/Components/Modal";
import TextRupiah from "@/Components/TextRupiah";
import ScrollToTopButton from "@/Components/SmoothScrollToTop";
import { useEnterAsTab } from "@/Hooks/useEnterAsTab";

// types coming from your project
import type { AnggotaRumahTangga, PageProps, Rincian } from "@/types";
import Blok_QC from "@/Forms/Mak/Blok_QC";
import axios from "axios";

const { Text } = Typography;

const Mak = ({
    data,
    konsumsi_ruta,
    art,
    garis_kemiskinan,
    rekap_konsumsi,
    rekap_konsumsi_art,
}: PageProps & {
    data: any;
    konsumsi_ruta: any[];
    art: any[];
    garis_kemiskinan: number;
    rekap_konsumsi: any[];
    rekap_konsumsi_art: any[];
}) => {
    const [form] = Form.useForm();
    const [blok41Form] = Form.useForm();
    const [blok41ArtForm] = Form.useForm();
    const [artForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [daftarArt, setDaftarArt] = useState<AnggotaRumahTangga[]>([]);
    const [rekapMak, setRekapMak] = useState(defaultSubTotal());
    const [rekapArt, setRekapArt] = useState<any[]>([]);
    const [daftarQc, setDaftarQc] = useState<Rincian[]>([
        {
            rincian: "Kalori per Kapita per Hari",
            id: 0,
            value: 0,
            dataType: "decimal",
        },
        {
            rincian: "Kalori 52 basket komoditas per Kapita per Hari",
            id: 6,
            value: 0,
            dataType: "decimal",
        },
        {
            rincian: "Jumlah Komoditas Bahan Makanan/Minuman",
            id: 1,
            value: 0,
            dataType: "integer",
        },
        {
            rincian: "Jumlah Komoditas Makanan/Minuman Jadi dan Rokok",
            id: 2,
            value: 0,
            dataType: "integer",
        },
        {
            rincian: "Jumlah Komoditas Non Makanan [KP Blok III R.305]",
            id: 3,
            value: 0,
            dataType: "integer",
            editable: true,
        },
        {
            rincian: "Jumlah Semua Komoditas",
            id: 4,
            value: 0,
            dataType: "integer",
        },
        {
            rincian: "Pengeluaran per kapita",
            id: 5,
            value: 0,
            dataType: "rupiah",
        },
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [loadingReval, setLoadingReval] = useState(false);
    const [warningList, setWarningList] = useState<any[]>([]);
    const [warningRHList, setWarningRHList] = useState<any[]>([]);
    const [errorList, setErrorList] = useState<any[]>([]);
    const [statusCacah, setStatusCacah] = useState(true);

    const { containerRef } = useEnterAsTab<HTMLDivElement>({
        allowTextareaNewline: true,
        shiftMovesBackward: true,
    });
    useCtrlSSubmit(form);

    const calculateSubTotalHarga = useSubTotalCalculator(
        blok41Form,
        setRekapMak
    );
    const simpanData = useSimpanAll({
        form,
        artForm,
        blok41Form,
        daftarArt,
        daftarQc,
        setDaftarQc,
        setLastSaved,
        messageApi,
    });

    function ubahStatusPencacahan(v: string) {
        setStatusCacah(v === "1");
    }
    const blok1_2Finish = async (values: any) => {
        try {
            const url = route("entri.mak.update");
            const response = await axios.patch(url, values, {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error: any) {
            if (error.response.status === 403) {
                message.error({
                    content: "Akun anda tidak boleh mengubah isian ini",
                    key: "403-forbidden",
                    duration: 2000,
                });
            }
        }
    };

    useEffect(() => {
        // initial data wiring, keep concise:
        form.setFieldsValue({ ...data, wtf_26: garis_kemiskinan });
        blok41Form.setFieldsValue({
            id_ruta: data.id,
            hal10_jml_komoditas: data.hal10_jml_komoditas ?? undefined,
            hal8_jml_komoditas: data.hal8_jml_komoditas ?? undefined,
            hal6_jml_komoditas: data.hal6_jml_komoditas ?? undefined,
            hal4_jml_komoditas: data.hal4_jml_komoditas ?? undefined,
            hal2_jml_komoditas: data.hal2_jml_komoditas ?? undefined,
            ...konsumsi_ruta.reduce((acc, it) => {
                acc[
                    `${it.type === "sub" ? "jumlah" : ""}${
                        it.id_komoditas
                    }_beli_harga${it.id_kelompok}`
                ] = it.harga_beli;
                acc[
                    `${it.type === "sub" ? "jumlah" : ""}${
                        it.id_komoditas
                    }_produksi_harga${it.id_kelompok}`
                ] = it.harga_produksi;
                acc[`${it.id_komoditas}_total_harga`] = it.harga_total;
                acc[`${it.id_komoditas}_total_harga_calculated`] =
                    it.harga_produksi + it.harga_beli;
                acc[`${it.id_komoditas}_item`] = it.item;
                acc[`${it.id_komoditas}_satuan`] = it.satuan;
                acc[`${it.id_komoditas}_beli_volume`] = it.volume_beli;
                acc[`${it.id_komoditas}_produksi_volume`] = it.volume_produksi;
                acc[`${it.id_komoditas}_total_volume`] = it.volume_total;
                return acc;
            }, {} as Record<string, any>),
        });
        // console.log({ art });

        artForm.setFieldsValue({ id_ruta: data.id });

        setLastSaved(new Date(data.updated_at));
        ubahStatusPencacahan(data.r203);

        // ART list: ensure at least 1
        const arts = (
            art?.length
                ? art
                : [
                      {
                          id: "",
                          id_ruta: data.id,
                          nama: data.r110,
                          nomor_art: 0,
                          rekap: {
                              12: { produksi: 0, beli: 0, total: 0 },
                              13: { produksi: 0, beli: 0, total: 0 },
                          },
                      },
                  ]
        ).map((a: any) => ({
            ...a,
            rekap: a.rekap ?? {
                12: { produksi: 0, beli: 0, total: 0 },
                13: { produksi: 0, beli: 0, total: 0 },
            },
        }));

        // fill rekap per ART from server aggregate
        const agg = rekap_konsumsi_art.map((x: any) => ({
            id_art: x.id_art,
            id_kelompok: x.id_kelompok,
            beli: Number(x.beli),
            produksi: Number(x.produksi),
        }));
        const withAgg = arts.map((a: any) => {
            const r = { ...a.rekap };
            agg.filter((g: any) => g.id_art === a.id).forEach((g: any) => {
                r[g.id_kelompok] = {
                    beli: g.beli,
                    produksi: g.produksi,
                    total: g.beli + g.produksi,
                };
            });
            return { ...a, rekap: r };
        });
        setDaftarArt(withAgg);

        // route-level rekap

        setRekapMak((prev) => {
            const next = [...prev];
            rekap_konsumsi.forEach((it: any) => {
                next[it.id_kelompok].beli = Number(it.beli);
                next[it.id_kelompok].produksi = Number(it.produksi);
                next[it.id_kelompok].total =
                    Number(it.beli) + Number(it.produksi);
            });
            next[16].total = data.blok4_32_16_total;
            // recompute 15/18
            next[12] = withAgg.reduce(
                (acc: any, curr: any) => {
                    acc.beli += curr.rekap[12]?.beli || 0;
                    acc.produksi += curr.rekap[12]?.produksi || 0;
                    acc.total += curr.rekap[12]?.total || 0;
                    return acc;
                },
                { beli: 0, produksi: 0, total: 0 }
            );
            next[13] = withAgg.reduce(
                (acc: any, curr: any) => {
                    acc.beli += curr.rekap[13]?.beli || 0;
                    acc.produksi += curr.rekap[13]?.produksi || 0;
                    acc.total += curr.rekap[13]?.total || 0;
                    return acc;
                },
                { beli: 0, produksi: 0, total: 0 }
            );
            next[14] = next.slice(0, 14).reduce(
                (p, c) => ({
                    beli: p.beli + (c?.beli || 0),
                    produksi: p.produksi + (c?.produksi || 0),
                    total: p.total + (c?.total || 0),
                }),
                { beli: 0, produksi: 0, total: 0 }
            );
            // console.log({ next });

            next[15].total = Math.round((next[14].total * 30) / 7);
            next[17].total = next[15].total + next[16].total;
            return next;
        });
    }, []);

    return (
        <>
            {contextHolder}
            <Head title="Entri Kuesioner Inti" />
            <Space
                direction="vertical"
                ref={containerRef}
                style={{ width: "100%", minHeight: 300, padding: "10px 15px" }}
            >
                <Space
                    style={{ width: "100%", justifyContent: "space-between" }}
                >
                    <Button
                        onClick={() =>
                            router.get(
                                route("entri", {
                                    kode_kabkot:
                                        form.getFieldValue("kode_kabkot"),
                                    nks: form.getFieldValue("nks"),
                                    semester: form.getFieldValue("semester"),
                                })
                            )
                        }
                    >
                        <ArrowLeftOutlined /> Kembali
                    </Button>

                    <Space style={{ justifyContent: "end", width: "100%" }}>
                        Last Saved:{" "}
                        {lastSaved?.toLocaleString("en-US", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                            hour12: false,
                        }) || "Never"}
                        <Button type="primary" onClick={simpanData}>
                            <SaveOutlined /> Simpan
                        </Button>
                        <Button
                            type="primary"
                            style={{ background: "#e64d00" }}
                            onClick={async () => {
                                setOpenModal(true);
                                setLoadingReval(true);
                                await doRevalidasi(
                                    form.getFieldValue("id"),
                                    setLoadingReval,
                                    ({ err, warn, warnRH }) => {
                                        setErrorList(err);
                                        setWarningList(warn);
                                        setWarningRHList(warnRH);
                                    },
                                    messageApi
                                );
                            }}
                        >
                            <DollarOutlined /> Evaluasi
                        </Button>
                    </Space>
                </Space>

                <Tabs
                    type="card"
                    items={[
                        {
                            label: "Blok I, II",
                            key: "1",
                            children: (
                                <Blok1_2
                                    ubahStatusCacah={ubahStatusPencacahan}
                                    tabContentStyle={tabContentStyle}
                                    form={form}
                                    onFinish={(v: any) =>
                                        import("@/Features/mak/api").then(
                                            ({ api }) => api.saveBlok1_2(v)
                                        )
                                    }
                                    setDaftarArt={setDaftarArt}
                                    editable={false}
                                    identitas_wilayah={{
                                        desa: data.desa,
                                        kode_desa: data.kode_desa,
                                        kec: data.kec,
                                        kode_kec: data.kode_kec,
                                        semester: data.semester,
                                    }}
                                />
                            ),
                        },
                        {
                            label: "Worksheet",
                            key: "2",
                            disabled: !statusCacah,
                            children: (
                                <Worksheet
                                    tabContentStyle={tabContentStyle}
                                    form={form}
                                    onFinish={(v: any) =>
                                        import("@/Features/mak/api").then(
                                            ({ api }) => api.saveBlok1_2(v)
                                        )
                                    }
                                />
                            ),
                        },
                        {
                            label: "Blok IV.1",
                            key: "3",
                            disabled: !statusCacah,
                            children: (
                                <Blok4_1
                                    onFinish={(v: any) =>
                                        import("@/Features/mak/api").then(
                                            ({ api }) => api.saveKonsumsi(v)
                                        )
                                    }
                                    form={blok41Form}
                                    tabContentStyle={tabContentStyle}
                                    calculate={calculateSubTotalHarga}
                                    subTotalHarga={rekapMak}
                                    rekapMak={rekapMak}
                                    setRekapMak={setRekapMak}
                                />
                            ),
                        },
                        {
                            label: "Blok IV.1 ART",
                            key: "4",
                            disabled: !statusCacah,
                            children: (
                                <Blok4_1art
                                    id_ruta={data.id}
                                    tabContentStyle={tabContentStyle}
                                    form={blok41ArtForm}
                                    artForm={artForm}
                                    onFinish={(v: any) =>
                                        import("@/Features/mak/api").then(
                                            ({ api }) => api.saveBlok41Art(v)
                                        )
                                    }
                                    artFormFinish={(v: any) =>
                                        import("@/Features/mak/api").then(
                                            ({ api }) => api.saveArt(v)
                                        )
                                    }
                                    rekapArt={rekapArt}
                                    setRekapArt={setRekapArt}
                                    daftarArt={daftarArt}
                                    setDaftarArt={setDaftarArt}
                                    calculateKalori={async (fields: any) => {
                                        const withVol = Object.entries(
                                            fields
                                        ).filter(
                                            ([k, v]) =>
                                                k.endsWith("volume") &&
                                                typeof v === "number" &&
                                                v > 0
                                        );
                                        const arr = await Promise.all(
                                            withVol.map(async ([k, v]) => {
                                                const id = k.split("_")[0];
                                                const qty = Number(v) || 0;
                                                const { api } = await import(
                                                    "@/Features/mak/api"
                                                );
                                                const { data } =
                                                    await api.kaloriKomoditas(
                                                        id
                                                    );
                                                return qty * data;
                                            })
                                        );
                                        return arr.reduce((s, n) => s + n, 0);
                                    }}
                                />
                            ),
                        },
                        {
                            label: "Non Makanan",
                            key: "7",
                            disabled: !statusCacah,
                            children: <BlokNonMakanan id_ruta={data.id} />,
                        },
                        {
                            label: "Blok IV.3",
                            key: "5",
                            disabled: !statusCacah,
                            children: (
                                <Blok4_3
                                    tabContentStyle={tabContentStyle}
                                    form={form}
                                    onFinish={(v: any) =>
                                        import("@/Features/mak/api").then(
                                            ({ api }) => api.saveBlok1_2(v)
                                        )
                                    }
                                    daftarArt={daftarArt}
                                    rekapMak={rekapMak}
                                    daftarRincian432={daftarRincian432}
                                    setRekapMak={setRekapMak}
                                />
                            ),
                        },
                        {
                            label: "Blok QC",
                            key: "6",
                            disabled: !statusCacah,
                            children: (
                                <Blok_QC
                                    tabContentStyle={tabContentStyle}
                                    form={form}
                                    onFinish={blok1_2Finish}
                                    daftarQc={daftarQc}
                                />
                            ),
                        },
                    ]}
                />
            </Space>

            <ScrollToTopButton />

            <MyModal
                cancelText="Tutup"
                okText=""
                handleCancel={() => setOpenModal(false)}
                confirmLoadingModal={false}
                openModal={openModal}
                handleOk={() => setOpenModal(false)}
                title="Daftar Evaluasi"
                key="range-harga-modal"
                width="1200px"
                noFooter
            >
                <Space
                    style={{
                        marginBottom: 20,
                        width: "100%",
                        justifyContent: "end",
                    }}
                >
                    <Button
                        type="primary"
                        onClick={() =>
                            doRevalidasi(
                                form.getFieldValue("id"),
                                setLoadingReval,
                                ({ err, warn, warnRH }) => {
                                    setErrorList(err);
                                    setWarningList(warn);
                                    setWarningRHList(warnRH);
                                },
                                messageApi
                            )
                        }
                    >
                        <ReloadOutlined /> Revalidasi
                    </Button>
                    <Text>Klik ini untuk melakukan revalidasi ulang</Text>
                </Space>

                {loadingReval ? (
                    <Space
                        style={{ width: "100%", justifyContent: "center" }}
                        direction="vertical"
                    >
                        <Space
                            style={{ width: "100%", justifyContent: "center" }}
                        >
                            <Spin size="large" />
                        </Space>
                        <Space
                            style={{ width: "100%", justifyContent: "center" }}
                        >
                            Sedang melakukan evaluasi terhadap isian…
                        </Space>
                    </Space>
                ) : (
                    <Space style={{ width: "100%" }} direction="vertical">
                        <Tabs
                            type="card"
                            tabBarStyle={{ padding: 0, margin: 0 }}
                            items={[
                                {
                                    label: (
                                        <Badge count={errorList.length}>
                                            Error Isian
                                        </Badge>
                                    ),
                                    key: "1",
                                    children: (
                                        <>
                                            <Space>
                                                Jumlah error: {errorList.length}
                                            </Space>
                                            <Table
                                                bordered
                                                columns={errorColumns}
                                                dataSource={errorList}
                                                style={{ width: "100%" }}
                                            />
                                        </>
                                    ),
                                },
                                {
                                    label: (
                                        <Badge
                                            count={warningList.length}
                                            color="rgb(255, 204, 0)"
                                        >
                                            Warning Isian
                                        </Badge>
                                    ),
                                    key: "2",
                                    children: (
                                        <>
                                            <Space>
                                                Jumlah warning:{" "}
                                                {warningList.length}
                                            </Space>
                                            <Table
                                                bordered
                                                columns={errorColumns}
                                                dataSource={warningList}
                                                style={{ width: "100%" }}
                                            />
                                        </>
                                    ),
                                },
                                {
                                    label: (
                                        <Badge
                                            count={warningRHList.length}
                                            color="rgb(255, 204, 0)"
                                        >
                                            Warning Range Harga
                                        </Badge>
                                    ),
                                    key: "3",
                                    children: (
                                        <>
                                            <Space>
                                                Jumlah warning range harga:{" "}
                                                {warningRHList.length}
                                            </Space>
                                            <Table
                                                bordered
                                                columns={rangeHargaColumns}
                                                dataSource={warningRHList}
                                                style={{ width: "100%" }}
                                            />
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </Space>
                )}
            </MyModal>
        </>
    );
};

Mak.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2>Dashboard</h2>}
        selectedKey="entri"
    >
        {page}
    </AuthenticatedLayout>
);

export default Mak;
