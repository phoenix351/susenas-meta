import React from "react";
import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons";

const ScrollToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // enables smooth scrolling
        });
    };

    return (
        <Button
            type="primary"
            shape="circle"
            icon={<UpOutlined />}
            onClick={scrollToTop}
            style={{
                position: "fixed",
                bottom: 50,
                right: 20,
                zIndex: 1000,
            }}
        />
    );
};

export default ScrollToTopButton;
