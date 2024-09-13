import MetaSelect from "@/Components/MetaSelect";
import RupiahInput from "@/Components/RupiahInput";
import {
    Form,
    FormInstance,
    Input,
    InputNumber,
    Space,
    Typography,
} from "antd";
import { Rule } from "antd/es/form";
import { useEffect, useState } from "react";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const cellStyle = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    padding: "5px",
};
const centerCell: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    textAlign: "center",
    padding: "5px",
};
const rightStyle: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    textAlign: "right",
    padding: "5px",
};
const formItemStyle = {
    margin: "auto",
    padding: "5px",
};
interface SelectItem {
    label: string;
    value: string | number;
}
interface RincianWorksheet {
    id: number;
    nomor?: number | null | string;
    rincian?: string;
    type: string;
    options?: SelectItem[] | undefined;
    dependentValues?: string[] | number[];
    children?: RincianWorksheet[];
    dependencies?: string[];
    rules?: Rule[];
}
const InputComponent: React.FC<{
    type: string;
    name: string;
    customKey: number; // Use a different name
    options?: SelectItem[];
    children?: RincianWorksheet[];
    setValue?: (value: any) => void;
    rules?: Rule[];
    dependencies?: string[];
}> = ({
    type,
    name,
    options,
    customKey,
    children,
    setValue,
    dependencies,
    rules,
}) => {
    const inputComponents: { [type: string]: JSX.Element } = {
        number: (
            <Form.Item
                name={name}
                label={null}
                dependencies={dependencies}
                rules={rules}
            >
                <InputNumber />
            </Form.Item>
        ),
        binary: (
            <MetaSelect
                name={name}
                options={[
                    { label: "[1] YA", value: 1 },
                    { label: "[5] TIDAK", value: 5 },
                ]}
                onChange={setValue && ((value) => setValue(value))}
            />
        ),
        rupiah: <RupiahInput inputName={name} editable={customKey === 26} />, // Use customKey
        multi: (
            <MetaSelect
                name={name}
                options={options ?? []}
                onChange={setValue && ((value) => setValue(value))}
            />
        ),
    };
    return inputComponents[type];
};

const renderRow: React.FC<{ props: RincianWorksheet; defaultValue: any }> = ({
    props,
    defaultValue,
}) => {
    const [value, setValue] = useState<null | string | number>(defaultValue);
    const [activeChild, setActiveChild] = useState<JSX.Element[]>([]);
    const commonColumns = (
        <>
            <td style={centerCell}>{props.id}</td>
            <td style={cellStyle}>{props.rincian}</td>
        </>
    );

    useEffect(() => {
        if (props.children) {
            let activeChild = props.children
                .filter((item: RincianWorksheet, index: number) => {
                    let logic = false;
                    if (item.dependentValues) {
                        item.dependentValues.forEach((val) => {
                            if (val == value) {
                                logic = true;
                            }
                        });
                    }

                    return logic;
                })
                .map((child: any) => (
                    <tr key={props.id}>
                        <td style={centerCell}>{}</td>
                        <td style={cellStyle}>{child.rincian}</td>
                        <td style={centerCell}>
                            <InputComponent
                                type={child.type}
                                name={`wtf_${child.nomor}`}
                                options={child.options}
                                key={child.nomor}
                                customKey={child.id}
                                dependencies={child.dependencies}
                                rules={child.rules}
                            />
                        </td>
                    </tr>
                ));
            setActiveChild(activeChild);
        }
    }, [value, props.children]);
    // setValue("1");

    return (
        <>
            <tr
                style={{
                    backgroundColor: props.id % 2 === 0 ? " #fffae6" : "",
                }}
            >
                {commonColumns}
                <td style={centerCell}>
                    <InputComponent
                        type={props.type}
                        name={`wtf_${props.id}`}
                        options={props.options}
                        key={props.id}
                        customKey={props.id}
                        children={props.children}
                        setValue={setValue}
                        dependencies={props.dependencies}
                        rules={props.rules}
                    />
                </td>
            </tr>
            {activeChild.map((child) => child)}
        </>
    );
};

const getRules = (
    { getFieldValue }: { getFieldValue: (arg0: string) => any },
    dependentName: string,
    ruleName: "less" | "greater",
    message: string
) => ({
    validator(rule: any, value: number, callback: any) {
        const dependentValue = getFieldValue(dependentName);
        let test = true;

        if (ruleName === "less") {
            test = value <= dependentValue;
        } else {
            test = value >= dependentValue;
        }

        if (!test) {
            return Promise.reject(message);
        }
        return Promise.resolve();
    },
});

