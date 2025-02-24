import RupiahInput from "@/Components/RupiahInput";
import { Form, Input, InputNumber, Space, Table, TableColumnsType } from "antd";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

const NonMakananTable = ({
    dataSource,
    id_ruta,
}: {
    dataSource: any[];
    id_ruta: string;
}) => {
    //    console.log({id_ruta});

    const [save, setSave] = useState("Belum ada perubahan");
    const [form] = Form.useForm();
    const columns: TableColumnsType<any> | undefined = [
        { title: "No.", dataIndex: "nomor_urut", key: "nomor_urut" },
        {
            title: "Nama Komoditas",
            dataIndex: "nama_komoditas",
            key: "nama_komoditas",
        },
        {
            title: "Nilai Konsumsi (Rp)",
            dataIndex: "nilai",
            key: "nilai",
            render: (value: any, record: any) => (
                <RupiahInput
                    inputName={`${record.id}-harga`}
                    onChange={(value) => {
                        if (value && value >= 10000000) {
                            form.setFields([
                                {
                                    name: `${record.id}-harga`,
                                    warnings: [
                                        "Harga diatas batas wajar Rp 10.000.000",
                                    ],
                                },
                            ]);
                        } else {
                            form.setFields([
                                {
                                    name: `${record.id}-harga`,
                                    warnings: [],
                                },
                            ]);
                        }
                    }}
                />
            ),
        },
    ];
    const storeData = debounce(async (values: any, id_ruta: string) => {
        try {
            setSave("sedang menyimpan perubahan");

            const id_komoditas = Object.keys(values)[0].split("-")[0];
            const harga = Object.values(values)[0];
            const formData = {
                id_ruta,
                id_komoditas: id_komoditas,
                harga: harga,
            };

            const response = await axios.post(
                route("api.non_mak.konsumsi.store"),
                formData
            );
            setSave("perubahan tersimpan");
        } catch (error) {
            setSave("error ketika menyimpan data");
            console.log("error when saving data", error);
        }
    }, 1000);
    async function loadData(id_ruta: string) {
        try {
            const { data } = await axios.get(
                route("api.non_mak.konsumsi.fetch", { id_ruta })
            );
            const newDataSource = [...dataSource];
            data.forEach((element: any) => {
                const nameField = `${element.id_komoditas}-harga`;
                form.setFieldValue(nameField, element.harga);
                if (element.harga && element.harga >= 10000000) {
                    form.setFields([
                        {
                            name: `${element.id_komoditas}-harga`,
                            warnings: [
                                "Harga diatas batas wajar Rp 10.000.000",
                            ],
                        },
                    ]);
                } else {
                    form.setFields([
                        {
                            name: `${element.id_komoditas}-harga`,
                            warnings: [],
                        },
                    ]);
                }
            });
        } catch (error) {
            console.log("error when loading data", error);
        } finally {
        }
    }
    useEffect(() => {
        loadData(id_ruta);
    }, [dataSource])

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {save}
            <Form
                form={form}
                onValuesChange={(values: any) => storeData(values, id_ruta)}
            >
                <Table pagination={{position:["topLeft"]}} dataSource={dataSource} columns={columns}></Table>
            </Form>
        </Space>
    );
};

export default NonMakananTable;
