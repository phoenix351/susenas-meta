import { Form, FormRule, Select, SelectProps } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
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
    validationStatus?: ValidateStatus;
    help?: string;
    hasFeedback?:boolean;
    dependencies?:string[];
}> = ({ options, name, onChange, rules, validationStatus, help,hasFeedback,dependencies }) => {
    return (
        <Form.Item
            name={name}
            label={null}
            style={formItemStyle}
            rules={rules}
            validateStatus={validationStatus}
            help={help}
            hasFeedback={hasFeedback}
            dependencies={dependencies}

        >
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
