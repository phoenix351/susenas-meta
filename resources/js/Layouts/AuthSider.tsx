import { Menu, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import {
    DashboardOutlined,
    UsergroupAddOutlined,
    EditOutlined,
    AuditOutlined,
    MoneyCollectOutlined,
    ShoppingOutlined,
    DatabaseOutlined,
    BookOutlined,
    BuildOutlined,
    LineChartOutlined,
    ProjectOutlined,
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
    let menuItems: any = [
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
        {
            key: "panduan",
            icon: <BookOutlined />,
            onClick: () => handleMenuClick("panduan.index"),
            label: "Panduan",
        },
    ];
    if (user.role === "ADMIN" && user.kode_kabkot !== "00") {
        menuItems = [
            {
                key: "progress",
                icon: <DashboardOutlined />,
                onClick: () => handleMenuClick("progress"),
                label: "Progress",
            },

            {
                key: "entri",
                icon: <EditOutlined />,
                onClick: () => handleMenuClick("entri"),
                label: "Entri",
            },

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
            {
                key: "panduan",
                icon: <BookOutlined />,
                onClick: () => handleMenuClick("panduan.index"),
                label: "Panduan",
            },
        ];
    }
    if (user.role === "ADMIN" && user.kode_kabkot === "00") {
        menuItems = menuItems = [
            {
                key: "progress",
                icon: <DashboardOutlined />,
                onClick: () => handleMenuClick("progress"),
                label: "Progress",
            },
            {
                key: "provinsi",
                label: "Provinsi",
                icon: <BuildOutlined />,
                onClick: () => {},
                children: [
                    {
                        key: "statistik",
                        label: "Statistik",
                        icon: <LineChartOutlined />,
                        onClick: () => handleMenuClick("statistics"),
                    },
                    {
                        key: "calculate",
                        label: "Calculate",
                        icon: <ProjectOutlined />,
                        onClick: () => handleMenuClick("calculate"),
                    },
                ],
            },
            {
                key: "dashboard",
                icon: <DatabaseOutlined />,
                onClick: () => handleMenuClick("dashboard"),
                label: "Dashboard",
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
            {
                key: "panduan",
                icon: <BookOutlined />,
                onClick: () => handleMenuClick("panduan.index"),
                label: "Panduan",
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
                <Space
                    style={{
                        padding: 20,
                        height: 64,
                    }}
                >
                    <img src="/images/bps.png" width={36} />
                    <span
                        style={{
                            display: collapsed ? "none" : "",
                            fontWeight: 600,
                        }}
                    >
                        META SUSENAS
                    </span>
                </Space>
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
