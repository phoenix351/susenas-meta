import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const LorenzCurve = ({
    pengeluaranPerkapita,
}: {
    pengeluaranPerkapita: number[];
}) => {
    const sortedData = pengeluaranPerkapita.sort((a, b) => a - b);

    // Calculate cumulative shares
    const totalIncome = sortedData.reduce((sum, value) => sum + value, 0);
    let cumulativeIncome = 0;

    const data = sortedData.map((value, index) => {
        cumulativeIncome += value;
        let population = ((index + 1) / sortedData.length) * 100;

        return {
            population: Math.round(population * 100) / 100,
            equality: Math.round(population * 100) / 100,
            income: Math.round((cumulativeIncome * 100) / totalIncome),
        };
    });

    // Add the origin point (0,0)
    data.unshift({ population: 0, income: 0, equality: 0 });

    return (
        <>
            <ResponsiveContainer width={"100%"} height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="population"
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
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="income"
                        data={data}
                        stroke="#8884d8"
                        name="Lorenz Curve"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="equality"
                        // data={lineOfEquality}
                        stroke="#82ca9d"
                        name="Line of Equality"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default LorenzCurve;
