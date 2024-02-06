import RupiahInput from "@/Components/RupiahInput";
import { Form, InputNumber, Space, Typography } from "antd";
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
interface RincianWorksheet {
    id: number;
    nomor?: number | null | string;
    rincian?: string;
    type: string;
}
const renderRow = (props: RincianWorksheet) => {
    const commonColumns = (
        <>
            <td style={centerCell}>{props.nomor}</td>
            <td style={cellStyle}>{props.rincian}</td>
        </>
    );

    const inputComponents: { [key: string]: JSX.Element } = {
        number: <InputNumber />,
        binary: <InputNumber max={2} />,
        rupiah: <RupiahInput />,
    };

    return (
        <tr>
            {commonColumns}
            <td style={centerCell}>
                <Form.Item
                    name={`wtf_${props.id}`}
                    label={null}
                    style={formItemStyle}
                >
                    {inputComponents[props.type]}
                </Form.Item>
            </td>
        </tr>
    );
};
const daftarRincian = [
    {
        id: 1,
        nomor: 1,
        rincian: "KODE KLASIFIKASI WILAYAH (R105)",
        type: "number",
    },
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
    },
    {
        id: 6,
        nomor: 6,
        rincian:
            "ADA ART YANG BEROBAT JALAN/RAWAT INAP? (R1105=1 ATAU R1201=1)",
        type: "binary",
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
    },
    {
        id: 15,
        nomor: 18,
        rincian: "ADA YANG SEDANG MENGGUNAKAN KB? (Blok XVI Rincian 1601=2)",
        type: "binary",
    },
    {
        id: 16,
        nomor: 14,
        rincian: "STATUS RUMAH? (Blok XVIII Rincian 1802)",
        type: "number",
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
        type: "number",
    },
    {
        id: 19,
        nomor: 17,
        rincian: "SUMBER AIR CUCI/MANDI, DLL (R1814A)",
        type: "number",
    },
    {
        id: 20,
        nomor: 17,
        rincian: "SUMBER UTAMA PENERANGAN? (R1816A)",
        type: "number",
    },
    {
        id: 21,
        nomor: 23,
        rincian: "BAHAN BAKAR MEMASAK? (R1817)",
        type: "number",
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
    },
    {
        id: 24,
        nomor: 27,
        rincian:
            "TANAH RUMAH MILIK SENDIRI/PUNYA LAHAN TEMPAT LAIN? (Blok XX R2001M=1)",
        type: "number",
    },
    {
        id: 25,
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
                        {daftarRincian.map((rincian) => renderRow(rincian))}
                    </tbody>
                </table>
            </Form>
        </Space>
    );
};

export default Worksheet;
