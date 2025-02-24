import { Card, Space } from "antd";
import { TooltipProps } from "recharts";

const PersentilTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
}) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Type assertion
        console.log({payload});
        
        return (
            <Card
                title="Rentang Pengeluaran"
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
                            <strong>{var_.payload.range}</strong>
                            
                            <strong>{var_.payload.value} Ruta</strong>
                        </Space>
                    ))}
                </Space>
            </Card>
        );
    }
    return null;
};

export default PersentilTooltip;
