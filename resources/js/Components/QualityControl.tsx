import { centerCell, cellStyle } from "@/CONSTANT";
import { Rincian } from "@/types";
import { Space, Form, InputNumber } from "antd";
import React from "react";
import RupiahInput from "./RupiahInput";
import { Rule } from "antd/es/form";

const QualityControl: React.FC<{
    rincian: Rincian;
    row_index: number;
    // label: number | string;
}> = ({ rincian, row_index }) => {
    return (
        <tr key={row_index}>
            <td style={{ ...centerCell, width: "30px" }}>{row_index + 1}</td>
            <td style={{ ...cellStyle, width: "auto" }}>{rincian.rincian}</td>

            <td style={{ ...cellStyle, width: "150px", textAlign: "right" }}>
                {rincian.id === 5 ? (
                    <>
                        <RupiahInput
                            key={row_index}
                            inputName={`blokqc_${rincian.id}`}
                        />
                    </>
                ) : (
                    <Space direction="vertical">
                        <Form.Item
                            name={`blokqc_${rincian.id}`}
                            label={null}
                            style={{
                                marginBottom: "5px",
                                textAlign: "center",
                            }}
                            rules={rincian.rules}
                        >
                            <InputNumber
                                className="custom-input-number" // Add a custom class
                                key={row_index}
                                style={{
                                    textAlign: "right",
                                    width: "100%",
                                    // backgroundColor: "red",
                                }}
                                formatter={(value) => {
                                    const numericValue = Number(value) ?? 0;
                                    const formattedValue = numericValue
                                        .toFixed(2)
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                                    return rincian.dataType === "decimal"
                                        ? formattedValue
                                        : String(numericValue);
                                }}
                            />
                        </Form.Item>
                    </Space>
                )}
            </td>
        </tr>
    );
};

export default QualityControl;
