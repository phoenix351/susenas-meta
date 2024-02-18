import {
    Button,
    Divider,
    Form,
    FormInstance,
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

const { Text, Title } = Typography;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

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

    // record: any;
}> = ({
    form,
    onFinish,
    artForm,
    artFormFinish,
    tabContentStyle,
    rekapArt,
    setRekapArt,
    daftarArt,
    setDaftarArt,
}) => {
    const formItemLayout = {
        // wrapperCol: { span: 24 },
    };
    const [asu, setAsu] = useState([]);
    const imageProps = {
        width: "70px",
        height: "auto",
        preview: false,
    };
    const tableStyle: React.CSSProperties = {
        borderCollapse: "collapse",
        width: "100%",
    };
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
    const formItemStyle = {
        margin: "auto",
        padding: "5px",
    };
    // konstanta
    const daftarKlas: any[] | undefined = [
        { label: "Desa", value: "1" },
        { label: "Kelurahan", value: "2" },
    ];
    // define forms
    const blok4_1_hal2Finish = (values: any) => {
        console.log({ values });
    };

    const [activeKey, setActiveKey] = useState("0");
    const newTabIndex = useRef(1);
    // const [items, setItems] = useState(defaultItems);

    const [messageApi, contextHolder] = message.useMessage();

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    const add = () => {
        const newActiveKey = `Art-${newTabIndex.current++}`;

        setActiveKey(newActiveKey);

        setDaftarArt((currentDaftarArt: any) => [
            ...currentDaftarArt,
            {
                id_art: "",
                id_ruta: "",
                nama: newActiveKey,
                key: newActiveKey,
                rekap: [
                    { produksi: 0, beli: 0, total: 0 },
                    { produksi: 0, beli: 0, total: 0 },
                ],
            },
        ]);
    };

    const handleCellEdit = (index: number, key: string, value: any) => {
        const updatedArts = [...daftarArt];
        // console.log({ value });

        updatedArts[index][key] = value.trim();
        setDaftarArt(updatedArts);
    };
    const handleCellDelete = (nomor_art: number) => {
        const updatedArts = [...daftarArt];
        // console.log({ value });

        setDaftarArt(updatedArts);
    };
    const debounceCellEdit = _debounce(handleCellEdit, 1000);
    const debounceCellDelete = _debounce(handleCellDelete, 1000);

    const handleCellBlur = (index: number) => {
        const updatedArts = [...daftarArt];
        updatedArts[index] = { ...daftarArt[index] };
        // Save the changes back to the original arts array
        // You might want to perform validation or additional checks here
        setDaftarArt(updatedArts);
    };

    // generate art components
    const items = daftarArt.map((art: any, index: number) => ({
        label: art.nama,
        key: String(index),
        children: (
            <Art
                onFinish={blok4_1_hal2Finish}
                artKey={art.key}
                daftarArt={daftarArt}
                setDaftarArt={setDaftarArt}
                id_ruta={artForm.getFieldValue("id_ruta")}
                id_art={art.id}
            />
        ),
    }));

    return (
        <Space direction="vertical">
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
                                    onClick={() =>
                                        debounceCellDelete(art.nomor)
                                    }
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
