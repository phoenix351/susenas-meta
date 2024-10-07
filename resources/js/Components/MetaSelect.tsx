import { Form, FormRule, Select, SelectProps } from "antd";
import React from "react";
interface Option {
    label: string;
    value: any;
}
const formItemStyle = {
    margin: "auto",
    padding: "5px",
};

const MetaSelect: React.FC<{
    options: SelectProps["options"];
    name: string;
    onChange?: (value: any) => void;
    rules?: FormRule[];
}> = ({ options, name, onChange, rules }) => {
    return (
        <Form.Item name={name} label={null} style={formItemStyle} rules={rules}>
            <Select
                allowClear
                showSearch
                optionFilterProp="label"
                options={options}
                onChange={onChange && ((value) => onChange(value))}
            />
        </Form.Item>
    );
};

export default MetaSelect;
