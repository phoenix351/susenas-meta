import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { ProgressData } from "@/types";
import { Button, message, Space, Typography } from "antd";
import axios from "axios";
import { ExportOutlined, LeftOutlined } from "@ant-design/icons";
import CustomTooltip from "./CustomTooltip";
const { Title } = Typography;

const ProgressChart = () => {
    const [hoveredData, setHoveredData] = useState(null);
    const [currentData, setCurrentData] = useState([]);
    const [wilayah, setWilayah] = useState({
        tipe: "kabkot",
        nama: "Sulawesi Utara",
    });
    const [messageApi, contextHolder] = message.useMessage();
    async function getData(tipe: string, kode: string) {
        if (tipe == "null") {
            messageApi.open({
                content: "asik asik jos",
                key: "get-data",
                type: "info",
            });
            return;
        }
        try {
            messageApi.open({
                content: "sedang memuat data",
                key: "get-data",
                type: "loading",
            });
            const response = await axios.get(route("progress.update"));
            const { data } = await axios.get(
                route("api.monitoring.wilayah", { tipe, kode })
            );
            let addedEmptyData = data.map((kabkot: any) => ({
                ...kabkot,
                empty:
                    tipe == "kabkot"
                        ? kabkot.target -
                          kabkot.warning -
                          kabkot.clean -
                          kabkot.error
                        : 10 - kabkot.warning - kabkot.clean - kabkot.error,
            }));
            // if (tipe == "kabkot") {
            // } else {
            // }
            setCurrentData(addedEmptyData);
            // console.log({tipe});

            setWilayah({ tipe, nama: kode });
            messageApi.open({
                content: "selesai memuat data",
                key: "get-data",
                type: "info",
            });
        } catch (error) {
            messageApi.open({
                content: "terjadi kesalahan, silahkan hubungi pengembang",
                key: "get-data",
                type: "error",
            });
        }
    }
    function goBack() {
        if (wilayah.tipe == "kabkot") {
            messageApi.open({
                content: "asik asik jos",
                key: "get-data",
                type: "info",
            });
            return;
        }
        getData("kabkot", "00");
    }
    function convertCsv(columns: string[], data: any[]) {
        let stringCsv = "";
        stringCsv += columns.map((column) => `${column}`).join(",");
        stringCsv += "\n";
        stringCsv += data
            .map(
                (item) =>
                    `${columns
                        .map(
                            (column) =>
                                `${
                                    column == "name"
                                        ? item[column].trim()
                                        : item[column]
                                }`
                        )
                        .join(",")}\n`
            )
            .join("");
        return stringCsv;
    }
    async function unduhCsv() {
        const { data } = await axios.get(
            route("api.monitoring.wilayah", {
                tipe: "kabkot",
                kode: "00",
            })
        );
        console.log({ data });
        if (data.length < 1) {
            return messageApi.open({
                content: "data summary gagal diunduh",
                type: "error",
                duration: 1,
            });
        }
        const columnNames = Object.keys(data[0]);
        console.log({ columnNames });

        const stringCsvData = convertCsv(columnNames, data);
        const blob = new Blob([stringCsvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", `progress7100_${new Date()}.csv`);
        a.click();
    }
    useEffect(() => {
        getData("kabkot", "00");
    }, []);

    return (
        <>
            {" "}
            {contextHolder}
            <Space
                style={{
                    marginRight: 30,
                    marginLeft: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Button onClick={goBack}>
                    <LeftOutlined /> Kembali
                </Button>
                <Space style={{ textAlign: "center" }}>
                    <Title>Progress Pendataan 71{wilayah.nama}</Title>
                </Space>
                <Button onClick={unduhCsv}>
                    <ExportOutlined /> Export csv
                </Button>
            </Space>
            <ResponsiveContainer width={"100%"} height={600}>
                <BarChart
                    data={currentData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                    onClick={() => {
                        if (hoveredData) {
                            const tipe = hoveredData[0]["payload"]["tipe"];
                            const kode = hoveredData[0]["payload"]["kode"];
                            getData(tipe, kode);
                        }
                    }}
                    onMouseMove={(event: any) => {
                        if (event && event.activePayload) {
                            setHoveredData(event.activePayload);
                        } else {
                            setHoveredData(null);
                        }
                    }}
                >
                    <Legend
                        layout="horizontal"
                        verticalAlign="top"
                        align="center"
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="fullcode"
                        angle={-30}
                        textAnchor="end"
                        label={{
                            value:
                                wilayah.tipe == "kabkot"
                                    ? "Kabupaten/Kota"
                                    : "NKS",
                            position: "insideBottom",
                            offset: -30,
                        }}
                    />
                    <YAxis
                        label={{
                            value: "Jumlah Dokumen",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {/* <Bar dataKey="target" stackId="a" fill="grey" /> */}
                    <Bar
                        dataKey="clean"
                        stackId="a"
                        fill="rgba(56, 142, 60, 1)"
                        onClick={(data, index) => {}}
                    />
                    <Bar dataKey="warning" stackId="a" fill="rgba(245, 124, 0, 1)" />
                    <Bar dataKey="error" stackId="a" fill="rgba(211, 47, 47, 1)" />
                    <Bar dataKey="empty" stackId="a" fill="rgb(184,184,184)" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default ProgressChart;
