import React from "react";
import { Input, InputNumber } from "antd";

interface RupiahInputProps {
    value: number;
    onChange: (value: number | undefined) => void;
    [key: string]: any; // Allow additional props
}

const RupiahInput: React.FC<RupiahInputProps> = ({
    value,
    onChange,
    ...rest
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <InputNumber
                style={{ width: "100%", textAlign: "right" }}
                formatter={(value: any) =>
                    `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value: any) => {
                    if (!value) return undefined;
                    const parsedValue = parseInt(
                        value.replace(/[^\d]/g, ""),
                        10
                    );
                    return isNaN(parsedValue) ? 0 : parsedValue;
                }}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </div>
    );
};

export default RupiahInput;
