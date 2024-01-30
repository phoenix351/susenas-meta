import React, { useState } from "react";
import { Table, Input, Button, Form, InputNumber } from "antd";

interface EditableCellProps {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: "number" | "text";
    record: any; // Replace 'any' with the type of your record
    index: number;
    children: React.ReactNode;
    restProps: any;
    rules?: [];
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const TableComponent = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [data, setData] = useState([
        {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
        },
        {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
        },
        {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
        },
    ]);

    const isEditing = (record:any) => record.key === editingKey;

    const edit = (record:any) => {
        form.setFieldsValue({
            name: "",
            age: "",
            address: "",
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key:string) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            editable: true,
        },
        {
            title: "Age",
            dataIndex: "age",
            editable: true,
        },
        {
            title: "Address",
            dataIndex: "address",
            editable: true,
        },
        {
            title: "Operation",
            dataIndex: "operation",
            render: (_:any, record:any) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </a>
                        <a href="javascript:;" onClick={cancel}>
                            Cancel
                        </a>
                    </span>
                ) : (
                    <a onClick={() => edit(record)}>Edit</a>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record:any) => ({
                record,
                inputType: "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
            />
        </Form>
    );
};

export default TableComponent;
