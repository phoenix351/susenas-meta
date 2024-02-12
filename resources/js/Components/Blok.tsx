import { Space, Typography } from "antd";
import { ReactNode } from "react";
const { Text, Title } = Typography;
const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%",
};
const cellStyle = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    padding: "5px",
};
const darkCell = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    // textAlign: "center",
    backgroundColor: "#636f83",
    padding: "5px",
};
const centerCell: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    textAlign: "center",
    // backgroundColor: "#636f83",
    padding: "5px",
};
const blokStyle: React.CSSProperties = {
    backgroundColor: "#fc0",
    fontWeight: "700",
    padding: "5px",
};
const formItemStyle = {
    margin: "auto",
    padding: "5px",
};

const Blok: React.FC<{
    title: string;
    subtitle?: string;
    columnsCount?: number;
    columns?: string[];
    children?: ReactNode;
}> = ({ title, subtitle, columnsCount, columns, children }) => {
    return (
        <table style={tableStyle}>
            <thead
                style={{
                    backgroundColor: "#fc0",
                    textAlign: "center",
                }}
            >
                <tr>
                    <td colSpan={columnsCount} style={cellStyle}>
                        <Space direction="vertical">
                            <Title level={4}>{title}</Title>
                            <Text>{subtitle}</Text>
                        </Space>
                    </td>
                </tr>
            </thead>
            <tbody>
                {columns && (
                    <>
                        <tr>
                            {columns.map((column) => (
                                <th style={cellStyle}>{column}</th>
                            ))}
                        </tr>
                        <tr>
                            {Array.from(Array(columnsCount).keys()).map(
                                (num) => (
                                    <td style={centerCell}>({num + 1})</td>
                                )
                            )}
                        </tr>
                    </>
                )}
                {children}
            </tbody>
        </table>
    );
};
export default Blok;
