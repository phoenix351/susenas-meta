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
    // width: "100%",
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
// const renderRow = (data: RowData) => {
//     let a = 1;
//     if (data.type !== "sub")
//         return (
//             <tr>
//                 <td style={centerCell}>{data.nomor}</td>
//                 <td style={cellStyle}>{data.kode_coicop}</td>
//                 <td style={cellStyle}>
//                     <Text>{data.rincian}</Text>
//                     {data.type === "lain" && (
//                         <Form.Item name={`${data.nomor}_lainnya`}>
//                             <Input placeholder="Sebutkan" />
//                         </Form.Item>
//                     )}
//                 </td>
//                 <td style={cellStyle}>
//                     <Text>{data.satuan}</Text>
//                 </td>
//                 <td style={cellStyle}>
//                     <Form.Item name={`${data.nomor}_beli_volume`}>
//                         <Input />
//                     </Form.Item>
//                 </td>
//                 <td style={cellStyle}>
//                     <RupiahInput inputName={`${data.nomor}_beli_harga`} />

//                 </td>
//                 <td style={cellStyle}>
//                     <Form.Item name={`${data.nomor}_produksi_dsb_volume`}>
//                         <Input />
//                     </Form.Item>
//                 </td>
//                 <td style={cellStyle}>
//                     <RupiahInput inputName={`${data.nomor}_produksi_dsb_harga`} />

//                 </td>
//                 <td style={cellStyle}>
//                     <Form.Item name={`${data.nomor}_total_volume`}>
//                         <Input />
//                     </Form.Item>
//                 </td>
//                 <td style={cellStyle}>
//                     <RupiahInput inputName={`${data.nomor}_total_harga`} />

//                     <Text>10.000.000</Text>
//                 </td>
//             </tr>
//         );
//     return (
//         <tr>
//             <td style={centerCell}>{data.nomor}</td>
//             <td style={cellStyle}></td>
//             <td colSpan={2} style={blokStyle}>
//                 {data.rincian}
//             </td>
//             <td style={darkCell}></td>
//             <td style={cellStyle}>
//                 <RupiahInput inputName={`${data.nomor}_beli_harga`} />

//             </td>
//             <td style={darkCell}></td>
//             <td style={cellStyle}>
//                 <RupiahInput inputName={`${data.nomor}_produksi_harga`} />

//             </td>
//             <td style={darkCell}></td>
//             <td style={cellStyle}>
//                 <RupiahInput inputName={`${data.nomor}_total_harga`} />
//                 <Text>10.000.000</Text>
//             </td>
//         </tr>
//     );
// };
const TabelBlok: React.FC<{
    title: string;
    konten: RowData[];
    subTotalHarga: SubTotal[];
    calculate: ({
        subKey,
        jenis,
    }: {
        subKey: number;
        jenis: keyof SubTotal;
    }) => void;
    form: FormInstance;
}> = ({ title, konten, subTotalHarga, calculate, form }) => {
    title =
        "BLOK IV.1. KONSUMSI DAN PENGELUARAN BAHAN MAKANAN, BAHAN MINUMAN, DAN ROKOK SEMINGGU TERAKHIR";

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
                    <th style={cellStyle} rowSpan={2}>
                        No Urut
                    </th>
                    <th style={cellStyle} rowSpan={2}>
                        Kode COICOP
                    </th>
                    <th style={cellStyle} rowSpan={2}>
                        Rincian
                    </th>
                    <th style={cellStyle} rowSpan={2}>
                        Satuan standar
                    </th>
                    <th style={cellStyle} colSpan={2}>
                        Berasal dari pembelian (tunai/bon)
                    </th>
                    <th style={cellStyle} colSpan={2}>
                        Berasal dari produksi sendiri, pemberian, dsb
                    </th>
                    <th style={cellStyle} colSpan={2}>
                        Jumlah konsumsi
                    </th>
                </tr>
                <tr>
                    <th style={cellStyle}>Banyaknya (0,00)</th>
                    <th style={cellStyle}>Nilai (Rp)</th>
                    <th style={cellStyle}>Banyaknya (0,00)</th>
                    <th style={cellStyle}>Nilai (Rp)</th>
                    <th style={cellStyle}>Banyaknya (5) + (7) (0,00)</th>
                    <th style={cellStyle}>Nilai (6) + (8) (Rp)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td width="55px" style={centerCell}>
                        (1)
                    </td>
                    <td width="130px" style={centerCell}>
                        (2)
                    </td>
                    <td style={centerCell}>(3)</td>
                    <td width="80px" style={centerCell}>
                        (4)
                    </td>
                    <td width="100px" style={centerCell}>
                        (5)
                    </td>
                    <td style={centerCell}>(6)</td>
                    <td width="100px" style={centerCell}>
                        (7)
                    </td>
                    <td style={centerCell}>(8)</td>
                    <td width="100px" style={centerCell}>
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
                            subTotalHarga={subTotalHarga}
                            calculate={calculate}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default TabelBlok;
