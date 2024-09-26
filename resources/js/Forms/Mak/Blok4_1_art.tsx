import {
    Button,
    Divider,
    Form,
    FormInstance,
    FormListFieldData,
    Image,
    Input,
    InputNumber,
    Popconfirm,
    Select,
    Space,
    Spin,
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
import { AnggotaRumahTangga, SubTotal } from "@/types";
import { router } from "@inertiajs/react";
import { throttle } from "lodash";

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
    margin: "auto",
    // backgroundColor: "red",
    textAlign: "center",
    padding: "5px",
};
// define forms
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
    const blok4_1_hal2Finish = (values: any) => {
        // console.log({ values });
    };

    // usestate

    const [activeKey, setActiveKey] = useState("0");
    const [items, setItems] = useState<any[]>([]);
    const [listKomoditas, setListKomoditas] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [artLoading, setArtLoading] = useState(false);

    const newTabIndex = useRef(1);
    // const [items, setItems] = useState(defaultItems);

    const [messageApi, contextHolder] = message.useMessage();
    const add = async () => {
        setArtLoading(true);
        const newActiveKey = `Art-${newTabIndex.current++}`;

        try {
            const { data } = await axios.post(route("entri.mak.art.store"), {
                nama: newActiveKey,
                nomor_art: daftarArt.length + 1, // Note: It's usually not recommended to modify the array length directly
                id_ruta: daftarArt[0].id_ruta,
            });
            // const { id_art } = data;
            // console.log({ data });

            const updatedDaftarArt = [
                ...daftarArt,
                {
                    id: data.id,
                    id_ruta: data.id_ruta,
                    nomor_art: newTabIndex.current++,
                    nama: newActiveKey,
                    key: newActiveKey,
                    rekap: {
                        12: { produksi: 0, beli: 0, total: 0 },
                        13: { produksi: 0, beli: 0, total: 0 },
                    },
                },
            ];
            // console.log({ updatedDaftarArt });
            setDaftarArt([...updatedDaftarArt]);
            // Do any synchronous operations relying on the updatedDaftarArt here

            setActiveKey(newActiveKey);
        } catch (error) {
            console.error("Error in add function:", error);
        } finally {
            setArtLoading(false);
        }
    };
    const remove = async (index: number) => {
        const id_art = artForm.getFieldValue(`${index}-id_art`);
        if (index === 0) {
            messageApi.open({
                content: `anggota ruta pertama tidak boleh dihapus,`,
                type: "warning",
                key: id_art,
                duration: 3,
            });
            return;
        }

        // messageApi.open({
        //     content: "menghapus anggota rumah tangga...",
        //     type: "loading",
        //     key: id_art,
        // });
        try {
            // console.log({ id_art });

            const { data } = await axios.delete(
                route("entri.mak.art.delete", { id_art: id_art })
            );

            const updatedDaftarArt = daftarArt.filter(
                (art: AnggotaRumahTangga) => art.id !== id_art
            );

            setDaftarArt(updatedDaftarArt);
            messageApi.open({
                content: "Berhasil menghapus 1 anggota rumah tangga",
                type: "success",
                key: id_art,
            });

            // Do any synchronous operations relying on the updatedDaftarArt here
        } catch (error) {
            console.error("Error in add function:", error);
            messageApi.open({
                content: `Terjadi galat ketika menghapus data, tunjukan code ini pada Developer (${error})`,
                type: "error",
                key: id_art,
                duration: 3,
            });
        }
    };

    const handleCellEdit = (index: number, key: string, value: any) => {
        const updatedArts = [...daftarArt];
        // console.log({ value });

        updatedArts[index][key] = value.trim();
        setDaftarArt(updatedArts);
    };

    const debounceCellEdit = _debounce(handleCellEdit, 1000);
    const debounceCellDelete = throttle(remove, 2000);

    // generate art components

    useEffect(() => {
        const fetchKomoditasList = async (from: number, to: number) => {
            // setLoading(true);
            const { data } = await axios.get(
                route("api.mak.komoditas.list", { from: from, to: to })
            );
            const konten = data.map((item: any) => ({
                nomor: item.id,
                kode_coicop: item.kode_coicop,
                rincian: item.nama_komoditas,
                satuan: item.satuan,
                type: item.type,
                subKey: item.id_kelompok,
                // subKey: item.id_kelompok == 13 ? 1 : 0,
                flagBasket: item.flag_basket,
            }));
            // console.log({ konten });
            setListKomoditas([...konten]);
        };
        fetchKomoditasList(159, 197);
        setLoading(false);
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
                    art={art}
                    id_art={art.id}
                    calculateKalori={calculateKalori}
                    konten={listKomoditas}
                />
            ),
        }));
        setItems([...items]);
    }, []);

    return (
        <Space direction="vertical" style={tabContentStyle}>
            {contextHolder}
            <Button type="primary" onClick={add}>
                Tambah Art
            </Button>

            <Form name="artForm" form={artForm} onFinish={artFormFinish}>
                <Form.Item name={`id_ruta`} hidden>
                    <Input />
                </Form.Item>
                {
                    <Blok
                        title="DAFTAR ANGGOTA RUMAH TANGGA"
                        columns={["Nomor", "Nama Anggota Rumah Tangga", "aksi"]}
                        columnsCount={3}
                    >
                        {artLoading ? (
                            <tr>
                                <td colSpan={3}>
                                    <Space
                                        style={{
                                            width: "100%",
                                            justifyContent: "center",
                                            // backgroundColor: "red",
                                            marginTop: "30px",
                                        }}
                                        direction="vertical"
                                    >
                                        <Space
                                            style={{
                                                width: "100%",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Spin size="large" />
                                        </Space>
                                        <Space
                                            style={{
                                                width: "100%",
                                                justifyContent: "center",
                                            }}
                                        >
                                            Menambahkan anggota rumah tangga...
                                        </Space>
                                    </Space>
                                </td>
                            </tr>
                        ) : (
                            daftarArt.map((art: any, index: number) => (
                                <tr key={index}>
                                    <td style={centerCell}>{index + 1}</td>
                                    <td style={centerCell}>
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
                                            hidden
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={`${index}-nama`}
                                            style={{ margin: "auto" }}
                                        >
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
                                        <Popconfirm
                                            placement="topLeft"
                                            title="apakah anda yakin akan menghapus art ini?"
                                            description="hapus anggota rumah tangga"
                                            okText="yakin dong"
                                            cancelText="gajadi"
                                            onConfirm={() =>
                                                debounceCellDelete(index)
                                            }
                                        >
                                            <Button disabled={index === 0}>
                                                Hapus
                                            </Button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            ))
                        )}
                    </Blok>
                }
            </Form>
            <Tabs
                style={{ backgroundColor: "#fff", padding: "10px" }}
                items={daftarArt.map((art: any, index: number) => ({
                    label: art.nama,
                    key: String(index),
                    children: (
                        <Art
                            onFinish={blok4_1_hal2Finish}
                            nomor_art={art.nomor_art}
                            daftarArt={daftarArt}
                            setDaftarArt={setDaftarArt}
                            id_ruta={art.id_ruta}
                            art={art}
                            id_art={art.id}
                            calculateKalori={calculateKalori}
                            konten={listKomoditas}
                        />
                    ),
                }))}
                type="line"
            />
        </Space>
    );
};

export default Blok4_1;
