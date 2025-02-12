import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useState } from "react";
import { Head } from "@inertiajs/react";
import { ProgressData } from "@/types";
import {
    ReactElement,
    JSXElementConstructor,
    ReactPortal,
} from "react";
import { Typography } from "antd";
// import { Table } from "ant-table-extensions";
import ProgressChart from "./ProgressChart";

const { Title } = Typography;


const Index = () => {

    

    return (
        <>
            <Head title="Index" />
           <ProgressChart  key={"2-1"}/>
        </>
    );
};

Index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Index</h2>}
        selectedKey="progress"
        children={page}
    ></AuthenticatedLayout>
);
export default Index;
