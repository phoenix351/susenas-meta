import { Form, Space, Typography, Input, FormInstance } from "antd";
import React from "react";
import RupiahInput from "./RupiahInput";
import RowKonsumsi from "./RowKonsumsi";
import { SubTotal } from "@/types";

interface RowData {
    nomor: number;
    kode_coicop?: string;
    rincian: string;
    satuan?: string;
    type: string;
    subKey: number;
}
const { Text, Title } = Typography;
const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%",
};
const blokStyle: React.CSSProperties = {
    backgroundColor: "#fc0",
    fontWeight: "700",
    padding: "5px",
};
const cellStyle = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    // textAlign: "center",
    padding: "5px",
};
const centerCell: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
    textAlign: "center",
    padding: "5px",
};
const darkCell: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    // textAlign: "center",
    backgroundColor: "#636f83",
    padding: "5px",
};

const TabelBlok: React.FC<{
    title: string;
    konten: RowData[];
    rekapMak: any;
    calculate: ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => void;
    form: FormInstance;
}> = ({ title, konten, rekapMak, calculate, form }) => {
    title =
        "BLOK IV.1. KONSUMSI DAN PENGELUARAN BAHAN MAKANAN, BAHAN MINUMAN, DAN ROKOK SEMINGGU TERAKHIR";
    const nilaiTDStyle = { ...cellStyle, width: "250px" };
    const jumlahTDStyle = { ...cellStyle, width: "50px" };
    return (
        <table style={tableStyle}>
            <thead>
                <tr
                    style={{
                        backgroundColor: "#fc0",
                        textAlign: "center",
                    }}
                >
                    <th style={cellStyle} colSpan={10}>
                        <Space direction="vertical" style={{ padding: "25px" }}>
                            <Title level={4}>{title}</Title>
                        </Space>
                    </th>
                </tr>
                <tr>
                    <th style={{ ...cellStyle, width: "10px" }} rowSpan={2}>
                        Kode
                    </th>
                    {/* <th style={cellStyle} rowSpan={2}>
                        Kode COICOP
                    </th> */}
                    <th style={{ ...cellStyle, width: "200px" }} rowSpan={2}>
                        Rincian
                    </th>
                    <th style={{ ...cellStyle, width: "50px" }} rowSpan={2}>
                        Satuan standar
                    </th>
                    <th style={{ ...cellStyle, width: "300px" }} colSpan={2}>
                        Berasal dari pembelian (tunai/bon)
                    </th>
                    <th style={{ ...cellStyle, width: "300px" }} colSpan={2}>
                        Berasal dari produksi sendiri, pemberian, dsb
                    </th>
                    <th style={{ ...cellStyle, width: "300px" }} colSpan={2}>
                        Jumlah konsumsi
                    </th>
                </tr>
                <tr>
                    <th style={jumlahTDStyle}>Banyaknya (0,00)</th>
                    <th style={nilaiTDStyle}>Nilai (Rp)</th>
                    <th style={jumlahTDStyle}>Banyaknya (0,00)</th>
                    <th style={nilaiTDStyle}>Nilai (Rp)</th>

                    <th style={jumlahTDStyle}>Banyaknya (5) + (7) (0,00)</th>
                    <th style={nilaiTDStyle}>Nilai (6) + (8) (Rp)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td  style={centerCell}>
                        (1)
                    </td>
                    {/* <td width="130px" style={centerCell}>
                        (2)
                    </td> */}
                    <td style={centerCell}>(3)</td>
                    <td width="50px" style={centerCell}>
                        (4)
                    </td>
                    <td width="50px" style={centerCell}>
                        (5)
                    </td>
                    <td style={centerCell}>(6)</td>
                    <td style={jumlahTDStyle}>
                        (7)
                    </td>
                    <td style={centerCell}>(8)</td>
                    <td width="50px" style={centerCell}>
                        (9)
                    </td>
                    <td style={centerCell}>(10)</td>
                </tr>
                {konten.map((item, key) => {
                    // const subKey = 1;
                    return (
                        <RowKonsumsi
                            key={key}
                            data={item}
                            form={form}
                            // subKey={subKey}
                            rekapMak={rekapMak}
                            calculate={calculate}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default TabelBlok;
