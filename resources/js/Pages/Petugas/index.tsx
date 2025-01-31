import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { ReactNode, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
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
    Input,
    TableColumnType,
    InputRef,
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
    SearchOutlined,
} from "@ant-design/icons";
import {
    ColumnType,
    CompareFn,
    FilterDropdownProps,
    FilterValue,
    SortOrder,
} from "antd/es/table/interface";
import axios from "axios";
import { throttle } from "lodash";
const { Title, Text } = Typography;

import CreateUserForm from "@/Forms/User/CreateUserForm";
import MyModal from "@/Components/Modal";
import EditUserForm from "@/Forms/User/EditUserForm";

type Sorter<T> = (a: T, b: T, sortOrder?: SortOrder) => number;
interface ColumnSearchProps {
    setSelectedKeys: (selectedKeys: string[]) => void;
    selectedKeys: string[];
    confirm: () => void;
    clearFilters: () => void;
}
interface CustomColumnType<T> extends ColumnType<T> {
    onFilter?: (value: any, record: T) => boolean;
    render?: (text: any, record: T, index: number) => ReactNode;
}

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

const Pengguna = ({
    users,
    kode_kabkot,
}: PageProps & {
    users: any;
    kode_kabkot: string;
}) => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);

    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        // console.log({ kode_kabkot });

        setTableData(users);
    }, [users]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: any
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: FilterDropdownProps) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm();
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1677ff" : undefined }}
            />
        ),
        onFilter: (
            value: string | number | boolean,
            record: { [x: string]: { toString: () => string } }
        ) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text: string) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                <Text>{text}</Text>
            ),
    });

    const createUser = async (values: any) => {
        try {
            // console.log({ values });
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
            form.resetFields();
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
    const UpdateUser = async (values: any) => {
        try {
            // console.log({ values });
            // return;
            setEditLoading(true);
            const { data } = await axios.patch(route("users.update"), values, {
                headers: { "Content-Type": "application/json" },
            });

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
                router.get(
                    route("users.index"),
                    {},
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                );
            }
            setOpenEditModal(false);
            // setOpenAddModal(false);
        } catch (error: any) {
            console.log({ error });

            messageApi.open({
                content: `Terjadi galat, ${error.response.data.message}`,
                type: "error",
                key: "add-user-dialog",
            });
        } finally {
            setEditLoading(false);
        }
    };
    const remove = async (userId: string) => {
        try {
            // console.log({ id_ruta });

            const { data } = await axios.delete(
                route("users.delete", { user: userId })
            );

            messageApi.open({
                content: "Berhasil menghapus 1 akun petugas",
                type: "success",
                key: "hapus-ruta",
            });
            router.get(
                route("users.index"),
                {},
                { preserveScroll: true, preserveState: true }
            );
            // Do any synchronous operations relying on the updatedDaftarArt here
        } catch (error: any) {
            console.error("Error in add function:", error);
            messageApi.open({
                // content: `Terjadi galat ketika menghapus data, tunjukan code ini pada Developer (${error.response.data.message})`,
                content: "error",
                type: "error",
                key: "hapus-ruta",
                duration: 3,
            });
        }
    };
    const handleEdit = (text: any, record: any) => {
        editForm.setFieldsValue(record);
        setOpenEditModal(true);
    };
    const debounceCellDelete = throttle(remove, 2000);

    const columns: CustomColumnType<any>[] = [
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
            ...getColumnSearchProps("nama_lengkap"),
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
            title: "Jabatan",
            dataIndex: "jabatan",
            key: "jabatan",
        },
        {
            title: "Kode Identitas (NIP/NIK)",
            dataIndex: "nip",
            key: "nip",
        },
        {
            title: "Edit",
            dataIndex: "ubah",
            key: "ubah",
            render: (_: any, record: any) => (
                <Button type="default" onClick={() => handleEdit(_, record)}>
                    <EditFilled /> ubah
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
                    <Button type="default" style={{ color: "red" }}>
                        <DeleteFilled /> hapus
                    </Button>
                </Popconfirm>
            ),
        },
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
                handleOk={() => {
                    form.submit();
                }}
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
            <MyModal
                handleOk={() => editForm.submit()}
                okText="Buat"
                confirmLoadingModal={editLoading}
                handleCancel={() => setOpenEditModal(false)}
                openModal={openEditModal}
                title="Ubah Akun Petugas"
                cancelText="Batalkan"
                key={"add-modal"}
            >
                <EditUserForm
                    kode_kabkot={kode_kabkot}
                    form={editForm}
                    onFinish={UpdateUser}
                />
            </MyModal>
        </>
    );
};

Pengguna.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Users</h2>}
        selectedKey="users"
        children={page}
    ></AuthenticatedLayout>
);
export default Pengguna;
