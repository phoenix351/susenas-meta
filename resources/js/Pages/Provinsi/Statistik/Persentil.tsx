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

const Persentil = ({
    pengeluaranPerkapita,
}: {
    pengeluaranPerkapita: number[];
}) => {
    // console.log(typeof pengeluaranPerkapita);

    const sortedData = pengeluaranPerkapita.sort((a, b) => a - b);

    // Function to calculate percentiles
    const getPercentile = (arr: number[], percentile: number) => {
        let index = Math.ceil((percentile / 100) * arr.length) - 1;
        return arr[index];
    };

    // Calculate decile boundaries
    let deciles: number[] = [];
    for (let i = 10; i <= 100; i += 10) {
        deciles.push(getPercentile(pengeluaranPerkapita, i));
    }

    // Calculate frequency for each decile
    let frequencies = new Array(10).fill(0);

    pengeluaranPerkapita.forEach((num) => {
        for (let i = 0; i < deciles.length; i++) {
            if (i === 0 && num <= deciles[i]) {
                frequencies[i]++;
                break;
            } else if (num > deciles[i - 1] && num <= deciles[i]) {
                frequencies[i]++;
                break;
            }
        }
    });
    console.log({ frequencies });

    return (
        <>
            <ResponsiveContainer width={"100%"} height={400}>
                <BarChart data={pengeluaranPerkapita}>
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
                    <Bar
                        type="monotone"
                        dataKey="income"
                        color="#8884d8"
                        name="Lorenz Curve"
                    />
                    <Bar
                        type="monotone"
                        dataKey="equality"
                        // data={lineOfEquality}
                        color="#82ca9d"
                        name="Line of Equality"
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default Persentil;
