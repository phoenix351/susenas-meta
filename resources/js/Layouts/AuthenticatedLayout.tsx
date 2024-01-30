import {
    useState,
    PropsWithChildren,
    ReactNode,
    lazy,
    Suspense,
    useEffect,
} from "react";
import { Divider, Layout, theme } from "antd";
const { Content } = Layout;
import { User } from "@/types";

import AuthSider from "./AuthSider";
import { AuthHeader } from "./AuthHeader";
import { router } from "@inertiajs/react";

export default function Authenticated({
    user,
    header,
    selectedKey,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode; selectedKey: string }>) {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleMenuClick = async (key: string) => {
        router.visit(route(key));
    };

    useEffect(() => {
        router.on("start", () => setLoading(true));
        router.on("finish", () => setLoading(false));
        // console.log({ selectedKey });
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AuthSider
                user={user}
                collapsed={collapsed}
                selectedKey={selectedKey}
                handleMenuClick={handleMenuClick}
            />
            <Layout>
                <AuthHeader
                    user={user}
                    collapsed={collapsed}
                    setCollapse={() => setCollapsed(!collapsed)}
                />
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        // background: colorBgContainer,
                        background: "transparent",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
