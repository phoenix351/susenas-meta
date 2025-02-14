import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import { Button, Form, Popconfirm, Space, Table, message } from "antd";
import EntriIntiForm from "@/Forms/EntriIntiSearch";
import axios from "axios";
import { PageProps } from "@/types";
import {
    DeleteFilled,
    DeleteOutlined,
    DeleteRowOutlined,
    EditFilled,
    EditOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { throttle } from "lodash";

const Dashboard = ({
    data_susenas,
    nks,
    kode_kabkot,
    semester,
}: PageProps & {
    data_susenas: any[];
    nks: string;
    kode_kabkot: string;
    semester: string | number;
}) => {
    useEffect(() => {
        if (nks && kode_kabkot) {
            cariForm.setFieldsValue({
                nks: nks,
                kode_kabkot: kode_kabkot,
                semester: semester,
            });
        }
        if (data_susenas.length > 0) {
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
        // console.log({ values });
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Memuat Data",
        });
        try {
            const url = route("api.entri.mak", values);
            const { data } = await axios.get(url);
            // console.log({ data });
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
    const remove = async (id_ruta: string) => {
        try {
            // console.log({ id_ruta });

            const { data } = await axios.delete(
                route("entri.mak.delete", { id_ruta: id_ruta })
            );

            messageApi.open({
                content: "Berhasil menghapus 1 anggota rumah tangga",
                type: "success",
                key: "hapus-ruta",
            });
            router.get(
                route("entri", {
                    kode_kabkot: cariForm.getFieldValue("kode_kabkot"),
                    nks: cariForm.getFieldValue("nks"),
                })
            );
            // Do any synchronous operations relying on the updatedDaftarArt here
        } catch (error) {
            // console.error("Error in add function:", error);
            messageApi.open({
                content: `Terjadi galat ketika menghapus data, tunjukan code ini pada Developer (${error})`,
                type: "error",
                key: "hapus-ruta",
                duration: 3,
            });
        }
    };
    const debounceCellDelete = throttle(remove, 2000);
    interface StatusColor {
        clean: string;
        error: string;
        warning: string;
        entri: string;
    }
    const statusColor: StatusColor = {
        clean: "green",
        error: "red",
        warning: "rgb(255, 204, 0)",
        entri: "#fff",
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
            title: "Nama PML",
            dataIndex: "nama_lengkap",
            key: "nama_lengkap",
        },
        {
            title: "Status",
            dataIndex: "status_dok",
            key: "status_dok",
            render: (value: keyof StatusColor) => (
                <Space
                    style={{
                        backgroundColor: statusColor[value],
                        fontWeight: 600,
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "5px",
                    }}
                >
                    {value}
                </Space>
            ),
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
                    <EditFilled /> entri
                </Button>
            ),
        },
        {
            title: "Delete",
            dataIndex: "entri",
            key: "entri",
            render: (_: any, record: any) => (
                <Popconfirm
                    placement="topLeft"
                    title="apakah anda yakin akan menghapus ruta ini?"
                    description="hapus anggota rumah tangga"
                    okText="yakin dong"
                    cancelText="nyanda"
                    onConfirm={() => debounceCellDelete(record.id)}
                >
                    <Button type="default">
                        <DeleteFilled /> hapus
                    </Button>
                </Popconfirm>
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
                        onClick={() => {
                            try {
                                router.visit(
                                    route(
                                        "entri.mak.create",
                                        cariForm.getFieldsValue()
                                    )
                                );
                            } catch (error) {
                                console.log("hoho");
                            }
                        }}
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
