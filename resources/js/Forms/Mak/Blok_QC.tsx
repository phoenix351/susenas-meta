import {
    Button,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Space,
    Typography,
    message,
} from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import RupiahInput from "@/Components/RupiahInput";
import { RekapMak, Rincian } from "@/types";
import Blok from "@/Components/Blok";
import TextRupiah from "@/Components/TextRupiah";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";

const { Text } = Typography;

const Blok4_3: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    daftarArt: any;
    rekapMak: RekapMak[];
    setRekapMak: React.Dispatch<React.SetStateAction<RekapMak[]>>;
    daftarRincian432: Rincian[];
}> = ({ form, onFinish, tabContentStyle, rekapMak, daftarArt }) => {
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
        // backgroundColor: "#636f83",
        padding: "5px",
    };
    interface Rincian {
        id: number;
        nomor?: number;
        kode_coicop?: string;
        rincian: string;
        satuan?: string;
        type?: string;
        value: number;
    }
    // please define all usestate here
    const [messageApi, contextHolder] = message.useMessage();

    const [daftarQc, setDaftarQc] = useState<Rincian[]>([
        { rincian: "Kalori per Kapita per Hari", id: 0, value: 0 },
        { rincian: "Jumlah Komoditas Bahan Makanan/Minuman", id: 1, value: 0 },
        {
            rincian: "Jumlah Komoditas Makanan/Minuman Jadi dan Rokok",
            id: 2,
            value: 0,
        },
        { rincian: "Jumlah Komoditas Non Makanan", id: 3, value: 0 },
        { rincian: "Jumlah Semua Komoditas", id: 4, value: 0 },
        { rincian: "Pengeluaran per kapita", id: 5, value: 0 },
    ]);

    const renderQC: React.FC<{
        rincian: Rincian;
        key: number;
        // label: number | string;
    }> = ({ rincian, key }) => {
        return (
            <tr>
                <td style={{ ...centerCell, width: "30px" }}>{key + 1}</td>
                <td style={{ ...cellStyle, width: "auto" }}>
                    {rincian.rincian}
                </td>

                <td
                    style={{ ...cellStyle, width: "150px", textAlign: "right" }}
                >
                    {key === 5 ? (
                        <>
                            <RupiahInput
                                key={key}
                                inputName={`blokqc_${rincian.id}`}
                            />
                            <TextRupiah
                                value={Math.round(
                                    rekapMak[17].total / daftarArt.length
                                )}
                                color="red"
                            />
                        </>
                    ) : (
                        <Space direction="vertical">
                            <Form.Item
                                name={`blokqc_${rincian.id}`}
                                label={null}
                                style={{ marginBottom: "5px" }}
                            >
                                <InputNumber
                                    key={key}
                                    style={{
                                        justifyContent: "end",
                                        textAlign: "center",
                                        // backgroundColor: "red",
                                    }}
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                />
                            </Form.Item>
                            <Text style={{ color: "red" }}>
                                {`${rincian.value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )}
                            </Text>
                        </Space>
                    )}
                </td>
            </tr>
        );
    };
    const [qcValue, setQcValue] = useState({
        totalKalori: 0,
        jumlahKomoditasMakananJadiNRokok: 0,
        jumlahKomoditasBahanMakanan: 0,
        jumlahKomoditas: 0,
        pengeluaranPerKapita: 0,
    });

    const calculate = async () => {
        messageApi.open({
            content: `menghitung ulang... ruta ${daftarArt[0].id_ruta}`,
            key: "calculate_qc",
            type: "loading",
        });
        const { data } = await axios.get(
            route("api.mak.calculate_qc", { id_ruta: daftarArt[0].id_ruta })
        );

        let newQc = [...daftarQc];
        newQc[0].value = data.kalori_total;
        newQc[1].value = data.jumlah_komoditas_bahan_makanan;
        newQc[2].value = data.jumlah_komoditas_makanan_jadi_rokok;
        newQc[3].value = form.getFieldValue("blokqc_3");
        newQc[4].value = newQc[1].value + newQc[2].value + newQc[3].value;
        setDaftarQc([...newQc]);
        // newQc[2] = data.jumlah_komoditas_makanan_jadi_rokok;
    };

    return (
        <Space direction="vertical" style={tabContentStyle}>
            <Button onClick={calculate}>
                <ReloadOutlined />
                Hitung ulang
            </Button>
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
                    {daftarQc.map((rincian, key) => renderQC({ rincian, key }))}
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
