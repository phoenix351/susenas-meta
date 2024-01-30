import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { BastType, PageProps } from "@/types";

import {
    ReactElement,
    JSXElementConstructor,
    ReactPortal,
    useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    Divider,
    Form,
    Input,
    Space,
    // Table,
    message,
    Typography,
    Table,
    Button,
    Image,
} from "antd";
import {
    EditOutlined,
    CaretDownOutlined,
    EyeOutlined,
    WarningOutlined,
    StopOutlined,
    CheckCircleOutlined,
    LeftOutlined,
    FilePdfOutlined,
} from "@ant-design/icons";
import React from "react";
import {
    ColumnFilterItem,
    ColumnsType,
    CompareFn,
    SortOrder,
} from "antd/es/table/interface";
import MyModal from "@/Components/Modal";
import Bast from "@/Components/Bast";
import HistoryBarangForm from "@/Forms/HistoryBarangForm";

import { Maintenance, MaintenanceHistory, DataType } from "@/types";
import axios from "axios";

import PemeliharaanForm from "@/Forms/EntriIntiSearch";

import moment from "moment";
import "moment/locale/id"; // Memuat lokalisasi bahasa Indonesia

const { Search } = Input;
const { Text } = Typography;

const BarangPage = ({
    history_list,
    detail_barang,
}: PageProps & { history_list: MaintenanceHistory[]; detail_barang: any }) => {
    // console.log({ history_list });

    const csrfTokenRef = useRef<string | null>(null);
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    const [searchText, setSearchText] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const saveKey = "updatable";
    const [itemAddForm] = Form.useForm();

    // modal
    const [openModal, setOpenModal] = useState(false);

    const handleCancel = () => {
        setOpenModal(false);
    };

    const [openPengajuan, setOpenPengajuan] = useState(false);

    const [confirmLoadingModal, setConfirmLoadingModal] = useState(false);

    const [confirmLoadingPengajuan, setConfirmLoadingPengajuan] =
        useState(false);

    const handleOkPengajuan = async () => {
        // handle opening
        pengajuanForm.submit();
        setOpenPengajuan(false);
        setConfirmLoadingPengajuan(false);
    };
    const handleCancelPengajuan = () => {
        setOpenPengajuan(false);
    };

    const handleOk = async () => {
        itemAddForm.submit();
        setOpenModal(false);
        setConfirmLoadingModal(false);
    };

    const data_master = history_list.map(
        ({
            id,
            sequence_id,
            barang_id,
            created_at,
            kode_status,
            deskripsi,
            users_id,
            nama_lengkap,
            maintenance_id,
            jenis,
            merk,
            tipe,
            nomor_seri,
        }): MaintenanceHistory => ({
            id,
            sequence_id,
            key: id,
            barang_id,
            created_at,
            kode_status,
            deskripsi,
            users_id,
            nama_lengkap,
            maintenance_id,
            jenis,
            merk,
            tipe,
            nomor_seri,
        })
    );
    const [dataSource, setDataSource] =
        useState<MaintenanceHistory[]>(data_master);
    // data for current barang bast

    useEffect(() => {
        if (csrfTokenMeta) {
            csrfTokenRef.current = csrfTokenMeta.getAttribute("content");
        }
    }, []);
    useEffect(() => {
        setTimeout(() => {
            let data_master = history_list.map(
                ({
                    id,
                    sequence_id,
                    barang_id,
                    created_at,
                    kode_status,
                    deskripsi,
                    users_id,
                    nama_lengkap,
                    maintenance_id,
                    jenis,
                    merk,
                    tipe,
                    nomor_seri,
                }): MaintenanceHistory => ({
                    id,
                    sequence_id,
                    key: id,
                    barang_id,
                    created_at,
                    kode_status,
                    deskripsi,
                    users_id,
                    nama_lengkap,
                    maintenance_id,
                    jenis,
                    merk,
                    tipe,
                    nomor_seri,
                })
            ) as MaintenanceHistory[];

            setDataSource(data_master);
        }, 0);
    }, [history_list]);

    const onFinishAdd: (values: any) => any = (values: any) => {
        messageApi.open({
            key: saveKey,
            content: "Sedang menambahkan data...",
            type: "loading",
        });
        try {
            router.post(route("history_list.store"), values, {
                onSuccess: (responsePage) => {
                    const response: any = responsePage.props.response;
                    console.log({ response });
                    if (response.errors?.length > 1) {
                        return messageApi.open({
                            key: saveKey,
                            content: response.errors,
                            type: "error",
                        });
                    }
                    messageApi.open({
                        key: saveKey,
                        content: "Berhasil menambahkan data",
                        type: "success",
                    });

                    return 1;
                },
            });
        } catch (error: any) {
            messageApi.open({
                key: saveKey,
                content: error.message,
                type: "error",
            });
            return 0;
        }
    };
    const onFinishEdit: (values: any) => any = (values: any) => {
        messageApi.open({
            key: saveKey,
            content: "Sedang menambahkan data...",
            type: "loading",
        });
        try {
            router.patch(route("history_list.update"), values, {
                onSuccess: (responsePage) => {
                    const response: any = responsePage.props.response;
                    // console.log({ response });
                    if (response.errors?.length > 1) {
                        return messageApi.open({
                            key: saveKey,
                            content: response.errors,
                            type: "error",
                        });
                    }
                    messageApi.open({
                        key: saveKey,
                        content: "Berhasil menyimpan perubahan data",
                        type: "success",
                    });

                    return 1;
                },
            });
        } catch (error: any) {
            messageApi.open({
                key: saveKey,
                content: error.message,
                type: "error",
            });
            return 0;
        }
    };
    const [pengajuanForm] = Form.useForm();
    const pengajuanFinish = (values: any) => {
        try {
            router.post(route("maintenance.update"), values, {
                onStart: () => {
                    messageApi.open({
                        key: saveKey,
                        content: "Sedang menyimpan...",
                        type: "loading",
                    });
                },
                onSuccess: (responsePage) => {
                    const response: any = responsePage.props;
                    // console.log({ response });
                    if (response.errors?.length > 1) {
                        return messageApi.open({
                            key: saveKey,
                            content: response.errors,
                            type: "error",
                        });
                    }
                    messageApi.open({
                        key: saveKey,
                        content: "Berhasil menyimpan data",
                        type: "success",
                    });

                    return 1;
                },
            });
        } catch (error: any) {
            messageApi.open({
                key: saveKey,
                content: error.message,
                type: "error",
            });
            return 0;
        }
    };
    // const biayaSorter: Sorter<MaintenanceHistory> = createSorter("biaya");
    interface Column {
        key?: React.Key;
        title: string;
        dataIndex: string;
        sorter?: CompareFn<object>;
        editable?: boolean;
        filters?: ColumnFilterItem[];
        onCell?: (record: DataType) => object;
        render?: (value: any, record: Maintenance) => React.ReactNode;
    }

    const defaultColumns: ColumnsType<MaintenanceHistory> = [
        {
            title: "tanggal",
            dataIndex: "created_at",
            render: (value: any) =>
                moment(value).locale("id").format("D MMMM YYYY, [Pukul] HH:mm"),
        },
        {
            title: "Status Pengajuan",
            dataIndex: "deskripsi",
        },
        {
            title: "Nama Petugas",
            dataIndex: "nama_lengkap",
        },
    ];

    return (
        <div>
            <Head title="History Barang" />
            <MyModal
                title={"Tambah History Barang"}
                openModal={openModal}
                handleOk={handleOk}
                confirmLoadingModal={confirmLoadingModal}
                handleCancel={handleCancel}
                okText="Tambahkan"
                cancelText="Batal"
            >
                <Divider />
                <HistoryBarangForm form={itemAddForm} onFinish={onFinishAdd} />
            </MyModal>

            <MyModal
                title="Form Pengajuan Pemeliharaan Barang"
                openModal={openPengajuan}
                handleOk={handleOkPengajuan}
                confirmLoadingModal={confirmLoadingPengajuan}
                handleCancel={handleCancelPengajuan}
                okText="Simpan Perubahan"
                cancelText="Batal"
                width={600}
            >
                <Divider />
                <PemeliharaanForm
                    form={pengajuanForm}
                    onFinish={pengajuanFinish}
                />
            </MyModal>

            {contextHolder}
            <Space
                direction="horizontal"
                style={{ backgroundColor: "whitesmoke" }}
                onClick={() => window.history.back()}
            >
                <Button type="primary" icon={<LeftOutlined />}>
                    Kembali
                </Button>
            </Space>
            <Divider />
            <Space
                direction="horizontal"
                style={{ width: "100%", justifyContent: "space-between" }}
            >
                <Space direction="vertical">
                    <h1>Riwayat Pengajuan</h1>
                    <h3>
                        {detail_barang.jenis} : {detail_barang.merk}{" "}
                        {detail_barang.tipe}
                    </h3>
                </Space>
                <Space>
                    {detail_barang.spek_path ? (
                        <Button
                            type="primary"
                            icon={<FilePdfOutlined />}
                            onClick={() =>
                                window.open(detail_barang.spek_path, "_blank")
                            }
                        >
                            Lihat Spek
                        </Button>
                    ) : (
                        ""
                    )}
                </Space>
            </Space>
            <Divider />
            {/* <h1>{detail_barang.image_path}</h1> */}
            {detail_barang.image_path ? (
                <Image src={detail_barang.image_path} alt="Example Image" />
            ) : (
                ""
            )}

            <Table
                rowClassName={() => "editable-row"}
                scroll={{ x: 1500 }}
                bordered
                dataSource={dataSource.filter((item) =>
                    Object.values(item)
                        .join("")
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )}
                columns={defaultColumns}
            />
        </div>
    );
};

BarangPage.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Pengajuan Saya</h2>}
        selectedKey="pengajuan"
        children={page}
    ></AuthenticatedLayout>
);
export default BarangPage;
