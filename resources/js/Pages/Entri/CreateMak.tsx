import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ReactElement, JSXElementConstructor, ReactPortal } from "react";
import { Button, Form, Space, message } from "antd";
import axios from "axios";
import Blok1_2 from "@/Forms/Mak/Blok1_2";
import { PageProps } from "@/types";
import { SaveOutlined } from "@ant-design/icons";

const Mak = () => {
    // const [cariForm] = Form.useForm();
    const tabContentStyle: React.CSSProperties = {
        backgroundColor: "#fff",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "15px",
        width: "100%",
    };
    // define forms
    const [form] = Form.useForm();

    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const [daftarArt, setDaftarArt] = useState([
        {
            id_ruta: "",
            id_art: "",
            nama: "Art-0",
            key: "Art-0",
            rekap: [
                { produksi: 0, beli: 0, total: 0 },
                { produksi: 0, beli: 0, total: 0 },
            ],
        },
    ]);

    const [messageApi, contextHolder] = message.useMessage();

    const blok1_2Finish = async (values: any) => {
        console.log({ values });
        // return;
        messageApi.open({
            type: "loading",
            key: "cari",
            content: "Menyimpan data...",
        });
        try {
            const url = route("entri.mak.store");
            const { data } = await axios.post(url, values, {
                headers: { "Content-Type": "application/json" },
            });
            // console.log({ st: data.status });

            if (data.status === "error") {
                messageApi.open({
                    type: "error",
                    key: "cari",
                    content: data.message,
                });
                return;
            }
            messageApi.open({
                type: "success",
                key: "cari",
                content: "Berhasil menyimpan",
            });
            // console.log({ data });

            router.get(route("entri.mak.edit", { id: data.id }));
        } catch (error) {
            messageApi.open({
                type: "error",
                key: "cari",
                content: "Oops terjadi kesalahan, silahkan hubungi admin",
            });
        }
    };

    // const [totalProduksi, setTotalProduksi] = useState(0);

    // initialize the form
    useEffect(() => {}, []);

    return (
        <>
            {contextHolder}
            <Head title="Entri Kuesioner Inti" />
            <Space
                style={{
                    // backgroundColor: "#fff",
                    width: "100%",
                    minHeight: "300px",
                    padding: "10px 15px",
                }}
                direction="vertical"
            >
                <Space
                    direction="horizontal"
                    style={{
                        width: "100%",
                        justifyContent: "end",
                        // backgroundColor: "red",
                    }}
                >
                    Last Saved :
                    {lastSaved?.toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false,
                    }) || "Never"}
                    <Button
                        onClick={async () => {
                            try {
                                // Submit all forms concurrently using Promise.all
                                const [form1] = await Promise.all([
                                    form.submit(),
                                ]);

                                // Now, all forms are submitted successfully
                                setLastSaved(new Date());
                            } catch (error) {
                                console.error("Error submitting forms:", error);
                                // Handle error if any of the forms fails to submit
                            }
                        }}
                    >
                        <SaveOutlined /> Simpan
                    </Button>
                </Space>
                <Blok1_2
                    tabContentStyle={tabContentStyle}
                    form={form}
                    onFinish={blok1_2Finish}
                    setDaftarArt={setDaftarArt}
                    editable={true}
                />
                {/* <Table dataSource={dazftarSampel} columns={columns} />; */}
            </Space>
        </>
    );
};

Mak.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Dashboard</h2>}
        selectedKey="entri"
        children={page}
    ></AuthenticatedLayout>
);
export default Mak;
