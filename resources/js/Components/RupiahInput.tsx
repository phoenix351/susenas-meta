import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber } from "antd";
import _debounce from "lodash/debounce";

interface RupiahInputProps {
    // value: number;
    onChange: (value: number | undefined) => void;
    [key: string]: any; // Allow additional props
}

const RupiahInput: React.FC<{
    inputName: string;
    onChange?: any;
}> = ({ inputName, onChange }) => {
    const [value, setValue] = useState(0);
    const handleChange = (nilai: any) => {
        setValue(nilai);
    };
    // useEffect(() => {
    // }, []);

    const debouncedOnChange = _debounce((value: any) => {
        handleChange(value);
        onChange(value);
    }, 600);

    return (
        <Form.Item name={inputName}>
            <InputNumber
                min={0}
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
                onChange={(value: any) => {
                    debouncedOnChange(value);
                }}
                // {...rest}
            />
        </Form.Item>
    );
};

export default RupiahInput;
