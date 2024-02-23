import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import { Button, Form, Space, Table, message } from "antd";
import EntriIntiForm from "@/Forms/EntriIntiSearch";
import axios from "axios";
import { PageProps } from "@/types";
import { PlusCircleOutlined } from "@ant-design/icons";

const Dashboard = ({
    data_susenas,
    nks,
    kode_kabkot,
}: PageProps & {
    data_susenas: any[];
    nks: string;
    kode_kabkot: string;
}) => {
    useEffect(() => {
        if (data_susenas.length > 0) {
            cariForm.setFieldsValue({
                nks: nks,
                kode_kabkot: kode_kabkot,
                semester: "1",
            });

            setDaftarSampel(data_susenas);
        }
    }, []);
    const [cariForm] = Form.useForm();
    const [daftarSampel, setDaftarSampel] = useState<any[]>([]);
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
            title: "No",
            dataIndex: "id",
            key: "id",
            render: (_: any, rec: any, index: number) => index + 1,
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
            dataIndex: "status_dok",
            key: "status_dok",
            render: (value: any) => <Button>{value}</Button>,
        },
        {
            title: "Entri",
            dataIndex: "entri",
            key: "entri",
            render: (_: any, record: any) => (
                <Button
                    type="primary"
                    onClick={() =>
                        router.get(
                            `${route("entri.mak.edit", { id: record.id })}`
                        )
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
                <EntriIntiForm
                    setDataSource={setDaftarSampel}
                    form={cariForm}
                    onFinish={cariFinish}
                />
                <Space style={{ width: "100%", justifyContent: "end" }}>
                    <Button
                        type="primary"
                        disabled={!cariForm.getFieldValue("nks")}
                        onClick={() => router.visit(route("entri.mak.create"))}
                    >
                        <PlusCircleOutlined /> Tambah Ruta
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
