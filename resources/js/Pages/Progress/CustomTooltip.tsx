import { Card, Space } from "antd";
import { TooltipProps } from "recharts";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
}) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Type assertion
        console.log(data);

        return (
            <Card
                title={`[${data.fullcode}] ${data.name}`}
                bordered={false}
                style={{ width: 300 }}
            >
                <Space direction="vertical">
                    {payload.map((var_) => (
                        <Space>
                            <div
                                style={{
                                    backgroundColor: var_.color,
                                    width: 20,
                                    height: 20,
                                }}
                            />
                            <strong>{var_.dataKey}</strong>
                            {var_.value} (
                            {Number(
                                (Number(var_.value) * 100) /
                                    (data.tipe == "null" ? 10 : data.target)
                            ).toFixed(2)}{" "}
                            %)
                        </Space>
                    ))}
                </Space>
            </Card>
        );
    }
    return null;
};

export default CustomTooltip;
