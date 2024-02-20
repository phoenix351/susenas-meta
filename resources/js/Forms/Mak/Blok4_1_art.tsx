import {
    Button,
    Divider,
    Form,
    FormInstance,
    FormListFieldData,
    Image,
    Input,
    InputNumber,
    Select,
    Space,
    Table,
    Tabs,
    Typography,
    message,
} from "antd";
import { useEffect, useRef, useState } from "react";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import _debounce from "lodash/debounce";

import Art from "./Art";
import Blok from "@/Components/Blok";
import { SubTotal } from "@/types";
import { router } from "@inertiajs/react";

const { Text, Title } = Typography;

const Blok4_1: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    artForm: FormInstance;
    artFormFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    rekapArt: any;
    setRekapArt: (value: any) => void;
    daftarArt: any;
    setDaftarArt: (value: any) => void;
    calculateKalori: (formValues: FormListFieldData) => Promise<number>;

    // record: any;
}> = ({
    artForm,
    artFormFinish,
    tabContentStyle,
    daftarArt,
    setDaftarArt,
    calculateKalori,
}) => {
    const cellStyle: React.CSSProperties = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        whiteSpace: "nowrap",

        padding: "5px",
    };
    const centerCell: React.CSSProperties = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        textAlign: "center",
        padding: "5px",
    };
    // konstanta
    // define forms
    const blok4_1_hal2Finish = (values: any) => {
        console.log({ values });
    };

    const [activeKey, setActiveKey] = useState("0");
    const [items, setItems] = useState<any[]>([]);
    const newTabIndex = useRef(1);
    // const [items, setItems] = useState(defaultItems);

    const [messageApi, contextHolder] = message.useMessage();
    const add = async () => {
        const newActiveKey = `Art-${newTabIndex.current++}`;

        try {
            const { data } = await axios.post(route("entri.mak.art.store"), {
                nama: newActiveKey,
                nomor_art: daftarArt.length + 1, // Note: It's usually not recommended to modify the array length directly
                id_ruta: daftarArt[0].id_ruta,
            });
            // const { id_art } = data;
            // console.log({ daftarArt });

            const updatedDaftarArt = [
                ...daftarArt,
                {
                    id_art: data.id,
                    id_ruta: daftarArt[0].id,
                    nomor_art: newTabIndex.current++,
                    nama: newActiveKey,
                    key: newActiveKey,
                    rekap: [
                        { produksi: 0, beli: 0, total: 0 },
                        { produksi: 0, beli: 0, total: 0 },
                    ],
                },
            ];
            console.log({ updatedDaftarArt });
            setDaftarArt(updatedDaftarArt);

            // Do any synchronous operations relying on the updatedDaftarArt here

            setActiveKey(newActiveKey);
        } catch (error) {
            console.error("Error in add function:", error);
        }
    };

    const handleCellEdit = (index: number, key: string, value: any) => {
        const updatedArts = [...daftarArt];
        // console.log({ value });

        updatedArts[index][key] = value.trim();
        setDaftarArt(updatedArts);
    };
    const handleCellDelete = (id_art: string) => {
        const updatedArts = [...daftarArt];
        // console.log({ value });

        setDaftarArt(updatedArts);
    };
    const debounceCellEdit = _debounce(handleCellEdit, 1000);
    const debounceCellDelete = _debounce(handleCellDelete, 1000);

    // generate art components
    useEffect(() => {
        // console.log({ daftarArt });

        const items = daftarArt.map((art: any, index: number) => ({
            label: art.nama,
            key: String(index),
            children: (
                <Art
                    onFinish={blok4_1_hal2Finish}
                    nomor_art={art.nomor_art}
                    daftarArt={daftarArt}
                    setDaftarArt={setDaftarArt}
                    id_ruta={artForm.getFieldValue("id_ruta")}
                    id_art={art.id}
                    calculateKalori={calculateKalori}
                />
            ),
        }));
        setItems([...items]);
    }, [daftarArt]);

    return (
        <Space direction="vertical" style={tabContentStyle}>
            <Button type="primary" onClick={add}>
                Tambah Art
            </Button>

            <Form name="artForm" form={artForm} onFinish={artFormFinish}>
                <Form.Item name={`id_ruta`} hidden>
                    <Input />
                </Form.Item>
                <Blok
                    title="DAFTAR ANGGOTA RUMAH TANGGA"
                    columns={["Nomor", "Nama Anggota Rumah Tangga", "aksi"]}
                    columnsCount={3}
                >
                    {daftarArt.map((art: any, index: number) => (
                        <tr key={index}>
                            <td style={centerCell}>{index + 1}</td>
                            <td style={cellStyle}>
                                {/* <Typography.Paragraph
                                editable={{
                                    onChange: (newContent) =>
                                        handleCellEdit(
                                            index,
                                            "nama",
                                            newContent
                                        ),
                                    onEnd: () => handleCellBlur(index),
                                }}
                            >
                                {art.nama}
                            </Typography.Paragraph> */}
                                <Form.Item
                                    name={`${index}-id_art`}
                                    style={{ display: "none" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item name={`${index}-nama`}>
                                    <Input
                                        placeholder="nama anggota rumah tangga"
                                        onChange={(event: any) =>
                                            debounceCellEdit(
                                                index,
                                                "nama",
                                                event.target.value
                                            )
                                        }
                                    />
                                </Form.Item>
                            </td>

                            <td style={centerCell}>
                                <Button
                                    onClick={() => debounceCellDelete(art.id)}
                                    disabled={index === 0}
                                >
                                    Hapus
                                </Button>
                            </td>
                        </tr>
                    ))}
                </Blok>
            </Form>
            <Tabs
                style={{ backgroundColor: "#fff", padding: "10px" }}
                items={items}
                type="line"
            />
        </Space>
    );
};

export default Blok4_1;
