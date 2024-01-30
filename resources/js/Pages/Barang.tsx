import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
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
    Button,
    Divider,
    Form,
    Input,
    Space,
    // Table,
    message,
    Popconfirm,
    Dropdown,
    MenuProps,
    DatePicker,
    Table,
    FormInstance,
} from "antd";
import {
    EditOutlined,
    CaretDownOutlined,
    MedicineBoxOutlined,
    MailOutlined,
    WarningOutlined,
    StopOutlined,
    CheckCircleOutlined,
    UploadOutlined,
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
import { Barang, DataType } from "@/types";
import axios, { formToJSON } from "axios";

import PemeliharaanForm from "@/Forms/EntriIntiSearch";
import Upload from "antd/es/upload/Upload";
import { FormContextProps } from "antd/es/form/context";

const { Search } = Input;

const BarangPage = ({
    history_barang,
}: PageProps & { history_barang: Barang[] }) => {
    // console.log({ history_barang });

    const csrfTokenRef = useRef<string | null>(null);
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    const [searchText, setSearchText] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const saveKey = "updatable";

    const [itemAddForm] = Form.useForm();
    const [formUpload] = Form.useForm();

    const [currentBarangId, setCurrentBarangId] = useState(0); //

    const [currentRecord, setCurrentRecord] = useState({});

    // modal
    const [openModal, setOpenModal] = useState(false);
    const [openModalUbah, setOpenModalUbah] = useState(false);
    const [openBast, setOpenBast] = useState(false);

    const [openPengajuan, setOpenPengajuan] = useState(false);

    const [confirmLoadingModal, setConfirmLoadingModal] = useState(false);
    const [confirmLoadingModalUbah, setConfirmLoadingModalUbah] =
        useState(false);
    const [confirmLoadingBast, setConfirmLoadingBast] = useState(false);
    const [confirmLoadingPengajuan, setConfirmLoadingPengajuan] =
        useState(false);

    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [confirmLoadingWarningModal, setConfirmLoadingWarningModal] =
        useState(false);
    const handleOkWarningModal = async () => {
        router.get(route("pengajuan"));
    };
    const handleCancelWarningModal = async () => {
        setOpenWarningModal(false);
    };

    const handleOk = async () => {
        itemAddForm.submit();
        setOpenModal(false);
        setConfirmLoadingModal(false);
    };
    const handleOkUbah = async () => {
        itemAddForm.submit();
        setOpenModalUbah(false);
        setConfirmLoadingModalUbah(false);
    };
    const handleOkBast = async () => {
        // handle opening
        setOpenBast(false);
        setConfirmLoadingBast(false);
    };

    const handleOkPengajuan = async () => {
        // handle opening
        try {
            const validasi = await pengajuanForm.validateFields();
            pengajuanForm.submit();
            setOpenPengajuan(false);
            setConfirmLoadingPengajuan(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
    };
    const handleCancelUbah = () => {
        setOpenModalUbah(false);
    };
    const handleCancelBast = () => {
        setOpenBast(false);
    };
    const handleCancelPengajuan = () => {
        setOpenPengajuan(false);
    };
    console.log({ history_barang });

    const data_master = history_barang.map(
        ({
            id,
            barang_jenis,
            barang_merk,
            barang_tipe,
            tanggal_peroleh,
            barang_nomor_seri,
            kondisi,
            ruangan_nama,
            ruangan_id,
            users_nama_lengkap,
            bast_path,
            is_approved,
            pengguna_id,
            barang_id,
        }): Barang => ({
            id,
            key: id,
            barang_jenis,
            barang_merk,
            barang_tipe,
            tanggal_peroleh,
            barang_nomor_seri,
            kondisi,
            ruangan_nama,
            ruangan_id,
            users_nama_lengkap,
            bast_path,
            is_approved,
            pengguna_id,
            barang_id,
        })
    );
    const [dataSource, setDataSource] = useState<Barang[]>(data_master);
    // data for current barang bast
    const [dataBast, setDataBast] = useState<BastType[]>([]);

    useEffect(() => {
        if (csrfTokenMeta) {
            csrfTokenRef.current = csrfTokenMeta.getAttribute("content");
        }
    }, []);
    useEffect(() => {
        setTimeout(() => {
            let data_master = history_barang.map(
                ({
                    id,
                    barang_jenis,
                    barang_merk,
                    barang_tipe,
                    tanggal_peroleh,
                    barang_nomor_seri,
                    kondisi,
                    ruangan_nama,
                    users_nama_lengkap,
                    bast_path,
                    is_approved,
                    pengguna_id,
                    barang_id,
                }) => ({
                    key: id,
                    barang_jenis,
                    barang_merk,
                    barang_tipe,
                    tanggal_peroleh,
                    barang_nomor_seri,
                    kondisi,
                    ruangan_nama,
                    users_nama_lengkap,
                    bast_path,
                    is_approved,
                    pengguna_id,
                    barang_id,
                })
            ) as Barang[];

            setDataSource(data_master);
        }, 0);
    }, [history_barang]);

    const onSearch = async (value: string) => {
        setSearchLoading(true);
        setSearchText(value);
        setSearchLoading(false);
    };
    const handleAdd = () => {
        itemAddForm.resetFields();
        setOpenModal(true);
    };

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
    const { url } = usePage();
    const handleReload = () => {
        router.get(
            url,
            {},
            {
                preserveState: true,
            }
        );
    };
    const handleUploadBast = async (
        info: any,
        record: Barang,
        formUpload: FormInstance
    ) => {
        // console.log({ info, record });
        messageApi.open({
            key: saveKey,
            content: "Sedang mengunggah dokumen...",
            type: "loading",
        });
        try {
            if (info.fileList.length > 0) {
                const file = info.fileList[0].originFileObj;
                const formData = {
                    file: file,
                    barang_id: record.key,
                };
                // console.log({ info, record, formData });
                // return 0;
                const urlUploadBast = route("bast.upload");
                const uploadResponse = await axios.post(
                    urlUploadBast,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                messageApi.open({
                    key: saveKey,
                    content: "Berhasil mengunggah BAST",
                    type: "success",
                });
            }
        } catch (error: any) {
            messageApi.open({
                key: saveKey,
                content: error.message,
                type: "error",
            });
        } finally {
            handleReload();
        }
    };
    const onFinishAdd: (values: any) => any = (values: any) => {
        messageApi.open({
            key: saveKey,
            content: "Sedang menambahkan data...",
            type: "loading",
        });
        try {
            router.post(route("history_barang.store"), values, {
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
            router.patch(route("history_barang.update"), values, {
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
        messageApi.open({
            key: saveKey,
            content: "Sedang mengajukan...",
            type: "loading",
        });
        // console.log({ values });
        const copyValues = { ...values };
        try {
            copyValues["problem_img_path"] =
                values.problem_img_path.fileList[0].originFileObj;
        } catch (error) {
            copyValues["problem_img_path"] = "";
        }
        try {
            const response = axios.post(
                route("maintenance.store"),
                copyValues,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            console.log({ response });

            messageApi.open({
                key: saveKey,
                content: "Berhasil menambahkan data",
                type: "success",
            });

            return 1;
        } catch (error: any) {
            messageApi.open({
                key: saveKey,
                content: error.message,
                type: "error",
            });
            return 0;
        }
    };
    const jenisSorter: Sorter<Barang> = createSorter("barang_jenis");
    const tipeSorter: Sorter<Barang> = createSorter("barang_tipe");
    const merkSorter: Sorter<Barang> = createSorter("barang_merk");
    const nomorSeriSorter: Sorter<Barang> = createSorter("barang_nomor_seri");
    const tahunPerolehSorter: Sorter<Barang> = createSorter("tanggal_peroleh");
    interface Column {
        key?: React.Key;
        title: string;
        dataIndex: string;
        sorter?: CompareFn<object>;
        editable?: boolean;
        filters?: ColumnFilterItem[];
        onCell?: (record: DataType) => object;
        render?: (value: any, record: Barang) => React.ReactNode;
    }

    const defaultColumns: ColumnsType<Barang> = [
        {
            title: "jenis",
            dataIndex: "barang_jenis",
            filters: [
                {
                    text: "PC",
                    value: "PC",
                },
                {
                    text: "Laptop",
                    value: "Laptop",
                },
            ],
            onFilter: (value: string | number | boolean, record: Barang) =>
                record.barang_jenis === value,
            sorter: jenisSorter as CompareFn<object>,
        },
        {
            title: "merk",
            dataIndex: "barang_merk",
            sorter: merkSorter as CompareFn<object>,
        },
        {
            title: "Nama",
            dataIndex: "users_nama_lengkap",
        },
        {
            title: "tipe",
            dataIndex: "barang_tipe",
            sorter: tipeSorter as CompareFn<object>,
        },
        {
            title: "tanggal_peroleh",
            dataIndex: "tanggal_peroleh",
            sorter: tahunPerolehSorter as CompareFn<object>,
        },
        {
            title: "barang_nomor_seri",
            dataIndex: "barang_nomor_seri",
            sorter: nomorSeriSorter as CompareFn<object>,
        },
        {
            title: "kondisi",
            dataIndex: "kondisi",
            filters: [
                {
                    text: "Baik",
                    value: "Baik",
                },
                {
                    text: "Rusak Ringan",
                    value: "Rusak Ringan",
                },
                {
                    text: "Rusak Berat",
                    value: "Rusak Berat",
                },
            ],
            onFilter: (value: string | number | boolean, record: Barang) =>
                record.kondisi.trim().toLowerCase() ===
                String(value).toLowerCase(),
            render: (value: string) => {
                if (value === "Baik")
                    return (
                        <>
                            <CheckCircleOutlined style={{ color: "green" }} />{" "}
                            Baik
                        </>
                    );
                if (value === "Rusak Ringan")
                    return (
                        <>
                            <WarningOutlined style={{ color: "orange" }} />{" "}
                            Rusak Ringan
                        </>
                    );
                if (value === "Rusak Berat")
                    return (
                        <>
                            <StopOutlined style={{ color: "red" }} /> Rusak
                            Berat
                        </>
                    );
                return value;
            },
        },
        {
            title: "ruangan_nama",
            dataIndex: "ruangan_nama",
        },
        {
            title: "File BAST",
            dataIndex: "bast_path",
            render: (value: string, record: Barang) =>
                !value ? (
                    <Upload
                        onChange={(value) =>
                            handleUploadBast(value, record, formUpload)
                        }
                        beforeUpload={() => false}
                        accept=".pdf"
                    >
                        <UploadOutlined /> Upload Bast
                    </Upload>
                ) : (
                    <Button onClick={() => window.open(value, "_blank")}>
                        {" "}
                        <FilePdfOutlined /> Lihat Dokumen
                    </Button>
                ),
        },

        {
            title: "Pemeliharaan",
            dataIndex: "maintenance",
            fixed: "right",
            render: (_, record: Barang) => {
                return (
                    <Button
                        onClick={async () => {
                            const { data } = await axios.post(
                                route("maintenance.check"),
                                {
                                    barang_id: record.barang_id,
                                }
                            );
                            console.log({ dataLeng: data.length });
                            if (data.length < 1) {
                                setOpenWarningModal(true);
                                return false;
                            }
                            pengajuanForm.setFieldValue(
                                "barang_id",
                                record.barang_id
                            );
                            pengajuanForm.setFieldValue(
                                "users_id",
                                record.pengguna_id
                            );
                            pengajuanForm.setFieldValue(
                                "merk",
                                record.barang_merk
                            );
                            pengajuanForm.setFieldValue(
                                "tipe",
                                record.barang_tipe
                            );
                            setCurrentRecord(record);
                            setOpenPengajuan(true);
                        }}
                    >
                        <MedicineBoxOutlined /> Ajukan Pemeliharaan
                    </Button>
                );
            },
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
                title={"Ubah History Barang"}
                openModal={openModalUbah}
                handleOk={handleOkUbah}
                confirmLoadingModal={confirmLoadingModalUbah}
                handleCancel={handleCancelUbah}
                okText="Simpan"
                cancelText="Batal"
            >
                <Divider />
                <HistoryBarangForm form={itemAddForm} onFinish={onFinishEdit} />
            </MyModal>
            <MyModal
                title="Daftar BAST"
                openModal={openBast}
                handleOk={handleOkBast}
                confirmLoadingModal={confirmLoadingBast}
                handleCancel={handleCancelBast}
                okText="Ok"
                cancelText="Batal"
                width={800}
            >
                <Bast data={dataBast} barang_id={currentBarangId} />
            </MyModal>

            <MyModal
                title="Form Pengajuan Barang"
                openModal={openPengajuan}
                handleOk={handleOkPengajuan}
                confirmLoadingModal={confirmLoadingPengajuan}
                handleCancel={handleCancelPengajuan}
                okText="Kirim Pengajuan"
                cancelText="Batal"
                width={600}
            >
                <PemeliharaanForm
                    record={currentRecord}
                    form={pengajuanForm}
                    onFinish={pengajuanFinish}
                />
            </MyModal>

            <MyModal
                title="Peringatan"
                openModal={openWarningModal}
                handleOk={handleOkWarningModal}
                confirmLoadingModal={confirmLoadingWarningModal}
                handleCancel={handleCancelWarningModal}
                okText="Menuju Halaman Pemeliharaan"
                cancelText="Batalkan Aksi"
                width={600}
            >
                Maaf barang yang anda pilih sudah dalam proses pemeliharaan dan
                belum berstatus selesai, silahkan dapat melihat pada halaman
                Pemeliharaan atau hubungi Admin !
            </MyModal>

            {contextHolder}
            <h1>Daftar Barangku</h1>
            <Divider />
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
                <Search
                    placeholder="Cari history barang ..."
                    allowClear
                    onSearch={onSearch}
                    loading={searchLoading}
                    style={{ width: 200, marginBottom: "20px" }}
                />
            </Space>

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
        header={<h2 className="">Kelola Barang Saya</h2>}
        selectedKey="barang"
        children={page}
    ></AuthenticatedLayout>
);
export default BarangPage;
