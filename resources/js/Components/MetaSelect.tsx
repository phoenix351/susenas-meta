import { Form, Select } from "antd";
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
    options: Option[];
    name: string;
    onChange?: (value: any) => void;
}> = ({ options, name, onChange }) => {
    return (
        <Form.Item name={name} label={null} style={formItemStyle}>
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
