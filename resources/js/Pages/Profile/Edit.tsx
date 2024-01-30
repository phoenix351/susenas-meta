import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import { Space } from "antd";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";

const Edit = ({ auth }: PageProps) => {
    return (
        <>
            <Head title="Profile" />
            <Space direction="vertical" size="middle">
                <UpdateProfileInformationForm auth={auth} />

                <UpdatePasswordForm />
            </Space>
        </>
    );
};

Edit.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2>Profile</h2>}
        selectedKey=""
        children={page}
    ></AuthenticatedLayout>
);
export default Edit;
