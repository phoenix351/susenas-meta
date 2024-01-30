import { Button, Divider, Form, Input, Upload, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { router } from "@inertiajs/react";

const EditPemeliharaanForm: React.FC<{
    form: any;

    defaultPreview: string | null;
    // record: any;
}> = ({ form, defaultPreview }) => {
    const formItemLayout = {
        wrapperCol: { span: 24 },
    };
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState<
        string | ArrayBuffer | null
    >(defaultPreview);

    const handleChange = (info: any) => {
        // console.log({info})
        const { fileList } = info;

        const file = fileList.length > 0 ? fileList[0] : false;
        if (!file) {
            setFile(null);
            setPreviewImage(null);
            return false;
        }

        // console.log({file})
        if (file.originFileObj) {
            setFile(file);
            handlePreview(file);
        }
    };
    const handlePreview = async (file: any) => {
        console.log({ file });
        if (file.url) {
            setPreviewImage(file.url);
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file.originFileObj);
        }
    };
    const onFinish = (values: any) => {
        values.problem_img_path = values.problem_img_path
            ? values.problem_img_path.file
            : "";

        messageApi.open({
            // key: saveKey,
            content: "Sedang menambahkan data...",
            type: "loading",
        });

        try {
            router.post(route("maintenance.update"), values, {
                onSuccess: (responsePage) => {
                    const response: any = responsePage.props;
                    console.log({ response });
                    if (response.errors?.length > 1) {
                        messageApi.open({
                            // key: saveKey,
                            content: response.errors,
                            type: "error",
                        });
                        return false;
                    }
                    messageApi.open({
                        // key: saveKey,
                        content: "Berhasil menambahkan data",
                        type: "success",
                    });

                    return true;
                },
            });
        } catch (error: any) {
            messageApi.open({
                // key: saveKey,
                content: error.message,
                type: "error",
            });
            return false;
        }
    };
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
                    style={{ display: "none" }}
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
                    style={{ display: "none" }}
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
                    label="keluhan"
                    name="keluhan"
                    // style={{ display: "none" }}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Ubah tangkapan permasalahan (opsional)"
                    name="problem_img_path"
                >
                    <Upload
                        onChange={handleChange}
                        beforeUpload={() => false}
                        onPreview={handlePreview}
                        multiple={false}

                        // disabled={fileList.length > 0}
                    >
                        {file !== null ? (
                            ""
                        ) : (
                            <Button icon={<UploadOutlined />}>
                                Select File
                            </Button>
                        )}
                    </Upload>
                </Form.Item>
                preview
                {previewImage && (
                    <img
                        alt="Preview"
                        style={{ width: "100%", marginTop: "10px" }}
                        src={previewImage as string}
                    />
                )}
            </Form>
        </>
    );
};

export default EditPemeliharaanForm;
