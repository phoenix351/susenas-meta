import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";

const Statistics = ({ auth }: PageProps) => {
    return (
        <>
            <Head title="Statistics" />
            Statistics
        </>
    );
};

Statistics.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Statistics</h2>}
        selectedKey="statistics"
        children={page}
    ></AuthenticatedLayout>
);
export default Statistics;
