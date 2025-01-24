import MyModal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, message, Table, TableProps } from "antd";
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
interface KomoditasDataType {
    id: number;
    nama_komoditas: string;
    id_kelompok: number;
    nama_kelompok: string;
    satuan: string;
    kalori: number;
    flag_basket: number;
    type: string;
}

const index = () => {
    //states
    const [daftarKomoditas, setDaftarKomoditas] = useState<KomoditasDataType[]>(
        []
    );
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();
    const [komoditasForm] = Form.useForm();
    async function getData() {
        try {
            messageApi.open({
                type: "loading",
                content: "mengambil data dari server",
                key:"get-data"
            });
            const { data } = await axios.get(route("api.mak.komoditas.list"));
            setDaftarKomoditas(data);
            messageApi.destroy("get-data")
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "error ketika mengambil data",
                key:"get-data"
            });
        }
    }
    async function handleSave(values: FormData) {
        try {
            messageApi.open({
                content: "menyimpan data",
                type: "loading",
                key: "save",
            });
            const response = await axios.put(route("komoditas.update"), values);
            getData()
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
        }
    }
    useEffect(() => {
        getData();
    }, []);
    function onOpen(form: FormInstance, record: KomoditasDataType) {
        form.setFieldsValue(record);
        setOpenEditModal(true);
    }
    const columns: TableProps<KomoditasDataType>["columns"] = [
        { title: "id", dataIndex: "id", key: "id" },
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
                    render: () => <DeleteOutlined />,
                    onHeaderCell: () => ({ colSpan: 0 }), // Make this header cell empty
                },
            ],
        },
    ];

    return (
        <>
            {contextHolder}

            <div>Komoditas</div>
            <Table dataSource={daftarKomoditas} columns={columns} />

            {/* modal crud  */}
            <MyModal
                title="Edit Komoditas"
                openModal={openEditModal}
                handleCancel={() => {
                    komoditasForm.resetFields();
                    setOpenEditModal(false);
                }}
                handleOk={() => {
                    komoditasForm.submit();
                    setOpenEditModal(false);
                }}
                confirmLoadingModal={editLoading}
            >
                <KomoditasForm form={komoditasForm} onFinish={handleSave} />
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
