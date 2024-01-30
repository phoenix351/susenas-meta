import {
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    EllipsisOutlined,
    EyeOutlined,
    FilePdfOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { Button, Card, Divider, Empty, Form, Space, Typography } from "antd";
import { ReactNode, useState } from "react";
import { JSX } from "react/jsx-runtime";
import MyModal from "./Modal";
import PemeliharaanForm from "@/Forms/EntriIntiSearch";
import PemeriksaanForm from "@/Forms/PemeriksaanBarang";
import PemeriksaanBMN from "@/Forms/PemeriksaanBMN";
import { PengajuanItem } from "@/types";
import PemeriksaanPBJPPK from "@/Forms/PemeriksaanPBJPPK";
import EditStatusForm from "@/Forms/EditStatusForm";

const { Meta } = Card;
const { Text } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};

const rules = [
    {
        required: true,
        message: "Please upload a file",
    },
];
// interface PengajuanItem {
//     sequence_id: number;
//     bidang: string;
//     deskripsi: string;
//     kode_status: string;
//     jenis: string;
//     merk: string;
//     tipe: string;
//     users_id: number;
//     nama_lengkap: string;
//     nomor_seri: string;
//     nomor_urut_pendaftaran: string;
//     keluhan: string;
//     biaya: number;
//     role: string;
// }
interface ApproveProps {
    users_id: number;
    kode_status: string;
    sequence_id: number;
    merk: string;
    tipe: string;
}
const actionIconStyle = {
    marginRight: 13,
    fontSize: 16,
};
const actionStyle = {
    display: "flex",
    justifyContent: "center",
};
// modal and its properties

