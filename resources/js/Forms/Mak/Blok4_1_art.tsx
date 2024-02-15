import {
    Button,
    Divider,
    Form,
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

import Art from "./Art";
import Blok from "@/Components/Blok";
import { SubTotal } from "@/types";

const { Text, Title } = Typography;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const Blok4_1: React.FC<{
    form: any;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    rekapArt: any;
    setRekapArt: (value: any) => void;
    daftarArt: any;
    setDaftarArt: (value: any) => void;

    // record: any;
}> = ({
    form,
    onFinish,
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
    // const defaultItems = daftarArt.map(
    //     (
    //         art: {
    //             [x: string]: any;
    //             nama: any;
    //         },
    //         index: any
    //     ) => {
    //         return {
    //             label: art.nama,
    //             key: String(index),
    //             children: (
    //                 <Art
    //                     onFinish={blok4_1_hal2Finish}
    //                     artKey={art.artKey}
    //                     daftarArt={daftarArt}
    //                     setDaftarArt={setDaftarArt}
    //                 />
    //             ),
    //         };
    //     }
    // );
    // const defaultItems =

    const [activeKey, setActiveKey] = useState("0");
    const newTabIndex = useRef(1);
    // const [items, setItems] = useState(defaultItems);

    const [messageApi, contextHolder] = message.useMessage();

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    const add = () => {
        const newActiveKey = `Art-${newTabIndex.current++}`;
        // setItems([
        //     ...items,
        //     {
        //         label: newActiveKey,
        //         key: String(newActiveKey),
        //         children: (
        //             <Art
        //                 onFinish={blok4_1_hal2Finish}
        //                 artKey={newActiveKey}
        //                 daftarArt={asu}
        //                 setDaftarArt={setAsu}
        //             />
        //         ),
        //     },
        // ]);

        setActiveKey(newActiveKey);

        setDaftarArt((currentDaftarArt: any) => [
            ...currentDaftarArt,
            {
                nama: newActiveKey,
                key: newActiveKey,
                rekap: [
                    { produksi: 0, beli: 0, total: 0 },
                    { produksi: 0, beli: 0, total: 0 },
                ],
            },
        ]);
    };

    // const remove = (targetKey: TargetKey) => {
    //     const targetIndex = items.findIndex(
    //         (pane: { key: TargetKey }) => pane.key === targetKey
    //     );
    //     const newPanes = items.filter(
    //         (pane: { key: TargetKey }) => pane.key !== targetKey
    //     );
    //     if (newPanes.length && targetKey === activeKey) {
    //         const { key } =
    //             newPanes[
    //                 targetIndex === newPanes.length
    //                     ? targetIndex - 1
    //                     : targetIndex
    //             ];
    //         setActiveKey(key);
    //     }
    //     setItems(newPanes);
    //     // remove art

    //     let newArt = daftarArt;
    //     newArt = newArt.filter((obj: { key: string }) => obj.key !== targetKey);
    //     setDaftarArt(newArt);
    // };
    const handleCellEdit = (index: number, key: string, value: any) => {
        const updatedArts = [...daftarArt];
        updatedArts[index][key] = value.trim();
        setDaftarArt(updatedArts);
    };

    const handleCellBlur = (index: number) => {
        const updatedArts = [...daftarArt];
        updatedArts[index] = { ...daftarArt[index] };
        // Save the changes back to the original arts array
        // You might want to perform validation or additional checks here
        setDaftarArt(updatedArts);
    };

    const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
        if (action === "add") {
            add();
        } else {
            // remove(targetKey);
        }
    };

    useEffect(() => {
        try {
            console.log({ after: daftarArt });
        } catch (error) {}
    }, [daftarArt]);
    const items = daftarArt.map((art: any, index: number) => ({
        label: art.nama,
        key: String(index),
        children: (
            <Art
                onFinish={blok4_1_hal2Finish}
                artKey={art.key}
                daftarArt={daftarArt}
                setDaftarArt={setDaftarArt}
            />
        ),
    }));
    return (
        <Space direction="vertical">
            <Button type="primary" onClick={add}>
                Tambah Art
            </Button>

            <Blok
                title="DAFTAR ANGGOTA RUMAH TANGGA"
                columns={["Nomor", "Nama Anggota Rumah Tangga", "aksi"]}
                columnsCount={3}
            >
                {daftarArt.map((art: any, index: number) => (
                    <tr key={index}>
                        <td style={centerCell}>{index + 1}</td>
                        <td style={cellStyle}>
                            <Typography.Paragraph
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
                            </Typography.Paragraph>
                        </td>

                        <td style={centerCell}>
                            <Button onClick={() => onEdit(art.key, "remove")}>
                                Hapus
                            </Button>
                        </td>
                    </tr>
                ))}
            </Blok>
            <Tabs
                onEdit={onEdit}
                style={{ backgroundColor: "#fff", padding: "10px" }}
                items={items}
                type="line"
            />
            {/* {daftarArt.map((art: any) => (
                <Art
                    onFinish={blok4_1_hal2Finish}
                    artKey={art.artKey}
                    daftarArt={daftarArt}
                    setDaftarArt={setDaftarArt}
                />
            ))} */}
        </Space>
    );
};

export default Blok4_1;
