import React, { useState } from "react";
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
import { Button, message, TooltipProps } from "antd";
import axios from "axios";
import { LeftOutlined } from "@ant-design/icons";

const ProgressChart = ({ data }: { data: ProgressData[] }) => {
    const [hoveredData, setHoveredData] = useState(null);
    const [currentData, setCurrentData] = useState(data);
    const [level, setLevel] = useState("kabkot");
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
            const { data } = await axios.get(
                route("api.monitoring.wilayah", { tipe, kode })
            );
            setCurrentData(data);
            setLevel(tipe);
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
        if (level == "kabkot") {
            messageApi.open({
                content: "asik asik jos",
                key: "get-data",
                type: "info",
            });
            return;
        }
        getData("kabkot","00");
    }
    return (
        <>
            {" "}
            {contextHolder}
            <Button onClick={goBack}>
                <LeftOutlined /> Kembali
            </Button>
            <BarChart
                width={1000}
                height={600}
                data={currentData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="target" stackId="a" fill="grey" /> */}
                <Bar
                    dataKey="clean"
                    stackId="a"
                    fill="green"
                    onClick={(data, index) => {
                        console.log({ data, index });
                    }}
                />
                <Bar dataKey="warning" stackId="a" fill="orange" />
                <Bar dataKey="error" stackId="a" fill="red" />
            </BarChart>
        </>
    );
};

export default ProgressChart;
