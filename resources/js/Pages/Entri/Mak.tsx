import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { PageProps, User, KondisiSummary, Summary } from "@/types";
import BarChart from "@/Components/Grafik/BarChart";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";
import {
    Button,
    Card,
    Col,
    Form,
    Row,
    Space,
    Statistic,
    Table,
    Tabs,
    message,
} from "antd";
import {
    WarningOutlined,
    StopOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import EntriIntiForm from "@/Forms/EntriIntiSearch";
import axios from "axios";
import EntriMak from "@/Forms/Mak/Blok1_2";
import Blok1_2 from "@/Forms/Mak/Blok1_2";
import Blok4_1 from "@/Forms/Mak/Blok4_1";
import Blok4_1art from "@/Forms/Mak/Blok4_1_art";
import Blok4_3 from "@/Forms/Mak/Blok4_3";

const Mak = () => {
    useEffect(() => {}, []);
    // const [cariForm] = Form.useForm();
    const tabContentStyle: React.CSSProperties = {
        backgroundColor: "#fff",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "15px",
        width: "100%",
    };
    // define forms
    const [blok1_2Form] = Form.useForm();
    const [blok4_1Form] = Form.useForm();
    const [blok4_1artForm] = Form.useForm();
    const [blok4_3Form] = Form.useForm();
    const [daftarSampel, setDaftarSampel] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const Status = {
        3: (
            <Button type="primary" danger>
                Error
            </Button>
        ),
        2: <Button type="default">Warning</Button>,
        1: (
            <Button type="primary" style={{ backgroundColor: "green" }}>
                Success
            </Button>
        ),
    };
    const blok1_2Finish = async (values: any) => {
        console.log({ values });
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.inti", values);
            const { data } = await axios.get(url);
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil mengambil data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const blok4_1Finish = async (values: any) => {
        console.log({ values });
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.inti", values);
            const { data } = await axios.get(url);
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil mengambil data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const blok4_1artFinish = async (values: any) => {
        console.log({ values });
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.inti", values);
            const { data } = await axios.get(url);
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil mengambil data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const blok4_3Finish = async (values: any) => {
        console.log({ values });
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.inti", values);
            const { data } = await axios.get(url);
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil mengambil data",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };
    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Nomor",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Kecamatan",
            dataIndex: "kec",
            key: "kec",
            render: (_: any, record: any) =>
                `[${record.kode_kec}] ${record.nama_kecamatan}`,
        },
        {
            title: "Desa",
            dataIndex: "desa",
            key: "desa",
            render: (_: any, record: any) =>
                `[${record.kode_desa}] ${record.nama_desa}`,
        },
        {
            title: "Blok Sensus",
            dataIndex: "kode_bs4",
            key: "kode_bs4",
        },
        {
            title: "No Urut Sampel",
            dataIndex: "id_dsrt",
            key: "id_dsrt",
        },
        {
            title: "Nama KRT",
            dataIndex: "nama_krt",
            key: "nama_krt",
        },
        {
            title: "Alamat",
            dataIndex: "alamat",
            key: "alamat",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (value: number) => {
                const statusElement = Status[value as keyof typeof Status];
                return statusElement || <span>No Status</span>;
            },
        },
        {
            title: "Entri",
            dataIndex: "entri",
            key: "entri",
            render: (_: any, record: any) => (
                <Button
                    type="primary"
                    onClick={() =>
                        router.get(route("entri.mak", { id_dsrt: record.id }))
                    }
                >
                    Entri
                </Button>
            ),
        },
    ];

    function handleChange(activeKey: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            {contextHolder}
            <Head title="Entri Kuesioner Inti" />
            <Space
                style={{
                    // backgroundColor: "#fff",
                    width: "100%",
                    minHeight: "300px",
                    padding: "10px 15px",
                }}
                direction="vertical"
            >
                <Tabs
                    onChange={handleChange}
                    type="card"
                    items={[
                        {
                            label: "Blok I, II",
                            key: "1",
                            children: (
                                <Blok1_2
                                    tabContentStyle={tabContentStyle}
                                    form={blok1_2Form}
                                    onFinish={blok1_2Finish}
                                />
                            ),
                        },
                        {
                            label: "Blok IV.1",
                            key: "2",
                            children: (
                                <Blok4_1
                                    form={blok4_1Form}
                                    tabContentStyle={tabContentStyle}
                                    onFinish={blok4_1Finish}
                                />
                            ),
                        },
                        {
                            label: "Blok IV.1 ART",
                            key: "3",
                            children: (
                                <Blok4_1art
                                    tabContentStyle={tabContentStyle}
                                    form={blok4_1artForm}
                                    onFinish={blok4_1artFinish}
                                />
                            ),
                        },
                        {
                            label: "Blok IV.3",
                            key: "4",
                            children: (
                                <Blok4_3
                                    tabContentStyle={tabContentStyle}
                                    form={blok4_3Form}
                                    onFinish={blok4_3Finish}
                                />
                            ),
                        },
                    ]}
                />
                {/* <Table dataSource={dazftarSampel} columns={columns} />; */}
            </Space>
        </>
    );
};

Mak.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Dashboard</h2>}
        selectedKey="entri"
        children={page}
    ></AuthenticatedLayout>
);
export default Mak;
