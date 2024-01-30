import { router } from "@inertiajs/react";
import { Form, Input, Button, message } from "antd";

export default function UpdatePasswordForm() {
    const [messageApi, contextHolder] = message.useMessage();
    const saveKey = "updatable";
    const updatePassword = (values: any) => {
        router.put(route("password.update"), values, {
            preserveState: true,
            preserveScroll: true,
            onStart: () => {
                messageApi.open({
                    key: saveKey,
                    content: "Menyimpan perubahan...",
                    type: "loading",
                });
            },
            onSuccess: () => {
                messageApi.open({
                    key: saveKey,
                    content: "Berhasil menyimpan perubahan...",
                    type: "success",
                });
            },
            onError: () => {
                messageApi.open({
                    key: saveKey,
                    content: "current password is incorrect",
                    type: "error",
                });
            },
        });
    };

    return (
        <section>
            {contextHolder}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>
            <Form
                onFinish={updatePassword}
                className="login-form__form"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
                method="post"
                action={route("login")}
            >
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
                <Form.Item
                    label={<label>current password</label>}
                    name="current_password"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Please input your current password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="enter your current password!" />
                </Form.Item>
                <Form.Item
                    label={<label>new password</label>}
                    name="password"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Please input your new password!",
                        },
                        {
                            min: 8,
                            message:
                                "Minimal length for password is 8 characters!",
                        },
                    ]}
                >
                    <Input.Password placeholder="enter your password!" />
                </Form.Item>
                <Form.Item
                    label="password_confirmation"
                    name="password_confirmation"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Please input your password confirmation!",
                        },
                        ({ getFieldValue }: any) => ({
                            validator(rule: any, value: any) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                )
                                    return Promise.resolve();
                                return Promise.reject(
                                    new Error(
                                        "The Password Confirmation didn't match"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="password again" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form__submit-btn bg-primary"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}
