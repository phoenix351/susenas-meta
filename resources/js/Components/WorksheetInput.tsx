import { RincianWorksheet, WorksheetRuleProps } from "@/types";
import { SelectProps, Form, InputNumber, message } from "antd";
import MetaSelect from "./MetaSelect";
import RupiahInput from "./RupiahInput";
import { Rule } from "antd/es/form";
import { useState } from "react";
import { ValidateStatus } from "antd/es/form/FormItem";
import { stat } from "fs";

const WorksheetInput: React.FC<{
    type: string;
    name: string;
    customKey: number; // Use a different name
    options?: SelectProps["options"];
    children?: RincianWorksheet[];
    setValue?: (value: any) => void;
    rules?: WorksheetRuleProps;
    dependencies?: string[];
}> = ({
    type,
    name,
    options,
    customKey,
    children,
    setValue,
    dependencies,
    rules,
}) => {
    const [validationMessage, setValidationMessage] = useState("");
    const [validationState, setValidationState] = useState<ValidateStatus>("");
    const [hasFeedback, setHasFeedback] = useState(false);

    const getRules = (
        { getFieldValue }: { getFieldValue: (arg0: string) => any },
        ruleName: "less" | "greater" | "less equal" | "greater equal" | "equal",
        message: string,
        status: ValidateStatus,
        dependentName?: string,
        dependentValue?: number
    ) => ({
        validator(rule: any, value: number, callback: any) {
            // let dependentValue;
            if (dependentName) {
                dependentValue = getFieldValue(dependentName);
            }

            if (!dependentValue) {
                // console.log({ dependentName, name, message });

                setValidationMessage("Validasi error, contact admin!");
                setValidationState(status);
                setHasFeedback(false);
                return Promise.resolve();
            }
            let test = true;
            if (ruleName == "less") {
                test = value < dependentValue;
            } else if (ruleName == "equal") {
                test = value == dependentValue;
            } else if (ruleName == "greater") {
                test = value > dependentValue;
            } else if (ruleName == "less equal") {
                test = value <= dependentValue;
            } else if (ruleName == "greater equal") {
                test = value >= dependentValue;
            }
            console.log({ value, dependentValue, test, ruleName });
            if (value === null || value === undefined) {
                setValidationMessage("");
                setValidationState("");
                setHasFeedback(false);
                return Promise.resolve();
            }
            if (!test) {
                setValidationMessage(message);
                setValidationState(status);
                setHasFeedback(true);
                return Promise.resolve();
            }
            setValidationMessage("");
            setValidationState("");
            setHasFeedback(false);
            return Promise.resolve();
        },
    });
    let currentRules:
        | (({ getFieldValue }: { getFieldValue: (arg0: string) => any }) => {
              validator(rule: any, value: number, callback: any): Promise<void>;
          })[]
        | Rule[]
        | undefined = [];
    if (rules) {
        const { ruleName, message, status, dependentName, dependentValue } =
            rules;
        // console.log({ ruleName, message, status, dependentName });

        currentRules = [
            ({ getFieldValue }: { getFieldValue: (arg0: string) => any }) =>
                getRules(
                    { getFieldValue },
                    ruleName,
                    message,
                    status,
                    dependentName,
                    dependentValue
                ),
        ];
    } else {
        currentRules = [];
    }
    const inputComponents: { [type: string]: JSX.Element } = {
        number: (
            <Form.Item
                name={name}
                label={null}
                dependencies={dependencies}
                rules={currentRules}
                validateStatus={validationState}
                help={validationMessage}
                hasFeedback={hasFeedback}
            >
                <InputNumber />
            </Form.Item>
        ),
        binary: (
            <MetaSelect
                name={name}
                options={[
                    { label: "[1] YA", value: 1 },
                    { label: "[5] TIDAK", value: 5 },
                ]}
                onChange={setValue && ((value) => setValue(value))}
            />
        ),
        rupiah: <RupiahInput inputName={name} editable={customKey === 26} />, // Use customKey
        multi: (
            <MetaSelect
                name={name}
                options={options ? options : []}
                onChange={setValue && ((value) => setValue(value))}
            />
        ),
    };
    return inputComponents[type];
};

export default WorksheetInput;
