import ApplicationLogo from "@/Components/ApplicationLogo";
import { Menu, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import {
    DashboardOutlined,
    BarChartOutlined,
    ShoppingOutlined,
    FileOutlined,
    UsergroupAddOutlined,
    DatabaseOutlined,
    FileDoneOutlined,
    HomeOutlined,
    DesktopOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { User } from "@/types";
type AuthSiderProps = {
    user: User;
    collapsed: boolean;
    selectedKey: string;
    handleMenuClick: (key: string) => void;
};

const AuthSider: React.FC<AuthSiderProps> = ({
    user,
    collapsed,
    selectedKey,
    handleMenuClick,
}) => {
    let menuItems = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            onClick: () => handleMenuClick("dashboard"),
            label: "Dashboard",
        },

        {
            key: "entri",
            icon: <EditOutlined />,
            onClick: () => handleMenuClick("entri"),
            label: "Entri",
        },
    ];
    if (user.role !== "basic") {
        menuItems = [
            {
                key: "dashboard",
                icon: <DashboardOutlined />,
                onClick: () => handleMenuClick("dashboard"),
                label: "Dashboard",
            },

            {
                key: "entri",
                icon: <EditOutlined />,
                onClick: () => handleMenuClick("entri"),
                label: "Entri",
            },
        ];
    }
    return (
        <>
            {/* {collapsed && ( */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                    }}
                >
                    {/* <ApplicationLogo width="50px" preview={false} /> <br /> */}
                    <span
                        style={{
                            display: collapsed ? "none" : "block",
                            fontSize: "1.5rem",
                            fontFamily: "Roboto",
                            color: "#3219d4",
                            fontWeight: "bold",
                            marginLeft: "10px",
                        }}
                    >
                        Susenas-Meta
                    </span>
                </div>

                <Menu
                    style={{
                        backgroundColor: "transparent",
                        color: "#000",
                    }}
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                />
            </Sider>
            {/* )} */}
        </>
    );
};

export default AuthSider;
