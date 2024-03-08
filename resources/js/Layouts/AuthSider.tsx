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
    EyeOutlined,
    AuditOutlined,
    SettingOutlined,
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
        // {
        //     key: "dashboard",
        //     icon: <DashboardOutlined />,
        //     onClick: () => handleMenuClick("dashboard"),
        //     label: "Dashboard",
        // },

        {
            key: "entri",
            icon: <EditOutlined />,
            onClick: () => handleMenuClick("entri"),
            label: "Entri",
        },
    ];
    if (user.role === "ADMIN") {
        menuItems = [
            {
                key: "dashboard",
                icon: <DashboardOutlined />,
                onClick: () => handleMenuClick("dashboard"),
                label: "Monitoring",
            },

            {
                key: "entri",
                icon: <EditOutlined />,
                onClick: () => handleMenuClick("entri"),
                label: "Entri",
            },
            // {
            //     key: "kelola-entri",
            //     icon: <SettingOutlined />,
            //     onClick: () => handleMenuClick("kelola-entri"),
            //     label: "Kelola Entri",
            // },
            {
                key: "periksa",
                icon: <AuditOutlined />,
                onClick: () => handleMenuClick("periksa"),
                label: "periksa",
            },
            {
                key: "users",
                icon: <UsergroupAddOutlined />,
                onClick: () => handleMenuClick("users.index"),
                label: "Kelola Petugas",
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
