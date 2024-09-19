import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber } from "antd";
import _debounce from "lodash/debounce";
import { ValidateStatus } from "antd/es/form/FormItem";

interface NumberInputProps {
    // value: number;
    onChange?: (value: number | undefined) => void;
    [key: string]: any; // Allow additional props
    editable?: boolean;
    initialValue?: number;
    inputName: string;
    validateStatus?: ValidateStatus;
}

const NumberInput: React.FC<NumberInputProps> = ({
    inputName,
    onChange,
    initialValue,
    editable,
    validateStatus,
}) => {
    const [value, setValue] = useState(0);
    const handleChange = (nilai: any) => {
        setValue(nilai);
    };
    // useEffect(() => {
    // }, []);

    const debouncedOnChange = _debounce((value: any) => {
        handleChange(value);
        if (onChange) {
            onChange(value);
        }
    }, 600);

    return (
        <Form.Item
            name={inputName}
            initialValue={initialValue ?? undefined}
            style={{ marginBottom: "4px" }}
            validateStatus={validateStatus}
        >
            <InputNumber
                className="custom-input-number"
                readOnly={editable ? editable : false}
                min={0}
                step={0.01} // Set the step to allow decimal values
                formatter={(value: number | undefined) => {
                    if (value && value > 0)
                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return "";
                }}
                parser={(value: string | undefined) => {
                    const parsedValue = parseFloat(
                        String(value).replace(/[^\d.]/g, "") // Allow only digits and a dot for decimal
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

export default NumberInput;
