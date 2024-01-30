import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";

import { Form, Input, Button } from "antd";
import { Head, Link, router } from "@inertiajs/react";
import { validateHeaderName } from "http";

export default function Register() {
    const [form] = Form.useForm();

    const registerSubmitHandler = (values: any) => {
        console.log(values);
        router.visit(route("register"), {
            method: "post",
            data: values,
        });
    };
    return (
        <GuestLayout>
            <Head title="Register" />

            <Form
                onFinish={registerSubmitHandler}
                className="login-form__form"
                name="basic"
                labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                style={{ width: "30rem" }}
                autoComplete="off"
                method="post"
                action={route("login")}
            >
                <Form.Item
                    label="name"
                    name="name"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input placeholder="username" />
                </Form.Item>
                <Form.Item
                    label="email"
                    name="email"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                        {
                            type: "email",
                            message: "Please enter valid email!",
                        },
                    ]}
                >
                    <Input placeholder="user@mail.com" />
                </Form.Item>
                <Form.Item
                    label="password"
                    name="password"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="password" />
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
                    <Button htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        </GuestLayout>
    );
}
