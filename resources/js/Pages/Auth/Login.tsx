import GuestLayout from "@/Layouts/GuestLayout";
import BackgroundWave from "@/Components/BackgroundWave";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, usePage } from "@inertiajs/react";

import { Form, Input, Button, Image, message } from "antd";
import { router, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

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
                content: errors.email,
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
        if (errors.email)
            messageApi.open({
                key,
                type: "error",
                content: errors.email,
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
                        onFinish={handleSubmit}
                        className="login-form__form"
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        autoComplete="off"
                        method="post"
                        action={route("login")}
                    >
                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                            style={{ justifyContent: "center" }}
                        >
                            <Link
                                href="/"
                                style={{
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    fontSize: "1.3rem",
                                }}
                            >
                                <Image
                                    {...imageProps}
                                    src="images/smokol-white.png"
                                />
                                <h1>Smokol</h1>
                            </Link>
                        </Form.Item>
                        <Form.Item
                            label={
                                <label style={{ color: "#fff" }}>email</label>
                            }
                            name="email"
                            colon={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label style={{ color: "#fff" }}>
                                    password
                                </label>
                            }
                            name="password"
                            colon={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
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
