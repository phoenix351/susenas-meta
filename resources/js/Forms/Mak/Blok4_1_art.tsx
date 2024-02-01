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

const Blok4_1_art: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    // record: any;
}> = ({ form, onFinish, tabContentStyle }) => {
    const formItemLayout = {
        // wrapperCol: { span: 24 },
    };
    const [messageApi, contextHolder] = message.useMessage();
    const [daftarProv, setDaftarProv] = useState([]);
    const [daftarKabKot, setDaftarKabKot] = useState([]);
    const [daftarSemester, setDaftarSemester] = useState([]);
    const [daftarNks, setDaftarNks] = useState([]);

    const [kabkotDisable, setKabkotDisable] = useState(true);
    const [semesterDisable, setSemesterDisable] = useState(true);
    const [nksDisable, setNksDisable] = useState(true);

    const fetchProvinsi = async () => {
        const url = route("api.entri.provinsi");

        const { data } = await axios.get(url);

        const daftarProvinsi = data.data.map((item: any) => ({
            label: `[${item.kode}] ${item.nama}`,
            value: item.kode,
        }));
        setDaftarProv(daftarProvinsi);
    };

    const fetchKabkot = async () => {
        const url = route("api.entri.kabkot");

        const { data } = await axios.get(url);
        const daftarKabkot = data.data.map((item: any) => ({
            label: `[${item.kode}] ${item.nama}`,
            value: item.kode,
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
    const fetchNks = async () =>
        // kodeProv: string,
        // kodeKabkot: string,
        // semester: string
        {
            const url = route("api.entri.nks", {
                kodeKabkot: form.getFieldValue("kode_kab"),
                semester: form.getFieldValue("semester"),
            });

            const { data } = await axios.get(url);
            // console.log("====================================");
            // console.log(url);
            // console.log("====================================");
            const daftarNks = data.data.map((item: any) => ({
                label: item.kode_nks,
                value: item.kode_nks,
            }));
            setDaftarNks(daftarNks);
        };
    useEffect(() => {
        try {
            fetchProvinsi();
            fetchKabkot();
            // fetchSemester();
        } catch (error) {}
    }, []);

    return (
        <Space style={tabContentStyle}>
            <Form
                form={form}
                name="Blok4_1_art"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                style={{ width: "300px" }}
            >
                {contextHolder}
                {/* <Space direction="horizontal"> */}
                <Form.Item name="kode_prov" label="Provinsi">
                    <Select
                        options={daftarProv}
                        onChange={() => setKabkotDisable(false)}
                    />
                </Form.Item>
                <Form.Item name="kode_kab" label="Kab/Kota">
                    <Select
                        options={daftarKabKot}
                        disabled={kabkotDisable}
                        onChange={() => setSemesterDisable(false)}
                    />
                </Form.Item>
                {/* </Space> */}
                <Form.Item name="semester" label="semester">
                    <Select
                        disabled={semesterDisable}
                        options={[
                            { label: "Semester I", value: "1" },
                            { label: "Semester II", value: "2" },
                        ]}
                        onChange={() => {
                            setNksDisable(false);
                            fetchNks();
                        }}
                    />
                </Form.Item>
                <Form.Item name="nks" label="NKS">
                    <Select options={daftarNks} disabled={nksDisable} />
                </Form.Item>
                <Button type="primary" onClick={() => form.submit()}>
                    Refresh
                </Button>
            </Form>
        </Space>
    );
};

export default Blok4_1_art;
