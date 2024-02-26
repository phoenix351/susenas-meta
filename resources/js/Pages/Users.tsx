import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";
import {
    Button,
    Table,
    Card,
    Col,
    Row,
    Space,
    Statistic,
    Typography,
    Form,
    Popconfirm,
    message,
} from "antd";
// import { Table } from "ant-table-extensions";
import {
    WarningOutlined,
    StopOutlined,
    CheckCircleOutlined,
    ExportOutlined,
    UserAddOutlined,
    DeleteFilled,
    EditFilled,
} from "@ant-design/icons";
import { CompareFn, SortOrder } from "antd/es/table/interface";
import MyModal from "@/Components/Modal";
import axios from "axios";
import { throttle } from "lodash";
import CreateUserForm from "@/Forms/User/CreateUserForm";
const { Title } = Typography;

type Sorter<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

function createSorter<T>(property: keyof T): Sorter<T> {
    return (a: T, b: T, sortOrder?: SortOrder): number => {
        const valueA = String(a[property]);
        const valueB = String(b[property]);

        if (sortOrder === "ascend") {
            return valueA.localeCompare(valueB);
        }

        if (sortOrder === "descend") {
            return -valueB.localeCompare(valueA);
        }

        return 0;
    };
}

const Users = ({
    users,
    kode_kabkot,
}: PageProps & {
    users: any;
    kode_kabkot: string;
}) => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        // console.log({ kode_kabkot });

        setTableData(users);
    }, []);

    const createUser = async (values: any) => {
        try {
            console.log({ values });
            setCreateLoading(true);
            const { data } = await axios.post(route("users.store"), values, {
                headers: { "Content-Type": "application/json" },
            });
            router.get(
                route("users.index"),
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
            if (data.status === "error") {
                messageApi.open({
                    content: data.message,
                    type: "error",
                    key: "add-user-dialog",
                });
            } else {
                messageApi.open({
                    content: data.message,
                    type: "success",
                    key: "add-user-dialog",
                });
            }
            setCreateLoading(false);
            setOpenAddModal(false);
        } catch (error: any) {
            console.log({ errror: error.response.data.message });

            messageApi.open({
                content: `Terjadi galat, ${error.response.data.message}`,
                type: "error",
                key: "add-user-dialog",
            });
            setCreateLoading(false);
        }
    };
    const remove = async (userId: string) => {
        try {
            // console.log({ id_ruta });

            const { data } = await axios.delete(
                route("users.delete", { user_id: userId })
            );

            messageApi.open({
                content: "Berhasil menghapus 1 akun petugas",
                type: "success",
                key: "hapus-ruta",
            });
            router.get(route("users"));
            // Do any synchronous operations relying on the updatedDaftarArt here
        } catch (error: any) {
            // console.error("Error in add function:", error);
            messageApi.open({
                content: `Terjadi galat ketika menghapus data, tunjukan code ini pada Developer (${error.response.data.message})`,
                type: "error",
                key: "hapus-ruta",
                duration: 3,
            });
        }
    };
    const debounceCellDelete = throttle(remove, 2000);

    const columns = [
        // {
        //     title: "No",
        //     dataIndex: "id",
        //     key: "id",
        //     render: (_: any, rec: any, index: number) => index + 1,
        // },
        {
            title: "Nama Petugas",
            dataIndex: "nama_lengkap",
            key: "nama_lengkap",
            sorter: (
                a: { nama_lengkap: string },
                b: { nama_lengkap: string }
            ) => {
                const valueA = a.nama_lengkap.toLowerCase(); // Adjust 'nama_lengkap' to the actual column name
                const valueB = b.nama_lengkap.toLowerCase(); // Adjust 'columnName' to the actual column name

                // Perform custom string comparison
                if (valueA < valueB) {
                    return -1;
                } else if (valueA > valueB) {
                    return 1;
                } else {
                    return 0;
                }
            },
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Assignment",
            dataIndex: "kode_kabkot",
            key: "kode_kabkot",

            render: (_: any, record: any) =>
                `[71${record.kode_kabkot}] ${
                    record.kabkot ?? "SULAWESI UTARA"
                }`,
        },
        {
            title: "Peran",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Kode Identitas (NIP/NIK)",
            dataIndex: "nip",
            key: "nip",
        },
        // {
        //     title: "Edit",
        //     dataIndex: "ubah",
        //     key: "ubah",
        //     render: (_: any, record: any) => (
        //         <Button
        //             type="primary"
        //             onClick={() =>
        //                 router.get(
        //                     `${route("entri.mak.edit", { id: record.id })}`
        //                 )
        //             }
        //         >
        //             <EditFilled /> entri
        //         </Button>
        //     ),
        // },
        // {
        //     title: "Delete",
        //     dataIndex: "entri",
        //     key: "entri",
        //     render: (_: any, record: any) => (
        //         <Popconfirm
        //             placement="topLeft"
        //             title="apakah anda yakin akan menghapus ruta ini?"
        //             description="hapus anggota rumah tangga"
        //             okText="yakin dong"
        //             cancelText="nyanda"
        //             onConfirm={() => debounceCellDelete(record.id)}
        //         >
        //             <Button type="primary" style={{ backgroundColor: "red" }}>
        //                 <DeleteFilled /> hapus
        //             </Button>
        //         </Popconfirm>
        //     ),
        // },
    ];

    return (
        <>
            <Head title="Users" />
            <Title level={2}>Pengelolaan Petugas</Title>
            {contextHolder}
            <Space
                style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    width: "100%",
                    justifyContent: "end",
                }}
            >
                <Button type="primary" onClick={() => setOpenAddModal(true)}>
                    <UserAddOutlined />
                    Tambah Petugas
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
                <Table
                    columns={columns}
                    // size="large"
                    // style={{ width: "100%", backgroundColor: "red" }}
                    dataSource={tableData}
                    scroll={{ x: "100%" }}
                />
            </Space>
            <MyModal
                handleOk={() => form.submit()}
                okText="Buat"
                confirmLoadingModal={createLoading}
                handleCancel={() => setOpenAddModal(false)}
                openModal={openAddModal}
                title="Tambah Petugas Baru"
                cancelText="Batalkan"
                key={"add-modal"}
            >
                <CreateUserForm
                    kode_kabkot={kode_kabkot}
                    form={form}
                    onFinish={createUser}
                />
            </MyModal>
        </>
    );
};

Users.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Users</h2>}
        selectedKey="Users"
        children={page}
    ></AuthenticatedLayout>
);
export default Users;
