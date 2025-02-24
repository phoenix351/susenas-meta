import { useEffect, useState } from "react";
import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
    Bar,
    BarChart,
} from "recharts";
import PersentilTooltip from "./PersentilTooltip";

const Persentil = ({
    pengeluaranPerkapita,
}: {
    pengeluaranPerkapita: number[];
}) => {
    // console.log(typeof pengeluaranPerkapita);
    const [dataSource, setDataSource] = useState<any[]>([]);
    function processData(pengeluaranPerkapita:number[]){
        const sortedData = pengeluaranPerkapita.sort((a, b) => a - b);

        // Function to calculate percentiles
        const getPercentile = (arr: number[], percentile: number) => {
            let index = Math.ceil((percentile / 100) * arr.length) - 1;
            return arr[index];
        };
    
        // Calculate decile boundaries
        let deciles: number[] = [];
        for (let i = 10; i <= 100; i += 10) {
            deciles.push(getPercentile(sortedData, i));
        }
    
        // Calculate frequency for each decile
        let frequencies = new Array(10).fill(0);
        let ranges = new Array(10).fill([Infinity, -Infinity]);

        sortedData.forEach((num) => {
            for (let i = 0; i < deciles.length; i++) {
                if (i === 0 && num <= deciles[i]) {
                    frequencies[i]++;
                    ranges[i] = [
                        Math.min(ranges[i][0], num),
                        Math.max(ranges[i][1], num)
                    ];
                    break;
                } else if (num > deciles[i - 1] && num <= deciles[i]) {
                    frequencies[i]++;
                    ranges[i] = [
                        Math.min(ranges[i][0], num),
                        Math.max(ranges[i][1], num)
                    ];
                    break;
                }
            }
        });
    
        return frequencies.map((value, index) => ({
            label: `${index * 10 + 10} %`,
            value,
            range: ranges[index][0] === Infinity ? "No data" : `Rp ${Number(ranges[index][0]).toLocaleString("id")} - Rp ${Number(ranges[index][1]).toLocaleString("id")}`
        }));
    }
useEffect(() => {
  const processedData = processData(pengeluaranPerkapita);
  
  setDataSource(processedData);
  
}, [pengeluaranPerkapita])


    return (
        <>
            <ResponsiveContainer width={"100%"} height={400}>
                <BarChart data={dataSource}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="label"
                        label={{
                            value: "Cumulative Share of Population (%)",
                            position: "insideBottom",
                            offset: -5,
                        }}
                    />
                    <YAxis
                        label={{
                            value: "Cumulative Share of Income (%)",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <Tooltip content={<PersentilTooltip />} />
                    <Legend />

                    <Bar
                        type="monotone"
                        dataKey="value"
                        fill="#8884d8"
                        name="Frequency"
                    />
                    {/* <Bar
                        type="monotone"
                        dataKey="equality"
                        // data={lineOfEquality}
                        fill="#82ca9d"
                        name="Line of Equality"
                    /> */}
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default Persentil;
