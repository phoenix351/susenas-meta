import { Form, FormInstance, Input } from "antd";
import React from "react";

const KomoditasForm = ({
    form,
    onFinish,
}: {
    form: FormInstance;
    onFinish: (values: FormData) => void;
}) => {
    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
            onFinish={onFinish}
        >
            <Form.Item name={"id"} label="id">
                <Input />
            </Form.Item>
            <Form.Item name={"id_kelompok"} label="id_kelompok">
                <Input />
            </Form.Item>
            <Form.Item name={"nama_kelompok"} label="nama_kelompok">
                <Input />
            </Form.Item>
            <Form.Item name={"satuan"} label="satuan">
                <Input />
            </Form.Item>
            <Form.Item name={"kalori"} label="kalori">
                <Input />
            </Form.Item>
            <Form.Item name={"flag_basket"} label="flag_basket">
                <Input />
            </Form.Item>
            <Form.Item name={"type"} label="type">
                <Input />
            </Form.Item>
        </Form>
    );
};

export default KomoditasForm;
