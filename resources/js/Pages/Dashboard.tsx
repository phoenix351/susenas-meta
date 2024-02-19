import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
    WarningOutlined,
    StopOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
    useEffect(() => {}, []);

    return (
        <>
            <Head title="Dashboard" />
        </>
    );
};

Dashboard.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Dashboard</h2>}
        selectedKey="dashboard"
        children={page}
    ></AuthenticatedLayout>
);
export default Dashboard;
