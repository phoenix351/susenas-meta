import {
    Button,
    Divider,
    Form,
    Input,
    Radio,
    Select,
    Upload,
    message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { router } from "@inertiajs/react";
import RupiahInput from "@/Components/RupiahInput";

const EditStatusForm: React.FC<{
    form: any;
    // defaultPreview: string | null;
}> = ({ form }) => {
    const formItemLayout = {
        wrapperCol: { span: 24 },
    };
    const [messageApi, contextHolder] = message.useMessage();
    const [statusList, setStatusList] = useState([]);
    const [kodeStatus, setKodeStatus] = useState("");
    const [value, setValue] = useState<number>(0);

    const handleChange = (newValue: number | undefined) => {
        if (newValue !== undefined) {
            setValue(newValue ? newValue : 0);
        }
        console.log({ value });
    };

    // define document ready
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(route("maintenance.status.fetch"));
            // implement kode status > current code not yet
            console.log(response);
            let statusList = response.data.data.map((item: any) => ({
                label: item.deskripsi,
                value: item.kode_status,
            }));
            setStatusList(statusList);
        }
        fetchData();
    }, []);

    const onFinish = async (values: any) => {
        const saveKey = "iniesta";
        // console.log({ values });
        // return 1;
        messageApi.open({
            key: saveKey,
            content: "Sedang mengirim formulir...",
            type: "loading",
        });

        try {
            const response = await axios.post(
                route("maintenance.status.update"),
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            messageApi.open({
                key: saveKey,
                content: "Berhasil menyimpan perubahan...",
                type: "success",
            });
        } catch (error: any) {
            // messageApi.open({
            //     key: saveKey,
            //     content: error.message,
            //     type: "error",
            // });
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const errorMessage =
                    error.response.data.error || "Unknown error";
                messageApi.open({
                    key: saveKey,
                    content: errorMessage,
                    type: "error",
                });
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something else happened while setting up the request
                console.error("Error setting up the request:", error.message);
            }
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
                    label="Pilih Status"
                    name="kode_status"

                    // style={{ display: "none" }}
                >
                    <Select
                        onChange={(value) => setKodeStatus(value)}
                        options={statusList}
                    />
                </Form.Item>
                {kodeStatus == "5" && (
                    <Form.Item
                        {...formItemLayout}
                        label="Biaya Perbaikan"
                        name="biaya"
                        // style={{ display: "none" }}
                    >
                        <RupiahInput value={value} onChange={handleChange} />
                    </Form.Item>
                )}
                {kodeStatus == "6" && (
                    <Form.Item
                        {...formItemLayout}
                        label="Status Pasca Pemeliharaan"
                        name="status"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Status Pasca Pemeliharaan harus diisi",
                            },
                        ]}
                        // style={{ display: "none" }}
                    >
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="1">Baik</Radio.Button>
                            <Radio.Button value="2">Rusak Ringan</Radio.Button>
                            <Radio.Button value="3">Rusak Berat</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                )}
            </Form>
        </>
    );
};

export default EditStatusForm;
