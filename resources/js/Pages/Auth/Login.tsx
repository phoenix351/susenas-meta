import GuestLayout from "@/Layouts/GuestLayout";
import BackgroundWave from "@/Components/BackgroundWave";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, usePage } from "@inertiajs/react";

import { Form, Input, Button, Image, message, Space } from "antd";
import { router, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const LoginForm: React.FC = () => {
    const { errors } = usePage().props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolders] = message.useMessage();
    const key = "updatable";

    const handleSubmit = async (values: any) => {
        // console.log("Login form submitted:", values);
        // setLoading(true);

        try {
            router.visit(route("login", { preserveState: true }), {
                method: "post",
                data: values,
                onStart: () => {
                    messageApi.open({
                        key,
                        type: "loading",
                        content: "Sedang login...",
                    });
                },
                onSuccess: () => {
                    messageApi.open({
                        key,
                        type: "success",
                        content: "Login berhasil",
                    });
                },
            });
        } catch (error) {
            messageApi.open({
                key,
                type: "error",
                content: errors.username,
                duration: 2,
            });
        }
    };
    interface ImageProps {
        width?: string;
        height?: string;
        className?: string;
        preview?: boolean;
    }
    const imageProps: ImageProps = {
        width: "80px",
        height: "auto",
        preview: false,
    };

    // open errors if any
    useEffect(() => {
        if (errors.username)
            messageApi.open({
                key,
                type: "error",
                content: errors.username,
                duration: 2,
            });
    }, []);

    return (
        <>
            {contextHolders}
            <BackgroundWave />

            <GuestLayout>
                <Head title="Log in" />

                {!loading ? (
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="login-form__form"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        // style={{ maxWidth: 600 }}
                        autoComplete="off"
                        method="post"
                        action={route("login")}
                    >
                        <ApplicationLogo />

                        <Form.Item
                            label={null}
                            name="username"
                            colon={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input placeholder="username" />
                        </Form.Item>
                        <Form.Item
                            label={null}
                            name="password"
                            colon={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="login-form__submit-btn bg-primary"
                            >
                                Log In
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    ""
                )}
            </GuestLayout>
        </>
    );
};

export default LoginForm;
