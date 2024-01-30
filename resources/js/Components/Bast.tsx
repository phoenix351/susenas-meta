import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { BastType } from "@/types";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
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

const Bast: React.FC<{ data: BastType[]; barang_id: number }> = ({
    data,
    barang_id,
}) => {
    const [searchText, setSearchText] = useState("");
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolders] = message.useMessage();
    const [dataBast, setDataBast] = useState<BastType[]>([]);
    const key = "updatable";

    const onFinish = async (values: any) => {
        console.log("submit....");

        values["file"] = values["file"]["file"]["originFileObj"];
        router.post(route("bast.upload"), (data = values), {
            onStart: () => {
                messageApi.open({
                    key,
                    type: "loading",
                    content: "Mengunggah BAST",
                });
            },
            onSuccess: async () => {
                const response = await axios.get(route("bast"), {
                    params: {
                        barang_id: barang_id,
                    },
                });
                setDataBast(response.data[0]);
                messageApi.open({
                    key,
                    type: "success",
                    content: "BAST berhasil diunggah",
                    duration: 2,
                });
                setFileList([]);
            },
            onError: (errors) => {
                console.error({ errors });
                messageApi.open({
                    key,
                    type: "error",
                    content: "Terjadi error",
                    duration: 2,
                });
            },
        });
    };
    useEffect(() => {
        setDataBast(data);
    }, []);

    const handleFileChange = (info: any) => {
        console.log("====================================");
        console.log({ len: info.fileList.length });
        console.log("====================================");
        if (info.fileList.length === 0) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>");
            setFileList([]);
            return;
        }

        form.setFieldValue("barang_id", barang_id);
        form.setFieldValue("file", info.fileList[0].originalFileObj);
        const isValid = form.Validate();

        // console.log("submti");
    };
    const defaultColumns: ColumnsType<BastType> = [
        // {
        //     title: "id",
        //     dataIndex: "id",
        // },
        {
            title: "barang_id",
            dataIndex: "barang_id",
        },
        {
            title: "uploaded_date",
            dataIndex: "uploaded_date",
        },
        {
            title: "is_approved",
            dataIndex: "is_approved",
        },

        {
            title: "approval_date",
            dataIndex: "approval_date",
        },
        {
            title: "path",
            dataIndex: "path",
            render: (value: any) => (
                <a href={route("file.show", { filepath: value })}>
                    Lihat Dokumen
                </a>
            ),
        },
        {
            title: "comment",
            dataIndex: "comment",
        },
    ];
    return (
        <>
            {contextHolders}
            <Table
                rowClassName={() => "editable-row"}
                scroll={{ x: 300 }}
                bordered
                dataSource={dataBast.filter((item) =>
                    Object.values(item)
                        .join("")
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                )}
                columns={defaultColumns}
            />
            <Form form={form} onFinish={onFinish} {...layout}>
                <Form.Item name="file" label="" rules={rules}>
                    <Upload.Dragger
                        fileList={fileList}
                        onChange={handleFileChange}
                        multiple={false}
                        beforeUpload={() => false}
                        style={{ alignItems: "center" }}
                    >
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Only for a single upload.
                        </p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item
                    initialValue={barang_id}
                    name="barang_id"
                    style={{ display: "none" }}
                >
                    <Input />
                </Form.Item>
            </Form>
        </>
    );
};

export default Bast;
