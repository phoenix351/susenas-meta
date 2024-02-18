import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { PageProps, User } from "@/types";
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
    message,
} from "antd";
import {
    WarningOutlined,
    StopOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import EntriIntiForm from "@/Forms/EntriIntiSearch";
import axios from "axios";

const Dashboard = () => {
    useEffect(() => {}, []);
    const [cariForm] = Form.useForm();
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
    const cariFinish = async (values: any) => {
        console.log({ values });
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.mak", values);
            const { data } = await axios.get(url);
            console.log({ data });
            setDaftarSampel(data.data);
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil mengambil data",
            });
        } catch (err) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };

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
                `[${record.kode_kec}] ${record.kec}`,
        },
        {
            title: "Desa",
            dataIndex: "desa",
            key: "desa",
            render: (_: any, record: any) =>
                `[${record.kode_desa}] ${record.desa}`,
        },
        {
            title: "Blok Sensus",
            dataIndex: "kode_bs4",
            key: "kode_bs4",
        },
        {
            title: "No Urut Sampel",
            dataIndex: "r109",
            key: "r109",
        },
        {
            title: "Nama KRT",
            dataIndex: "r110",
            key: "r110",
        },
        {
            title: "Alamat",
            dataIndex: "r111",
            key: "r111",
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
                        router.get(`${route("entri.mak.edit")}/${record.id}`)
                    }
                >
                    Entri
                </Button>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <Head title="Entri Kuesioner Inti" />
            <Space
                style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    minHeight: "300px",
                    padding: "10px 15px",
                }}
                direction="vertical"
            >
                <EntriIntiForm form={cariForm} onFinish={cariFinish} />
                <Space style={{ width: "100%", justifyContent: "end" }}>
                    <Button
                        type="primary"
                        onClick={() => router.visit(route("entri.mak.create"))}
                    >
                        Tambah Ruta
                    </Button>
                </Space>
                <Table dataSource={daftarSampel} columns={columns} />;
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
        selectedKey="entri"
        children={page}
    ></AuthenticatedLayout>
);
export default Dashboard;
