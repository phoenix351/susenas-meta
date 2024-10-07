import { Form, InputNumber } from "antd";
import MetaSelect from "./MetaSelect";
import RupiahInput from "./RupiahInput";
import { RincianWorksheet } from "@/types";
import { useEffect, useState } from "react";
import { cellStyle, centerCell } from "@/CONSTANT";
import { OptionProps, SelectProps } from "antd/es/select";
import { Rule } from "antd/es/form";
import WorksheetInput from "./WorksheetInput";

const WorksheetRow: React.FC<{
    props: RincianWorksheet;
    defaultValue: any;
}> = ({ props, defaultValue }) => {
    const [value, setValue] = useState<null | string | number>(defaultValue);
    const [activeChild, setActiveChild] = useState<JSX.Element[]>([]);
    const commonColumns = (
        <>
            <td style={centerCell}>{props.nomor}</td>
            <td style={cellStyle}>{props.rincian}</td>
        </>
    );

    useEffect(() => {
        if (props.children) {
            let activeChild = props.children
                .filter((item: RincianWorksheet, index: number) => {
                    let logic = false;
                    if (item.dependentValues) {
                        item.dependentValues.forEach((val) => {
                            if (val == value) {
                                logic = true;
                            }
                        });
                    }

                    return logic;
                })
                .map((child: any) => (
                    <tr key={props.id}>
                        <td style={centerCell}>{}</td>
                        <td style={cellStyle}>{child.rincian}</td>
                        <td style={centerCell}>
                            <WorksheetInput
                                type={child.type}
                                name={`wtf_${child.nomor}`}
                                options={child.options}
                                key={child.nomor}
                                customKey={child.id}
                                dependencies={child.dependencies}
                                rules={child.rules}
                            />
                        </td>
                    </tr>
                ));
            setActiveChild(activeChild);
        }
    }, [value, props.children]);
    return (
        <>
            <tr
                style={{
                    backgroundColor: props.id % 2 === 0 ? " #fffae6" : "",
                }}
            >
                {commonColumns}
                <td style={centerCell}>
                    <WorksheetInput
                        type={props.type}
                        name={`wtf_${props.id}`}
                        options={props.options}
                        key={props.id}
                        customKey={props.id}
                        children={props.children}
                        setValue={setValue}
                        dependencies={props.dependencies}
                        rules={props.rules}
                    />
                </td>
            </tr>
            {activeChild.map((child) => child)}
        </>
    );
};

export default WorksheetRow;
