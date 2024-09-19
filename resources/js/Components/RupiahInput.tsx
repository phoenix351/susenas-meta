import React, { useState } from "react";
import { Form, InputNumber } from "antd";
import _debounce from "lodash/debounce";
import { ValidateStatus } from "antd/es/form/FormItem";

interface RupiahInputProps {
    // value: number;
    onChange?: (value: number | undefined) => void;
    [key: string]: any; // Allow additional props
    readOnly?: boolean;
    initialValue?: number;
    label?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    validateStatus?: ValidateStatus;
}

const RupiahInput: React.FC<RupiahInputProps> = ({
    inputName,
    onChange,
    initialValue,
    readOnly,
    label,
    style,
    disabled,
    validateStatus,
}) => {
    const [value, setValue] = useState(0);
    const handleChange = (nilai: any) => {
        nilai = parseInt(nilai);
        setValue(nilai);
    };

    const debouncedOnChange = _debounce((value: any) => {
        handleChange(value);
        if (onChange) {
            onChange(value);
        }
    }, 600);

    return (
        <Form.Item
            name={inputName}
            label={label}
            initialValue={initialValue ? Math.round(Number(initialValue)) : 0}
            style={{ marginBottom: "4px" }}
            validateStatus={validateStatus}
        >
            <InputNumber
                disabled={disabled}
                className="custom-input-number"
                readOnly={readOnly}
                style={{ width: "100%", textAlign: "right", ...style }}
                min={0}
                max={1000000000}
                formatter={(value: number | undefined) => {
                    if (value == 0) return "";
                    return `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }}
                parser={(displayValue: string | undefined) => {
                    if (!displayValue) return 0;
                    const parsedValue = Math.round(
                        Number(String(displayValue).replace(/[^\d]/g, ""))
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
