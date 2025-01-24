import { Form, FormInstance, Input, Segmented, Select, Switch } from "antd";

import kelompokKomoditas from "./kelompokKomoditas.json";
import { useEffect, useState } from "react";
import { KomoditasDataType } from "@/types";
import { SegmentedValue } from "antd/es/segmented";
const KomoditasForm = ({
    form,
    daftarKomoditas,
    onFinish,
    flag,
    SwitchFlag,
}: {
    form: FormInstance;
    daftarKomoditas?: KomoditasDataType[];
    onFinish: (values: KomoditasDataType) => void;
    flag: boolean;
    SwitchFlag: () => void;
}) => {
    const [showKomoditas, setShowKomoditas] = useState(false);
    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
            onFinish={onFinish}
        >
            <Form.Item name={"id"} label="id" hidden>
                <Input />
            </Form.Item>
            <Form.Item name={"nama_komoditas"} label="nama_komoditas">
                <Input />
            </Form.Item>
            <Form.Item name={"id_kelompok"} label="Kelompok Komoditas">
                <Select
                    options={kelompokKomoditas.map((kelompok) => ({
                        value: Number(kelompok.id_kelompok),
                        label: kelompok.nama_kelompok,
                    }))}
                    onChange={(value) => {
                        // console.log(value);
                        const nama_kelompok =
                            kelompokKomoditas[value].nama_kelompok;
                        form.setFieldValue("nama_kelompok", nama_kelompok);
                        const tipe = form.getFieldValue("type");
                        if (tipe === "sub") {
                            form.setFieldValue("nama_komoditas", nama_kelompok);
                        }
                    }}
                />
            </Form.Item>
            <Form.Item name={"nama_kelompok"} label="nama_kelompok" hidden>
                <Input />
            </Form.Item>
            <Form.Item name={"satuan"} label="satuan">
                <Input />
            </Form.Item>
            <Form.Item name={"kalori"} label="kalori">
                <Input />
            </Form.Item>
            <Form.Item name={"flag_basket"} label="flag_basket">
                <Switch
                    checked={flag}
                    onClick={() => {
                        SwitchFlag();
                    }}
                />
            </Form.Item>
            <Form.Item name={"type"} label="type">
                <Select
                    options={[
                        { label: "sub", value: "sub" },
                        { label: "standar", value: "standar" },
                    ]}
                />
            </Form.Item>
            {daftarKomoditas ? (
                <>
                    <Form.Item
                        name={"posisi_komoditas"}
                        label="Posisi Komoditas"
                        initialValue={"Akhir"}
                    >
                        <Segmented
                            options={["Awal", "Akhir", "Setelah"]}
                            onChange={(value: SegmentedValue) => {
                                if (value === "Setelah") {
                                    setShowKomoditas(true);
                                    return;
                                }
                                setShowKomoditas(false);
                            }}
                        />
                    </Form.Item>
                    {showKomoditas ? (
                        <Form.Item name={"after_id"} wrapperCol={{ offset: 8 }}>
                            <Select
                                options={daftarKomoditas.map((komoditas) => ({
                                    label: `${komoditas.nomor_urut}. ${komoditas.nama_komoditas}`,
                                    value: komoditas.id,
                                }))}
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
        </Form>
    );
};

export default KomoditasForm;