const daftarRincian = [
    {
        id: 1,
        nomor: 1,
        rincian: "Jumlah ART (Blok III Rincian 301)",
        type: "number",
        rules: [
            () => ({
                validator(rule: any, value: number, callback: any) {
                    if (value < 1) {
                        return Promise.reject("Jumlah ART minimal satu");
                    }
                    return Promise.resolve();
                },
            }),
        ],
    },
    {
        id: 2,
        nomor: 2,
        rincian: "Jumlah Balita (R302>0)",
        type: "number",

        dependencies: ["wtf_1"],
        rules: [
            // ({ getFieldValue }: { getFieldValue: (arg0: string) => any }) => ({
            //     validator(rule: any, value: number, callback: any) {
            //         const wtf_1 = getFieldValue("wtf_1");
            //         if (value > wtf_1) {
            //             return Promise.reject(
            //                 "Jumlah Balita tidak bisa melebihi jumlah ART"
            //             );
            //         }
            //         return Promise.resolve();
            //     },
            // }),
            ({ getFieldValue }: { getFieldValue: (arg0: string) => any }) =>
                getRules(
                    { getFieldValue },
                    "wtf_1",
                    "less",
                    "Jumlah Balita tidak bisa melebihi jumlah ART"
                ),
        ],
    },
    {
        id: 3,
        nomor: 3,
        rincian: "Jumlah ART yang masih bersekolah (R1402=2)",
        type: "number",
        rules: [
            ({ getFieldValue }: { getFieldValue: (arg0: string) => any }) =>
                getRules(
                    { getFieldValue },
                    "wtf_1",
                    "less",
                    "Jumlah ART yang bersekolah tidak bisa melebihi jumlah ART"
                ),
        ],
    },

    {
        id: 4,
        nomor: 4,
        rincian: "Status Kepemilikan Bangunan Tempat Tinggal (R1901)",
        type: "multi",
        options: [
            { label: "Milik Sendiri", value: 1 },
            { label: "Kontrak/Sewa", value: 2 },
            { label: "Bebas Sewa", value: 3 },
            { label: "Dinas", value: 4 },
            { label: "Lainnya", value: 99 },
        ],
    },
    {
        id: 5,
        nomor: 5,
        rincian: "Luas Lantai per Kapita (m^2) (r1902)",
        type: "number",
    },
    {
        id: 6,
        nomor: 6,
        rincian: "Sumber air minum (R1903)",
        type: "multi",
        options: [
            { label: "Air kemasan bermerek", value: 1 },
            { label: "Air isi ulang", value: 2 },
            { label: "Leding/sumur bor/pompa", value: 3 },
            { label: "Lainnya", value: 99 },
        ],
    },
    {
        id: 7,
        nomor: 7,
        rincian: "Sumber air mandi/cuci/dll (R1904)",
        type: "multi",
        options: [
            { label: "Air kemasan bermerek", value: 1 },
            { label: "Air isi ulang", value: 2 },
            { label: "Leding/sumur bor/pompa", value: 3 },
            { label: "Lainnya", value: 99 },
        ],
    },

    {
        id: 8,
        nomor: 8,
        rincian: "Apakah tercatat sebagai menerima PKH? (r2003a)",
        type: "binary",
        children: [
            {
                id: 9,
                nomor: 9,
                rincian: "Penggunaan PKH (r2003b)",
                type: "multi",
                dependentValues: [1],
                options: [
                    { label: "Belanja Pangan", value: 1 },
                    { label: "Biaya Sekolah", value: 2 },
                    { label: "Pembayaran Utang/Kredit", value: 3 },
                    { label: "Lainnya", value: 99 },
                ],
            },
        ],
    },

    {
        id: 10,
        nomor: 10,
        rincian: "Apakah ART menerima PIP?",
        type: "binary",
        children: [
            {
                id: 11,
                nomor: 11,
                dependentValues: [1],
                rincian: "berapa ART yang menerima PIP? (SD s.d. Kuliah)",
                type: "number",
                rules: [
                    ({
                        getFieldValue,
                    }: {
                        getFieldValue: (arg0: string) => any;
                    }) =>
                        getRules(
                            { getFieldValue },
                            "wtf_3",
                            "less",
                            "Jumlah ART yang menerima PIP tidak bisa melebihi ART yang bersekolah"
                        ),
                ],
            },
        ],
    },

    {
        id: 26,
        nomor: "",
        rincian: "Garis Kemiskinan September 2023",
        type: "rupiah",
    },
];
const Worksheet: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    // record: any;
}> = ({ form, onFinish, tabContentStyle }) => {
    const tableStyle: React.CSSProperties = {
        borderCollapse: "collapse",
        width: "100%",
    };
    const cellStyle = {
        borderStyle: "solid",
        border: "solid 1px black",

        padding: "5px",
    };

    return (
        <Space direction="vertical" style={tabContentStyle}>
            <Space
                style={{ width: "100%", justifyContent: "space-between" }}
                direction="horizontal"
            ></Space>
            <Form
                form={form}
                name="Worksheet"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <table style={tableStyle}>
                    <thead
                        style={{
                            backgroundColor: "#fc0",
                            textAlign: "center",
                        }}
                    >
                        <tr>
                            <td style={cellStyle} colSpan={3}>
                                <Space direction="vertical">
                                    <Title
                                        level={4}
                                        style={{ textTransform: "uppercase" }}
                                    >
                                        Isian Worksheet Template{" "}
                                    </Title>
                                    <Text>
                                        RINCIAN (Lihat Dokumen VSEN22.K)
                                    </Text>
                                </Space>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* render rows */}
                        {daftarRincian.map((rincian) =>
                            renderRow({
                                props: rincian,
                                defaultValue: form.getFieldValue(
                                    `wtf_${rincian.id}`
                                ),
                            })
                        )}
                        {/* <tr style={{ backgroundColor: "#fffae6" }}>
                            <td style={centerCell}>1</td>
                            <td style={centerCell}>Banyaknya ART</td>

                            <td style={centerCell}>
                                <Form.Item name="wtf_1">
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr style={{ backgroundColor: "#fffae6" }}>
                            <td style={centerCell}>2</td>
                            <td style={centerCell}>Jumlah Balita</td>

                            <td style={centerCell}>
                                <Form.Item
                                    name="wtf_2"
                                   
                                >
                                    <Input />
                                </Form.Item>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </Form>
        </Space>
    );
};

export default Worksheet;
