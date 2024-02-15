import { Link } from "@inertiajs/react";
import { Image, Space } from "antd";

interface ImageProps {
    width?: string;
    height?: string;
    className?: string;
    preview?: boolean;
    role?: string;
}
const imageProps: ImageProps = {
    width: "80px",
    height: "auto",
    preview: false,
};
export default function ApplicationLogo(props: ImageProps) {
    return (
        <Space style={{ marginBottom: "30px" }}>
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
                <Image {...imageProps} src="images/smokol-white.png" />
                <h1>SSN-META</h1>
            </Link>
        </Space>
    );
}
