import PemeliharaanForm from "@/Forms/EntriIntiSearch";
import {
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { Card, Divider, Empty, Form, Space, Typography } from "antd";
import { MouseEvent, ReactNode, useState } from "react";
import { JSX } from "react/jsx-runtime";
import MyModal from "./Modal";
import EditPemeliharaanForm from "@/Forms/EditPemeliharaanForm";

import { PengajuanItem } from "@/types";

// const { Meta } = Card;
const { Text } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};
interface ApproveProps {
    users_id: number;
    kode_status: string;
    sequence_id: number;
}
const actionIconStyle = {
    marginRight: 13,
    fontSize: 16,
};
const actionStyle = {
    display: "flex",
    justifyContent: "center",
};

const handleReject = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    { users_id, kode_status, sequence_id }: ApproveProps,
    csrfToken: string | null
) => {
    // return users_id + kode_status + sequence_id;
};
const handleView = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    { users_id, kode_status, sequence_id }: ApproveProps,
    csrfToken: string | null
) => {
    router.visit(route("pengajuan.riwayat", sequence_id));

    // return users_id + kode_status + sequence_id;
};

const UserPengajuanCard: React.FC<{
    items: PengajuanItem[];
    csrfToken: string | null;
}> = ({ items, csrfToken }) => {
    const [urlImage, setUrlImage] = useState<string | null>("");

    const [openPengajuan, setOpenPengajuan] = useState(false);
    const [confirmLoadingPengajuan, setConfirmLoadingPengajuan] =
        useState(false);

    const [pengajuanForm] = Form.useForm();
    const handleOkPengajuan = async () => {
        // handle opening
        pengajuanForm.submit();
        // setOpenPengajuan(false);

        setOpenPengajuan(false);
    };

    const handleChange = (
        event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        item: PengajuanItem,
        csrfToken: string | null
    ) => {
        pengajuanForm.setFieldsValue({
            users_id: item.users_id,
            sequence_id: item.sequence_id,
            merk: item.merk,
            tipe: item.tipe,
            keluhan: item.keluhan,
        });
        setUrlImage(item.problem_img_path);
        setOpenPengajuan(true);
        console.log({ item });
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {items.length > 0 ? (
                items.map((item: PengajuanItem, index) => {
                    let actionItems: JSX.Element[] | ReactNode[] | undefined =
                        [];

                    if (item.kode_status == "0") {
                        actionItems = [
                            <div
                                style={{
                                    color: "green",
                                }}
                                onClick={(event) =>
                                    handleView(event, item, csrfToken)
                                }
                            >
                                <EyeOutlined style={actionIconStyle} /> Lihat
                                Pengajuan
                            </div>,
                            <div
                                style={{
                                    color: "",
                                }}
                                onClick={(event) =>
                                    handleChange(event, item, csrfToken)
                                }
                            >
                                <EditOutlined style={actionIconStyle} /> Ubah
                                Pengajuan{" "}
                            </div>,
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
                                <EyeOutlined style={actionIconStyle} /> Lihat
                                Pengajuan
                            </div>,
                        ];
                    }
                    return (
                        <Card
                            key={index}
                            style={{ width: "100%" }}
                            actions={actionItems}
                        >
                            <Space
                                direction="horizontal"
                                style={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Space direction="vertical">
                                    <Text strong>{`${item.nama_lengkap}`}</Text>
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
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(item.biaya)}
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
            <MyModal
                title="Form Pengajuan Barang"
                openModal={openPengajuan}
                handleOk={handleOkPengajuan}
                confirmLoadingModal={confirmLoadingPengajuan}
                handleCancel={() => setOpenPengajuan(false)}
                okText="Kirim Pengajuan"
                cancelText="Batal"
                maskClosable={false}
                width={600}
            >
                <EditPemeliharaanForm
                    form={pengajuanForm}
                    defaultPreview={urlImage}
                />
            </MyModal>
        </Space>
    );
};

export default UserPengajuanCard;
