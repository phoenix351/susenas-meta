import React from "react";
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

const ProgressChart = ({ data }: { data: ProgressData[] }) => {
    console.log({ data });

    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="target" stackId="a" fill="grey" /> */}
            <Bar dataKey="clean" stackId="a" fill="green" />
            <Bar dataKey="warning" stackId="a" fill="orange" />
            <Bar dataKey="error" stackId="a" fill="red" />
        </BarChart>
    );
};

export default ProgressChart;
