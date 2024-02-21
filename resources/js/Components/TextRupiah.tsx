import React from "react";
import { Space, Typography } from "antd";
const { Text } = Typography;

const TextRupiah: React.FC<{ value: number; color: string }> = ({
    value,
    color,
}) => {
    return (
        <Space
            style={{
                width: "100%",
                textAlign: "right",
                justifyContent: "end",
            }}
        >
            <Text
                style={{
                    color: color,
                    paddingLeft: "11px",
                    paddingRight: "11px",
                }}
            >
                {`Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {/* {value} */}
            </Text>
        </Space>
    );
};

export default TextRupiah;
