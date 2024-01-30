import { Image } from "antd";

interface ImageProps {
    width?: string;
    height?: string;
    className?: string;
    preview?: boolean;
    role?: string;
}
export default function ApplicationLogo(props: ImageProps) {
    return (
        <Image
            src={"/images/logo-ct.png"}
            alt="Segelas Es Teh"
            {...props}
            role="img"
        />
    );
}
