import React, { useState } from "react";
import { Input, InputNumber } from "antd";

interface RupiahInputProps {
    // value: number;
    onChange: (value: number | undefined) => void;
    [key: string]: any; // Allow additional props
}

const RupiahInput: React.FC = () => {
    const [value, setValue] = useState(0);
    const handleChange = (nilai: any) => {
        setValue(nilai);
    };
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
                onChange={handleChange}
                // {...rest}
            />
        </div>
    );
};

export default RupiahInput;
