import { PropsWithChildren } from "react";
import { Layout, Space } from "antd";

const { Header, Footer, Sider, Content } = Layout;
const logoStyle: React.CSSProperties = {
    width: "100px",
    height: "auto",
};

export default function Guest({ children }: PropsWithChildren) {
    return (
        <Layout style={{ backgroundColor: "transparent" }}>
            <Content
                style={{
                    maxWidth: "500px",
                    margin: "auto",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {children}
            </Content>
        </Layout>
    );
}
