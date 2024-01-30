import { usePage } from "@inertiajs/react";

import { PageProps } from "@/types";

import { Form, Input, Button } from "antd";
import { router } from "@inertiajs/react";
export default function UpdateProfileInformation({ auth }: PageProps) {
    const form = Form.useForm();
    console.log({ auth });

    const handleSave = (values: any) => {
        console.log(values);

        // router.visit(route("profile.update"), {
        //     method: "patch",
        //     data: values,
        // });
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>
                <p>
                    Update your account's profile information and email address.
                </p>
            </header>
            <Form
                onFinish={handleSave}
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
                    label={<label>username</label>}
                    name="Username"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input defaultValue={auth.user.username} />
                </Form.Item>
                <Form.Item
                    label={<label>email</label>}
                    name="email"
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                        {
                            type: "email",
                            message: "Please input valid email !",
                        },
                    ]}
                >
                    <Input defaultValue={auth.user.email} />
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
