import { Form, FormInstance, Input, InputNumber, Select } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";
function rupiahFormatter(value: number | undefined) {
    if (value === undefined || value === null) return "";
    const formattedValue = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(Number(value));
    return `Rp ${formattedValue}`; // Adds thousands separator
}
function rupiahParser(value: string | undefined) {
    if (!value) return 0;
    return Number(value.replace(/Rp\s?|\.|[^0-9,]/g, "").replace(",", "."));
}
const UpdateForm = ({
    form,
    onFinish,
}: {
    form: FormInstance;
    onFinish: (values: FormData) => void;
}) => {
    const [daftarKabkot, setDaftarKabkot] = useState([]);
    const [rangeStatus, setRangeStatus] = useState<ValidateStatus>("");
    function periksaMinMaks() {
        const min = form.getFieldValue("min");
        const max = form.getFieldValue("max");
        let errorMessage = "";
        if (min > max) {
            errorMessage = "Harga minimum tidak boleh melebihi harga maksimum";
            setRangeStatus("error");
            form.setFields([
                {
                    name: "min",
                    errors: [errorMessage],
                },
            ]);
            form.setFields([
                {
                    name: "max",
                    errors: [errorMessage],
                },
            ]);
        } else {
            form.setFields([
                {
                    name: "min",
                    errors: [],
                },
            ]);
            form.setFields([
                {
                    name: "max",
                    errors: [],
                },
            ]);
            setRangeStatus("success");
        }
    }

    useEffect(() => {
        async function getDaftarKabkot() {
            try {
                const { data } = await axios.get(route("api.wilayah.kabkot"));
                const newDaftarKabkot = data.data.map((kabkot: any) => ({
                    label: `[${kabkot.kode_kabkot}] ${kabkot.kabkot}`,
                    value: kabkot.kode_kabkot,
                }));
                setDaftarKabkot(newDaftarKabkot);
            } catch (error) {
                console.error(error);
                console.error("error fetch daftar kabkot");
            }
        }
        getDaftarKabkot();
    }, []);

    return (
        <Form
            form={form}
            layout="vertical"
            onFieldsChange={periksaMinMaks}
            onFinish={onFinish}
        >
            <Form.Item name={"kode_kabkot"} label={"kode_kabkot"}>
                <Select options={daftarKabkot} disabled />
            </Form.Item>
            <Form.Item name={"nama_kelompok"} label={"nama_kelompok"}>
                <Input readOnly />
            </Form.Item>
            <Form.Item name={"id_komoditas"} label={"Kode Komoditas"}>
                <Select options={daftarKabkot} disabled />
            </Form.Item>
            <Form.Item name={"nama_komoditas"} label={"nama_komoditas"}>
                <Input readOnly />
            </Form.Item>

            <Form.Item
                name={"min"}
                label={"Harga Minimum"}
                rules={[{ required: true }]}
                validateStatus={rangeStatus}
            >
                <InputNumber
                    style={{ display: "inline-block", width: "100%" }}
                    formatter={rupiahFormatter}
                    parser={rupiahParser}
                />
            </Form.Item>
            <Form.Item
                name={"max"}
                label={"Harga Maksimum"}
                rules={[{ required: true }]}
                validateStatus={rangeStatus}
            >
                <InputNumber
                    style={{ display: "inline-block", width: "100%" }}
                    formatter={rupiahFormatter}
                    parser={rupiahParser}
                />
            </Form.Item>
        </Form>
    );
};

export default UpdateForm;