const PengajuanCard: React.FC<{
    items: PengajuanItem[];
    csrfToken: string | null;
}> = ({ items, csrfToken }) => {
    const [openTechCheckForm, setOpenTechCheckForm] = useState(false);
    const [openBMNCheckForm, setOpenBMNCheckForm] = useState(false);
    const [openPbjPpkCheckForm, setOpenPbjPpkCheckForm] = useState(false);
    const [openChangeStatusForm, setOpenChangeStatusForm] = useState(false);

    const [loadingTechCheckForm, setLoadingTechCheckForm] = useState(false);
    const [loadingBMNCheckForm, setLoadingBMNCheckForm] = useState(false);
    const [loadingPbjPpkCheckForm, setLoadingPbjPpkCheckForm] = useState(false);
    const [loadingChangeStatusForm, setLoadingChangeStatusForm] =
        useState(false);

    // define the form
    const [pemeriksaanForm] = Form.useForm();
    const [pemeriksaanBMN] = Form.useForm();
    const [pemeriksaanPbjPpk] = Form.useForm();
    const [changeStatusForm] = Form.useForm();

    const handleChange = async (
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        { users_id, kode_status, sequence_id, merk, tipe }: ApproveProps,
        csrfToken: string | null
    ) => {
        // Create the approval data object
        const approvalData = {
            users_id,
            kode_status,
            sequence_id,
            csrfToken,
            // Add any other data you need for the approval
        };
        changeStatusForm.setFieldsValue({
            users_id: users_id,
            sequence_id: sequence_id,
            merk: merk,
            tipe: tipe,
        });

        setOpenChangeStatusForm(true);
    };
    const handleApprove = async (
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        { users_id, kode_status, sequence_id, merk, tipe }: ApproveProps,
        csrfToken: string | null
    ) => {
        // Create the approval data object
        const approvalData = {
            users_id,
            kode_status,
            sequence_id,
            csrfToken,
            // Add any other data you need for the approval
        };
        pemeriksaanForm.setFieldsValue({
            users_id: users_id,
            sequence_id: sequence_id,
            merk: merk,
            tipe: tipe,
        });

        setOpenTechCheckForm(true);
    };
    const handleApproveBMN = async (
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        { users_id, kode_status, sequence_id, merk, tipe }: ApproveProps,
        csrfToken: string | null
    ) => {
        // Create the approval data object
        const approvalData = {
            users_id,
            kode_status,
            sequence_id,
            csrfToken,
            // Add any other data you need for the approval
        };
        pemeriksaanBMN.setFieldsValue({
            users_id: users_id,
            sequence_id: sequence_id,
            merk: merk,
            tipe: tipe,
        });

        setOpenBMNCheckForm(true);
    };
    const handleApprovePbjPpk = async (
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        { users_id, kode_status, sequence_id, merk, tipe }: ApproveProps,
        csrfToken: string | null
    ) => {
        // Create the approval data object
        const approvalData = {
            users_id,
            kode_status,
            sequence_id,
            csrfToken,
            // Add any other data you need for the approval
        };
        pemeriksaanPbjPpk.setFieldsValue({
            users_id: users_id,
            sequence_id: sequence_id,
            merk: merk,
            tipe: tipe,
        });

        setOpenPbjPpkCheckForm(true);
    };

    const handleReject = (
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        { users_id, kode_status, sequence_id }: ApproveProps,
        csrfToken: string | null
    ) => {
        // return users_id + kode_status + sequence_id;
    };
    const handleView = (
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        { users_id, kode_status, sequence_id }: ApproveProps,
        csrfToken: string | null
    ) => {
        router.visit(route("pengajuan.riwayat", sequence_id));

        // return users_id + kode_status + sequence_id;
    };
    console.log({ items });
    return (
        <>
            <Space direction="vertical" style={{ width: "100%" }}>
                {items.length > 0 ? (
                    items.map((item: PengajuanItem, index) => {
                        let actionItems:
                            | JSX.Element[]
                            | ReactNode[]
                            | undefined = [];

                        if (
                            item.kode_status == "9" ||
                            item.kode_status == "99"
                        ) {
                            actionItems = [
                                <div
                                    style={{
                                        color: "green",
                                    }}
                                    onClick={(event) =>
                                        handleView(event, item, csrfToken)
                                    }
                                >
                                    <EyeOutlined style={actionIconStyle} />{" "}
                                    Lihat Pengajuan
                                </div>,
                            ];
                        } else if (
                            item.kode_status == "0" &&
                            item.role == "Tim IPDS"
                        ) {
                            actionItems = [
                                <div
                                    style={{
                                        color: "green",
                                    }}
                                    onClick={(event) =>
                                        handleApprove(event, item, csrfToken)
                                    }
                                >
                                    <CheckOutlined style={actionIconStyle} />{" "}
                                    Approve
                                </div>,
                                <div
                                    style={{
                                        color: "red",
                                    }}
                                    onClick={(event) =>
                                        handleReject(event, item, csrfToken)
                                    }
                                >
                                    <CloseOutlined style={actionIconStyle} />{" "}
                                    Reject
                                </div>,

                                <EllipsisOutlined key="ellipsis" />,
                            ];
                        } else if (
                            item.kode_status == "1" &&
                            item.role == "Tim BMN"
                        ) {
                            actionItems = [
                                <div
                                    style={{
                                        color: "green",
                                    }}
                                    onClick={(event) =>
                                        handleApproveBMN(event, item, csrfToken)
                                    }
                                >
                                    <CheckOutlined style={actionIconStyle} />{" "}
                                    Approve
                                </div>,
                                <div
                                    style={{
                                        color: "red",
                                    }}
                                    onClick={(event) =>
                                        handleReject(event, item, csrfToken)
                                    }
                                >
                                    <CloseOutlined style={actionIconStyle} />{" "}
                                    Reject
                                </div>,

                                <EllipsisOutlined key="ellipsis" />,
                            ];
                        } else if (
                            item.kode_status == "2" &&
                            item.role == "pbj"
                        ) {
                            actionItems = [
                                <div
                                    style={{
                                        color: "green",
                                    }}
                                    onClick={(event) =>
                                        handleApprovePbjPpk(
                                            event,
                                            item,
                                            csrfToken
                                        )
                                    }
                                >
                                    <CheckOutlined style={actionIconStyle} />{" "}
                                    Approve
                                </div>,
                                <div
                                    style={{
                                        color: "red",
                                    }}
                                    onClick={(event) =>
                                        handleReject(event, item, csrfToken)
                                    }
                                >
                                    <CloseOutlined style={actionIconStyle} />{" "}
                                    Reject
                                </div>,

                                <EllipsisOutlined key="ellipsis" />,
                            ];
                        } else {
                            actionItems = [
                                <div
                                    style={{
                                        color: "green",
                                    }}
                                    onClick={(event) =>
                                        handleView(event, item, csrfToken)
                                    }
                                >
                                    <EyeOutlined style={actionIconStyle} />{" "}
                                    Lihat Pengajuan
                                </div>,
                                <div
                                    style={{
                                        color: "",
                                    }}
                                    onClick={(event) =>
                                        handleChange(event, item, csrfToken)
                                    }
                                >
                                    <EditOutlined style={actionIconStyle} />{" "}
                                    Ubah Status
                                </div>,
                            ];
                        }
                        return (
                            <Card
                                key={index}
                                style={{ width: "100%" }}
                                actions={actionItems}
                            >
                                {/* <Meta
                        title=
                        description=
                    /> */}
                                <Space
                                    direction="horizontal"
                                    style={{
                                        width: "100%",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Space direction="vertical">
                                        <Text
                                            strong
                                        >{`${item.nama_lengkap}`}</Text>
                                        <Text type="secondary">{`${item.bidang}`}</Text>
                                    </Space>
                                    <Space style={{ alignItems: "start" }}>
                                        <Text
                                            style={{ color: "#26aa99" }}
                                        >{`${item.deskripsi}`}</Text>{" "}
                                    </Space>
                                </Space>
                                <Divider />
                                <Space direction="vertical">
                                    <Text
                                        strong
                                    >{`${item.merk} ${item.tipe} (${item.jenis})`}</Text>
                                    <Text>{`Keluhan : ${item.keluhan}`}</Text>
                                </Space>
                                {item.kode_status > "4" ? (
                                    <Space
                                        style={{
                                            width: "100%",
                                            justifyContent: "end",
                                        }}
                                    >
                                        <Space direction="vertical">
                                            <Divider
                                                style={{
                                                    marginTop: "12px",
                                                    marginBottom: "12px",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                    width: "100%",
                                                    color: "#4E54C8",
                                                }}
                                            >
                                                Total Biaya Perbaikan :{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }
                                                ).format(item.biaya)}
                                            </Text>
                                            {item.kondisi_final ? (
                                                <Text
                                                    style={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                        width: "100%",
                                                        color: "#4E54C8",
                                                    }}
                                                >
                                                    Kondisi Final :{" "}
                                                    {item.kondisi_final}
                                                </Text>
                                            ) : (
                                                ""
                                            )}
                                        </Space>
                                    </Space>
                                ) : (
                                    ""
                                )}
                            </Card>
                        );
                    })
                ) : (
                    <Card>
                        <Empty
                            description="Belum ada pengajuan"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </Card>
                )}
            </Space>
            <MyModal
                cancelText="Batalkan"
                confirmLoadingModal={loadingTechCheckForm}
                title="Formulir Pemeriksaan Barang oleh IPDS"
                handleCancel={() => setOpenTechCheckForm(false)}
                handleOk={async () => {
                    try {
                        const isValid = await pemeriksaanForm.validateFields();
                        pemeriksaanForm.submit();
                        setOpenTechCheckForm(false);
                    } catch (error) {}
                }}
                openModal={openTechCheckForm}
                okText="Setujui"
            >
                <PemeriksaanForm form={pemeriksaanForm} />
            </MyModal>
            <MyModal
                cancelText="Batalkan"
                confirmLoadingModal={loadingBMNCheckForm}
                title="Formulir Pemeriksaan Barang oleh Tim BMN"
                handleCancel={() => setOpenBMNCheckForm(false)}
                handleOk={async () => {
                    try {
                        const isValid = await pemeriksaanBMN.validateFields();
                        pemeriksaanBMN.submit();
                        setOpenBMNCheckForm(false);
                    } catch (error) {}
                }}
                openModal={openBMNCheckForm}
                okText="Setujui"
            >
                <PemeriksaanBMN form={pemeriksaanBMN} />
            </MyModal>
            <MyModal
                cancelText="Batalkan"
                confirmLoadingModal={loadingPbjPpkCheckForm}
                title="Formulir Pemeriksaan Barang oleh Tim PBJ / PPK"
                handleCancel={() => setOpenPbjPpkCheckForm(false)}
                handleOk={async () => {
                    try {
                        const isValid =
                            await pemeriksaanPbjPpk.validateFields();
                        pemeriksaanPbjPpk.submit();
                        setOpenPbjPpkCheckForm(false);
                    } catch (error) {}
                }}
                openModal={openPbjPpkCheckForm}
                okText="Setujui"
                maskClosable={false}
            >
                <PemeriksaanPBJPPK form={pemeriksaanPbjPpk} />
            </MyModal>
            <MyModal
                cancelText="Batalkan"
                confirmLoadingModal={loadingChangeStatusForm}
                title="Formulir Perubahan Status Pengajuan"
                handleCancel={() => setOpenChangeStatusForm(false)}
                handleOk={async () => {
                    // setOpenTechCheckForm(false);
                    try {
                        const isValid = await changeStatusForm.validateFields();
                        changeStatusForm.submit();
                        setOpenChangeStatusForm(false);
                    } catch (error) {
                        // console.log(error);
                    }
                }}
                openModal={openChangeStatusForm}
                okText="Simpan Perubahan"
                maskClosable={false}
            >
                <EditStatusForm form={changeStatusForm} />
            </MyModal>
        </>
    );
};

export default PengajuanCard;
