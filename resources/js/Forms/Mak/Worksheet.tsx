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
    value: any;
}
interface RincianWorksheet {
    id: number;
    nomor?: number | null | string;
    rincian?: string;
    type: string;
    options?: SelectItem[] | undefined;
    children?: RincianWorksheet[];
}
const InputComponent: React.FC<{
    type: string;
    name: string;
    customKey: number; // Use a different name
    options?: SelectItem[];
    children?: RincianWorksheet[];
    setValue?: (value: any) => void;
}> = ({ type, name, options, customKey, children, setValue }) => {
    const inputComponents: { [type: string]: JSX.Element } = {
        number: (
            <Form.Item name={name} label={null}>
                <InputNumber min={0} />
            </Form.Item>
        ),
        binary: (
            <MetaSelect
                name={name}
                options={[
                    { label: "[1] YA", value: "1" },
                    { label: "[5] TIDAK", value: "5" },
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
    const [value, setValue] = useState<null | any>(defaultValue);
    const [activeChild, setActiveChild] = useState<JSX.Element[]>([]);
    const commonColumns = (
        <>
            <td style={centerCell}>{props.nomor}</td>
            <td style={cellStyle}>{props.rincian}</td>
        </>
    );

    useEffect(() => {
        if (props.children) {
            let activeChild = props.children
                .filter((item, index) => index + 1 === Number(value))
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
                    />
                </td>
            </tr>
            {activeChild.map((child) => child)}
        </>
    );
};

const daftarRincian = [
    {
        id: 2,
        nomor: 2,
        rincian: "BANYAKNYA ART (Blok III Rincian 301)",
        type: "number",
    },
    {
        id: 3,
        nomor: 3,
        rincian: "ADA BALITA? (R302>0)",
        type: "binary",
        children: [
            {
                id: 27,
                nomor: "3c1",
                rincian: "Jumlah Konsumsi Susu",
                type: "number",
            },
        ],
    },
    {
        id: 4,
        nomor: 4,
        rincian: "ADA WANITA USIA SUBUR? (R405=2 dan R407 usia 10-54 tahun)",
        type: "binary",
    },
    {
        id: 5,
        nomor: 5,
        rincian: "ADA PEMBANTU/SUPIR? (R403=8)",
        type: "binary",
        children: [
            {
                id: 28,
                nomor: "5c1",
                rincian: "Jumlah Gaji/Upah Pembantu Rumah Tangga",
                type: "rupiah",
            },
        ],
    },
    {
        id: 6,
        nomor: 6,
        rincian:
            "ADA ART YANG BEROBAT JALAN/RAWAT INAP? (R1105=1 ATAU R1201=1)",
        type: "binary",
        children: [
            {
                id: 29,
                nomor: "6c1",
                rincian: "Rincian 255 s.d 257 Kolom 5 (Setahun terakhir)",
                type: "number",
            },
        ],
    },
    {
        id: 7,
        nomor: 7,
        rincian: "ADA ART YANG MENGOBATI SENDIRI? (R1104=1)",
        type: "binary",
    },
    {
        id: 8,
        nomor: 8,
        rincian: "ADA ART YANG PERNAH MENGGUNAKAN INTERNET?(R808 =1)",
        type: "binary",
        children: [
            {
                id: 30,
                nomor: "8c1",
                rincian: "Rincian 236+238",
                type: "number",
            },
        ],
    },
    {
        id: 9,
        nomor: 9,
        rincian: "ADA ART YANG MEMILIKI TABUNGAN (BANK)?(R701=1)",
        type: "binary",
    },
    {
        id: 10,
        nomor: 10,
        rincian: "ADA ART YANG SEDANG BERSEKOLAH? (R610=2)",
        type: "binary",
        children: [
            {
                id: 31,
                nomor: "10c1",
                rincian: "Rincian 265+270",
                type: "number",
            },
        ],
    },
    {
        id: 11,
        nomor: 11,
        rincian: "ADA ART YANG MEMILIKI/MENGUASAI HP? (R802=1)",
        type: "binary",
    },
    {
        id: 12,
        nomor: 11,
        rincian:
            "ADA ART DENGAN STATUS PEKERJAAN BURUH/KARYAWAN/PEGAWAI/PEKERJA BEBAS? (R1706=4 atau 5)",
        type: "binary",
    },
    {
        id: 13,
        nomor: 12,
        rincian: "ADA ART DENGAN STATUS BERUSAHA? (R706=1 atau 2)",
        type: "binary",
    },
    {
        id: 14,
        nomor: 17,
        rincian: "ADA ART YANG MEROKOK? (R1207 = 1 atau 2)",
        type: "binary",
        children: [
            {
                id: 32,
                nomor: "14c1",
                rincian: "Rincian 192 kolom 10",
                type: "number",
            },
        ],
    },
    {
        id: 15,
        nomor: 18,
        rincian: "ADA YANG SEDANG MENGGUNAKAN KB? (Blok XVI Rincian 1601=2)",
        type: "binary",
        children: [
            {
                id: 33,
                nomor: "15c1",
                rincian: "Rincian 263 kolom 5",
                type: "number",
            },
        ],
    },
    {
        id: 16,
        nomor: 14,
        rincian: "STATUS RUMAH? (Blok XVIII Rincian 1802)",
        type: "multi",
        options: [
            { label: "[1] Milik sendiri", value: "1" },
            { label: "[2] Kontrak/sewa", value: "2" },
            { label: "[3] Bebas sewa", value: "3" },
            { label: "[4] Dinas", value: "4" },
            { label: "[5] Lainnya", value: "5" },
        ],
        children: [
            {
                id: 34,
                nomor: "16c1",
                rincian: "Rincian 200",
                type: "number",
            },
            {
                id: 35,
                nomor: "16c2",
                rincian: "Rincian 201 + 202",
                type: "number",
            },
            {
                id: 34,
                nomor: "16c1",
                rincian: "Rincian 200",
                type: "number",
            },
            {
                id: 37,
                nomor: "16c3",
                rincian: "Rincian 203",
                type: "number",
            },
            {
                id: 37,
                nomor: "16c3",
                rincian: "Rincian 203",
                type: "number",
            },
        ],
    },
    {
        id: 17,
        nomor: 15,
        rincian:
            "RUTA MENGGUNAKAN PAM METERAN(LEDING)? (R1810A=3 atau R1814A=3)",
        type: "binary",
    },
    {
        id: 18,
        nomor: 16,
        rincian: "AIR MINUM? (R1810A)",
        type: "multi",
        options: [
            { label: "[1] Air kemasan bermerk", value: "1" },
            { label: "[2] Air isi ulang", value: "2" },
            { label: "[3] Leding/sumur bor/pompa ", value: "3" },
            { label: "[4] Lainnya", value: "4" },
        ],
    },
    {
        id: 19,
        nomor: 17,
        rincian: "SUMBER AIR CUCI/MANDI, DLL (R1814A)",
        type: "multi",
        options: [
            { label: "[1] Air kemasan bermerk", value: "1" },
            { label: "[2] Air isi ulang", value: "2" },
            { label: "[3] Leding/sumur bor/pompa ", value: "3" },
            { label: "[4] Lainnya", value: "4" },
        ],
    },
    {
        id: 20,
        nomor: 17,
        rincian: "SUMBER UTAMA PENERANGAN? (R1816A)",
        type: "multi",
        options: [
            { label: "[1] Listrik PLN dengan meteran", value: "1" },
            { label: "[2] Listrik PLN tanpa meteran", value: "2" },
            { label: "[3] Listrik non PLN", value: "3" },
            { label: "[4] Bukan listrik", value: "4" },
        ],
    },
    {
        id: 21,
        nomor: 23,
        rincian: "BAHAN BAKAR MEMASAK? (R1817)",
        type: "multi",
        options: [
            { label: "[1] Listrik", value: "1" },
            { label: "[2] LPG > 3 kg", value: "2" },
            { label: "[3] LPG 3 kg", value: "3" },
            { label: "[4] Minyak tanah", value: "4" },
            { label: "[5] Arang/briket/kayu bakar", value: "5" },
            { label: "[6] Lainnya", value: "6" },
            { label: "[7] Tidak memasak di rumah", value: "7" },
        ],
    },
    {
        id: 22,
        nomor: 24,
        rincian: "APAKAH RUTA MENERIMA KREDIT? (R1901 salah satu berkode 1)",
        type: "binary",
    },
    {
        id: 23,
        nomor: 26,
        rincian: "MEMILIKI KENDARAAN BERMOTOR? (R2001H=1 atau R2001.K=1)",
        type: "binary",
        children: [
            {
                id: 39,
                nomor: "23c1",
                rincian: "Rincian 309",
                type: "number",
            },
        ],
    },
    {
        id: 24,
        nomor: 19,
        rincian: "MEMILIKI ASURANSI/JAMINAN KESEHATAN? (Blok XI Rincian 1101)",
        type: "binary",
    },
    {
        id: 26,
        nomor: "",
        rincian: "GARIS KEMISKINAN MARET 2023",
        type: "rupiah",
    },
];
const Worksheet: React.FC<{
    form: any;
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
                            <td style={cellStyle} colSpan={4}>
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
                    </tbody>
                </table>
            </Form>
        </Space>
    );
};

export default Worksheet;
