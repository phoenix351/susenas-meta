import { Form, FormInstance, Input, Space, Typography, message } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import RupiahInput from "@/Components/RupiahInput";
import { RekapMak, Rincian } from "@/types";
import Blok from "@/Components/Blok";
import TextRupiah from "@/Components/TextRupiah";

const { Text, Title } = Typography;

const Blok4_3: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    daftarArt: any;
    rekapMak: RekapMak[];
    setRekapMak: React.Dispatch<React.SetStateAction<RekapMak[]>>;
    daftarRincian432: Rincian[];
}> = ({
    form,
    onFinish,
    tabContentStyle,
    rekapMak,
    setRekapMak,
    daftarArt,
    daftarRincian432,
}) => {
    const formItemLayout = {
        // wrapperCol: { span: 24 },
    };
    const imageProps = {
        width: "70px",
        height: "auto",
        preview: false,
    };
    const tableStyle: React.CSSProperties = {
        borderCollapse: "collapse",
        width: "100%",
    };
    const cellStyle = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        padding: "5px",
    };
    const darkCell = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        // textAlign: "center",
        backgroundColor: "#636f83",
        padding: "5px",
    };
    const centerCell: React.CSSProperties = {
        borderStyle: "solid",
        border: "solid 1px black",
        // width: "100%",
        textAlign: "center",
        // backgroundColor: "#636f83",
        padding: "5px",
    };
    const blokStyle: React.CSSProperties = {
        backgroundColor: "#fc0",
        fontWeight: "700",
        padding: "5px",
    };
    const formItemStyle = {
        margin: "auto",
        padding: "5px",
    };
    interface Rincian {
        id: number;
        nomor: number;
        kode_coicop?: string;
        rincian: string;
        satuan?: string;
        type: string;
    }
    interface RekapMak {
        beli: number;
        produksi: number;
        total: number;
    }
    const [messageApi, contextHolder] = message.useMessage();

    const daftarQC: any[] = [
        { rincian: "Kalori per Kapita per Hari" },
        { rincian: "Jumlah Komoditas Bahan Makanan/Minuman" },
        { rincian: "Jumlah Komoditas Makanan/Minuman Jadi dan Rokok" },
        { rincian: "Jumlah Komoditas Non Makanan" },
        { rincian: "Jumlah Semua Komoditas" },
        { rincian: "Pengeluaran per kapita" },
    ];

    const renderQC: React.FC<{ rincian: Rincian; key: number }> = ({
        rincian,
        key,
    }) => {
        return (
            <tr>
                <td style={centerCell}>{key + 1}</td>
                <td style={cellStyle}>{rincian.rincian}</td>

                <td style={cellStyle}>
                    {key === 5 ? (
                        <>
                            <RupiahInput
                                key={key}
                                inputName={`blokqc_${rincian.id - 1}`}
                            />
                            <TextRupiah value={0} color={"red"} />
                        </>
                    ) : (
                        <Input
                            style={{ textAlign: "right" }}
                            key={key}
                            name={`blokqc_${rincian.id - 1}`}
                        />
                    )}
                </td>
            </tr>
        );
    };
    return (
        <Space direction="vertical" style={tabContentStyle}>
            <Form
                form={form}
                name="Blok4_3"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Blok
                    title={"Quality Control"}
                    columnsCount={3}
                    columns={["No.", "Rincian", "Isian"]}
                    key={2}
                >
                    {daftarQC.map((rincian, key) => renderQC({ rincian, key }))}
                </Blok>

                {contextHolder}
                {/* Blok I  */}
                {/* <Form.Item name="kode_prov" label="Provinsi">
                    <Select
                        options={daftarProv}
                        onChange={() => setKabkotDisable(false)}
                    />
                </Form.Item> */}
            </Form>
        </Space>
    );
};

export default Blok4_3;
