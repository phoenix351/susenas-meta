import React from "react";
import ReactECharts from "echarts-for-react";
import { Summary } from "@/types";
//var CanvasJSReact = require('@canvasjs/react-charts');

const BarChart: React.FC<{
    data: Summary[];
    title: string;
}> = ({ data, title }) => {
    console.log({ data });
    const data_x = data.map((data_individu) => data_individu.label);
    const data_y = data.map((data_individu) => data_individu.value);

    const options = {
        title: {
            text: title,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {},
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
        },
        yAxis: {
            type: "category",
            data: data_x,
        },
        series: [
            {
                type: "bar",
                data: data_y,
                label: { show: true, position: "right" },
            },
        ],
    };
    return (
        <ReactECharts
            option={options}
            style={{ height: 650, maxWidth: 725, backgroundColor: "white" }}
        />
    );
};

export default BarChart;
