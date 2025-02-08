import MyModal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    DeleteOutlined,
    EditOutlined,
    HeartOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import {
    Button,
    Form,
    FormInstance,
    message,
    Popconfirm,
    Table,
    TableProps,
} from "antd";
import { data } from "autoprefixer";
import axios from "axios";
import React, {
    JSXElementConstructor,
    ReactElement,
    ReactPortal,
    useEffect,
    useState,
} from "react";
import KomoditasForm from "./KomoditasForm";
import { KomoditasDataType } from "@/types";

const index = () => {
    //states
    const [daftarKomoditas, setDaftarKomoditas] = useState<KomoditasDataType[]>(
        []
    );
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [flagBasket, setFlagBasket] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();
    const [komoditasForm] = Form.useForm();
    async function getData() {
        try {
            messageApi.open({
                type: "loading",
                content: "mengambil data dari server",
                key: "get-data",
            });
            const { data } = await axios.get(route("api.mak.komoditas.list"));
            setDaftarKomoditas(data);
            messageApi.destroy("get-data");
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "error ketika mengambil data",
                key: "get-data",
            });
        }
    }
    async function handleUpdate(values: KomoditasDataType) {
        try {
            messageApi.open({
                content: "menyimpan data",
                type: "loading",
                key: "save",
            });
            values.flag_basket = Number(values.flag_basket);
            const response = await axios.put(route("komoditas.update"), values);
            getData();
            messageApi.open({
                content: "data berhasil disimpan",
                type: "success",
                key: "save",
            });
        } catch (error) {
            messageApi.open({
                content: "data gagal disimpan, hubungi admin untuk diperiksa",
                type: "error",
                key: "save",
            });
        } finally {
            setOpenEditModal(false);
        }
    }
    async function handleStore(values: KomoditasDataType) {
        try {
            messageApi.open({
                content: "menambahkan komoditas",
                type: "loading",
                key: "store",
            });
            values.flag_basket = Number(values.flag_basket);
            const response = await axios.post(route("komoditas.store"), values);
            getData();
            messageApi.open({
                content: "data berhasil disimpan",
                type: "success",
                key: "store",
            });
        } catch (error) {
            // console.log(error);

            messageApi.open({
                content: "data gagal disimpan, hubungi admin untuk diperiksa",
                type: "error",
                key: "store",
            });
        }
    }
    async function handleDestroy(id: number) {
        try {
            messageApi.open({
                content: "menghapus komoditas",
                type: "loading",
                key: "destroy",
            });
            const response = await axios.delete(
                route("komoditas.destroy", { id: id })
            );
            getData();
            messageApi.open({
                content: "data berhasil dihapus",
                type: "warning",
                key: "destroy",
            });
        } catch (error) {
            console.log(error);

            messageApi.open({
                content: "data gagal dihapus, hubungi admin untuk diperiksa",
                type: "error",
                key: "destroy",
            });
        }
    }
    useEffect(() => {
        getData();
    }, []);
    function onOpen(form: FormInstance, record: KomoditasDataType) {
        const flag = Boolean(record.flag_basket);
        setFlagBasket(flag);
        form.setFieldsValue(record);
        setOpenEditModal(true);
    }
    const columns: TableProps<KomoditasDataType>["columns"] = [
        // { title: "id", dataIndex: "id", key: "id" },
        { title: "nomor_urut", dataIndex: "nomor_urut", key: "nomor_urut" },
        {
            title: "nama_komoditas",
            dataIndex: "nama_komoditas",
            key: "nama_komoditas",
        },
        { title: "id_kelompok", dataIndex: "id_kelompok", key: "id_kelompok" },
        {
            title: "nama_kelompok",
            dataIndex: "nama_kelompok",
            key: "nama_kelompok",
        },
        { title: "satuan", dataIndex: "satuan", key: "satuan" },
        { title: "kalori", dataIndex: "kalori", key: "kalori" },
        { title: "flag_basket", dataIndex: "flag_basket", key: "flag_basket" },
        { title: "type", dataIndex: "type", key: "type" },
        {
            title: "Actions",
            key: "actions",
            children: [
                {
                    title: "Edit",
                    dataIndex: "edit",
                    key: "edit",
                    render: (_, record) => (
                        <Button onClick={() => onOpen(komoditasForm, record)}>
                            <EditOutlined />{" "}
                        </Button>
                    ),
                    onHeaderCell: () => ({ colSpan: 0 }), // Span the header cell across 2 columns
                },
                {
                    title: "Delete",
                    dataIndex: "delete",
                    key: "delete",
                    render: (_, record) => (
                        <Popconfirm
                            title={`Apakah anda yakin akan menghapus komoditas ${record.nama_komoditas} ?`}
                            onConfirm={() => {
                                handleDestroy(record.id);
                            }}
                        >
                            <Button>
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    ),
                    onHeaderCell: () => ({ colSpan: 0 }), // Make this header cell empty
                },
            ],
        },
    ];

    function SwitchFlag(): void {
        setFlagBasket(!flagBasket);
    }

    return (
        <>
            {contextHolder}

            <div>Komoditas</div>
            <Popconfirm
                title="Nomor Urut akan direset sesuai urutan yang sekarang dari 1 sampai n"
                onConfirm={async () => {
                    try {
                        messageApi.open({
                            type: "loading",
                            content: "Sedang Mengurutkan kembali Komoditas",
                            key: "urut",
                        });
                        const response = await axios.get(
                            route("komoditas.sort")
                        );
                        messageApi.open({
                            type: "success",
                            content: "Selesai mengurutkan Komoditas",
                            key: "urut",
                        });
                        getData();
                    } catch (error) {
                        messageApi.open({
                            type: "error",
                            content:
                                "Terjadi kesalahan, silahkan hubungi pengembang.",
                            key: "urut",
                        });
                    }
                }}
            >
                <Button icon={<ReloadOutlined />}>Reset Nomor Urut</Button>
            </Popconfirm>
            <Button
                icon={<PlusOutlined />}
                onClick={() => {
                    komoditasForm.setFieldsValue({
                        nama_komoditas: "New Item",
                        id_kelompok: 1,
                        nama_kelompok: "B. UMBI-UMBIAN [R.9 s.d. R.15]",
                        satuan: "Kg",
                        kode_coicop: "NULL",
                        kalori: 1135,
                        flag_basket: 0,
                        type: "standar",
                    });

                    setOpenCreateModal(true);
                }}
            >
                Komoditas
            </Button>
            <Table dataSource={daftarKomoditas} columns={columns} />

            {/* modal crud  */}
            <MyModal
                title="Edit Komoditas"
                openModal={openEditModal}
                handleCancel={() => {
                    komoditasForm.resetFields();
                    setOpenEditModal(false);
                    setFlagBasket(false);
                }}
                handleOk={() => {
                    komoditasForm.submit();
                    setOpenEditModal(false);
                    setFlagBasket(false);
                }}
                confirmLoadingModal={editLoading}
            >
                <KomoditasForm
                    form={komoditasForm}
                    onFinish={handleUpdate}
                    flag={flagBasket}
                    SwitchFlag={SwitchFlag}
                />
            </MyModal>
            <MyModal
                title="Tambah Komoditas"
                openModal={openCreateModal}
                handleCancel={() => {
                    komoditasForm.resetFields();
                    setOpenCreateModal(false);
                    setFlagBasket(false);
                }}
                handleOk={() => {
                    komoditasForm.submit();
                    setOpenCreateModal(false);
                    setFlagBasket(false);
                }}
                confirmLoadingModal={editLoading}
            >
                <KomoditasForm
                    form={komoditasForm}
                    daftarKomoditas={daftarKomoditas}
                    onFinish={handleStore}
                    flag={flagBasket}
                    SwitchFlag={SwitchFlag}
                />
            </MyModal>
        </>
    );
};
index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Kelola Komoditas</h2>}
        selectedKey="komoditas"
        children={page}
    ></AuthenticatedLayout>
);
export default index;
