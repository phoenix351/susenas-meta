import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PDFViewer } from "@react-pdf/renderer";
import { JSXElementConstructor, ReactElement, ReactPortal } from "react";

const index = () => {
    return (
        <>
            klik{" "}
            <a
                target="_blank"
                href="https://license365bps-my.sharepoint.com/:b:/g/personal/ponim_license365bps_onmicrosoft_com/ESOO4BibnrtCg_Re4aHIuLgBelrGi64STCY4kozFL2prMw?e=aeClMf"
            >
                disini
            </a>{" "}
            untuk mengunduh panduan
        </>
    );
};

index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">index</h2>}
        selectedKey="panduan.index"
        children={page}
    ></AuthenticatedLayout>
);
export default index;
