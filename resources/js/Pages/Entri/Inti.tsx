import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import { PageProps, User, KondisiSummary, Summary } from "@/types";
import BarChart from "@/Components/Grafik/BarChart";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";
import { Card, Col, Form, Row, Space, Statistic } from "antd";
import {
    WarningOutlined,
    StopOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import EntriIntiForm from "@/Forms/EntriIntiSearch";

const Dashboard = () => {
    useEffect(() => {}, []);
    const [cariForm] = Form.useForm();
    const cariFinish = () => {};
    return (
        <>
            <Head title="Entri Kuesioner Inti" />
            <Space
                style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    minHeight: "300px",
                    padding: "10px 15px",
                }}
                direction="vertical"
            >
                <EntriIntiForm form={cariForm} onFinish={cariFinish} />
            </Space>
        </>
    );
};

Dashboard.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Dashboard</h2>}
        selectedKey="entri"
        children={page}
    ></AuthenticatedLayout>
);
export default Dashboard;
