import { Button, Divider, Form, Input, Select, Upload, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { router } from "@inertiajs/react";

const PemeriksaanForm: React.FC<{
    form: any;
    // record: any;
}> = ({ form }) => {
    const formItemLayout = {
        wrapperCol: { span: 24 },
    };
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: any) => {
        messageApi.open({
            // key: saveKey,
            content: "Sedang menambahkan data...",
            type: "loading",
        });
        try {
            router.post(route("maintenance.inspect.ipds.store"), values, {
                onSuccess: (responsePage) => {
                    const response: any = responsePage.props.response;
                    console.log({ response });
                    if (response.errors?.length > 1) {
                        return messageApi.open({
                            // key: saveKey,
                            content: response.errors,
                            type: "error",
                        });
                    }
                    messageApi.open({
                        // key: saveKey,
                        content: "Berhasil menambahkan data",
                        type: "success",
                    });

                    return 1;
                },
            });
        } catch (error: any) {
            messageApi.open({
                // key: saveKey,
                content: error.message,
                type: "error",
            });
            return 0;
        }
    };
    const [showSolution, setShowSolution] = useState(false);
    return (
        <>
            <Form
                form={form}
                name="HistoryBarangForm"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                {contextHolder}

                <Form.Item
                    {...formItemLayout}
                    label="sequence_id"
                    name="sequence_id"
                    // style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="barang_id"
                    name="barang_id"
                    style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="users_id"
                    name="users_id"
                    // style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="merk"
                    name="merk"
                    // style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="tipe"
                    name="tipe"
                    // style={{ display: "none" }}
                >
                    <Input disabled={true} style={{ color: "#000" }} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Permasalahan yang Ditemukan"
                    name="problems"
                    rules={[
                        {
                            required: true,
                            message: "Silahkan isi Uraian Permasalahan ",
                        },
                    ]} // style={{ display: "none" }}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Tindak Lanjut"
                    name="next_step"
                    rules={[
                        {
                            required: true,
                            message: "Silahkan isi Tindak Lanjut",
                        },
                    ]}
                    // style={{ display: "none" }}
                >
                    <Select
                        onChange={() => {
                            let nextValue = form.getFieldValue("next_step");
                            if (nextValue === "0") {
                                setShowSolution(true);
                            } else {
                                setShowSolution(false);
                            }
                        }}
                        options={[
                            {
                                value: "0",
                                label: (
                                    <span>Diiperbaiki langsung Oleh IPDS</span>
                                ),
                            },
                            // {
                            //     value: "1",
                            //     label: (
                            //         <span>
                            //             Tidak memungkinkan untuk Diperbaiki
                            //         </span>
                            //     ),
                            // },
                            {
                                value: "2",
                                label: (
                                    <span>
                                        Diteruskan untuk Dilakukan Pemeliharaan
                                    </span>
                                ),
                            },
                        ]}
                    />
                </Form.Item>

                {showSolution && (
                    <Form.Item
                        label="Solusi yang Diterapkan"
                        name="solution"
                        id="solution"
                    >
                        <Input.TextArea />
                    </Form.Item>
                )}
            </Form>
        </>
    );
};

export default PemeriksaanForm;
