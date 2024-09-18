import {
    Button,
    Form,
    FormInstance,
    InputRef,
    RefSelectProps,
    Select,
    message,
} from "antd";
import { Ref, useEffect, useRef, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "axios";

const EntriIntiForm: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    setDataSource: (data: any) => void;
    // record: any;
}> = ({ form, onFinish, setDataSource }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const daftarProv: {}[] = [{ label: "[71] SULAWESI UTARA", value: "71" }];
    const [daftarKabKot, setDaftarKabKot] = useState([]);
    const [kabkotDisable, setKabkotDisable] = useState(true);
    const [daftarNks, setDaftarNks] = useState([]);

    const fetchKabkot = async () => {
        const url = route("api.entri.kabkot");

        const { data } = await axios.get(url);
        console.log({ data });

        const daftarKabkot = data.data.map((item: any) => ({
            label: `[${item.kode_kabkot}] ${item.kabkot}`,
            value: item.kode_kabkot,
        }));
        if (data.kode_kabkot === "00") {
            setKabkotDisable(false);
        } else {
            form.setFieldValue("kode_kabkot", data.kode_kabkot);
        }
        fetchNks();
        setDaftarKabKot(daftarKabkot);
    };
    const fetchNks = async () =>
        // kodeProv: string,
        // kodeKabkot: string,
        // semester: string
        {
            const url = route("api.entri.nks", {
                kodeKabkot: form.getFieldValue("kode_kabkot"),
                semester: form.getFieldValue("semester"),
            });

            const { data } = await axios.get(url);
            // console.log({});

            const daftarNks = data.map((item: any) => ({
                label: item,
                value: item,
            }));
            setDaftarNks(daftarNks);
        };
    useEffect(() => {
        try {
            // console.log("sss");

            fetchKabkot();
            // fetchNks();
            form.setFieldValue("kode_prov", "71");
            form.setFieldValue("semester", "2");

            // fetchSemester();
        } catch (error) {
            console.log({ error });
        }
    }, []);

    return (
        <>
            <Form
                form={form}
                name="EntriIntiForm"
                onFinish={onFinish}
                autoComplete="off"
                // layout="vertical"
                style={{ width: "300px" }}
            >
                {contextHolder}
                {/* <Space direction="horizontal"> */}
                <Form.Item name="kode_prov" label="Provinsi">
                    <Select
                        allowClear
                        showSearch
                        disabled
                        optionFilterProp="label"
                        options={daftarProv}
                        onClear={() => {}}
                        onChange={() => {
                            form.setFieldsValue({
                                kode_kabkot: "",
                                nks: "",
                            });
                            setDataSource([]);

                            setDaftarNks([]);
                        }}
                    />
                </Form.Item>
                <Form.Item name="semester" label="semester">
                    <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        // disabled={semesterDisable}
                        options={[
                            // { label: "Semester I", value: "1",},
                            { label: "Semester II", value: "2" },
                        ]}
                        disabled
                    />
                </Form.Item>
                <Form.Item name="kode_kabkot" label="Kab/Kota">
                    <Select
                        allowClear
                        showSearch
                        disabled={kabkotDisable}
                        optionFilterProp="label"
                        options={daftarKabKot}
                        // disabled={kabkotDisable}
                        onChange={() => {
                            form.setFieldsValue({
                                nks: "",
                            });

                            setDataSource([]);
                            setDaftarNks([]);
                            fetchNks();
                        }}
                    />
                </Form.Item>

                <Form.Item name="nks" label="NKS">
                    <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        options={daftarNks}
                        onChange={() => {
                            fetchNks();
                            form.submit();
                        }}
                    />
                </Form.Item>

                <Button type="primary" onClick={() => form.submit()}>
                    <ReloadOutlined /> Refresh
                </Button>
            </Form>
        </>
    );
};

export default EntriIntiForm;
