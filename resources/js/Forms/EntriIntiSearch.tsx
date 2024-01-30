import {
    Button,
    Divider,
    Form,
    Input,
    Select,
    Space,
    Upload,
    message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const EntriIntiForm: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    // record: any;
}> = ({ form, onFinish }) => {
    const formItemLayout = {
        // wrapperCol: { span: 24 },
    };
    const [messageApi, contextHolder] = message.useMessage();
    const [daftarProv, setDaftarProv] = useState([]);
    const [daftarKabKot, setDaftarKabKot] = useState([]);
    const [daftarSemester, setDaftarSemester] = useState([]);
    const [daftarNks, setDaftarNks] = useState([]);
    const fetchProvinsi = async () => {
        const url = route("api.entri.provinsi");

        const { data } = await axios.get(url);
        const daftarProvinsi = data.map((item: any) => ({
            label: item.label,
            value: item.value,
        }));
        setDaftarProv(daftarProvinsi);
    };

    const fetchKabkot = async () => {
        const url = route("api.entri.kabkot");

        const { data } = await axios.get(url);
        const daftarKabkot = data.map((item: any) => ({
            label: item.label,
            value: item.value,
        }));
        setDaftarKabKot(daftarKabkot);
    };
    const fetchSemester = async () => {
        const url = route("api.entri.semester");

        const { data } = await axios.get(url);
        const daftarKabkot = data.map((item: any) => ({
            label: item.label,
            value: item.value,
        }));
        setDaftarKabKot(daftarKabkot);
    };
    const fetchNks = async (
        kodeProv: string,
        kodeKabkot: string,
        semester: string
    ) => {
        const url = route("api.entri.nks", {
            kodeKabkot: kodeKabkot,
            kodeProv: kodeProv,
            semester: semester,
        });

        const { data } = await axios.get(url);
        const daftarNks = data.map((item: any) => ({
            label: item.label,
            value: item.value,
        }));
        setDaftarNks(daftarNks);
    };
    useEffect(() => {
        try {
            fetchProvinsi();
            fetchKabkot();
            fetchSemester();
        } catch (error) {}
    }, []);

    return (
        <>
            <Form
                form={form}
                name="EntriIntiForm"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                style={{ width: "500px" }}
            >
                {contextHolder}
                {/* <Space direction="horizontal"> */}
                <Form.Item name="provinsi" label="Provinsi">
                    <Select options={daftarProv} />
                </Form.Item>
                <Form.Item name="kabKot" label="Kab/Kota">
                    <Select options={daftarKabKot} />
                </Form.Item>
                {/* </Space> */}
                <Form.Item name="semester" label="semester">
                    <Select
                        options={[
                            { label: "Semester I", value: "1" },
                            { label: "Semester II", value: "2" },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="nks" label="NKS">
                    <Select options={daftarNks} />
                </Form.Item>
                <Button type="primary" onClick={() => form.submit()}>
                    Refresh
                </Button>
            </Form>
        </>
    );
};

export default EntriIntiForm;
