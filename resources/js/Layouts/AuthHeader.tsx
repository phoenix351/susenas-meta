import { SetStateAction, useState } from "react";
import { Header } from "antd/es/layout/layout";
import { Button, Popover, Avatar, theme, Divider } from "antd";
import { User } from "@/types";
import { router } from "@inertiajs/react";
// icons
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

type AuthHeaderProps = {
    user: User;
    collapsed: boolean;
    setCollapse: () => void;
};

export const AuthHeader: React.FC<AuthHeaderProps> = ({
    user,
    collapsed,
    setCollapse,
}) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleLogout = () =>
        router.visit(route("logout"), { method: "post" });

    const userPopoverContent = (
        <ul>
            <div style={{ padding: "10px 20px" }}>
                <li
                    style={{
                        listStyleType: "none",
                        fontWeight: "bold",
                        marginBottom: "3px",
                    }}
                >
                    {user.nama_lengkap}
                </li>
                <li style={{ listStyleType: "none", marginBottom: "3px" }}>
                    {user.email}
                </li>
                <li
                    style={{
                        listStyleType: "none",
                        fontWeight: "400",
                        fontSize: "0.7rem",
                        marginBottom: "3px",
                    }}
                >
                    {user.nip}
                </li>
                <li
                    style={{
                        listStyleType: "none",
                        fontWeight: "400",
                        color: "GrayText",
                        marginBottom: "3px",
                    }}
                >
                    {user.bidang}
                </li>
                <li
                    style={{
                        listStyleType: "none",
                        fontWeight: "400",
                        color: "GrayText",
                        marginBottom: "3px",
                    }}
                >
                    {user.role}
                </li>
            </div>
            <Divider style={{ margin: "0 0" }} />
            <li
                style={{
                    listStyleType: "none",
                    cursor: "pointer",
                    backgroundColor: "",
                    paddingLeft: "20px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    color: "#000",
                }}
                onClick={() =>
                    router.visit(route("profile.edit"), { method: "get" })
                }
            >
                Profile
            </li>
            <li
                style={{
                    listStyleType: "none",
                    cursor: "pointer",
                    backgroundColor: "#4e54c8",
                    paddingLeft: "20px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    color: "#fff",
                }}
                onClick={handleLogout}
            >
                Logout <LogoutOutlined />
            </li>
        </ul>
    );

    return (
        <Header
            style={{
                padding: 0,
                backgroundColor: "#4e54c8",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapse()}
                style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                    color: "#fff",
                }}
            />

            <Popover
                content={userPopoverContent}
                placement="bottomRight"
                arrow={false}
                overlayStyle={{ width: "400px" }}
                overlayInnerStyle={{ padding: "0" }}
            >
                <Avatar
                    style={{
                        marginRight: "10px",
                        backgroundColor: "darksalmon",
                    }}
                >
                    {user.nama_lengkap[0]}
                </Avatar>
            </Popover>
        </Header>
    );
};
