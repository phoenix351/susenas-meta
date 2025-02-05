import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Space, Upload } from "antd";
import axios from "axios";
import { useState } from "react";

const handeDownload = async () => {};
const handleUpload = async (values: any) => {
    // console.log({ response });
    const response = await axios.post(route("range_harga.upload"), values, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

const UpdateRangeHarga = () => {
    const [form] = Form.useForm();
    return (
        <>
            <Divider />
            <Space direction="vertical">
                <Button icon={<DownloadOutlined />}>Download Template</Button>
                <Form>
                    <Upload action={route("range_harga.upload")} name="file">
                        <Button icon={<UploadOutlined />}>
                            Upload Template
                        </Button>
                    </Upload>
                </Form>
            </Space>
        </>
    );
};

export default UpdateRangeHarga;
