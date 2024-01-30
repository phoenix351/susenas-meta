import React, { PropsWithChildren, useState } from "react";
import { Button, Divider, Modal } from "antd";

interface ModalProps {
    title: string;
    openModal: boolean;
    handleOk: () => void;
    confirmLoadingModal: boolean;
    handleCancel: () => void;
    okText?: string;
    cancelText?: string;
    maskClosable?: boolean;
    width?: number | string;
}
const MyModal = ({
    title,
    openModal,
    handleOk,
    confirmLoadingModal,
    handleCancel,
    okText,
    cancelText,
    width,
    maskClosable,
    children,
}: PropsWithChildren<ModalProps>) => {
    return (
        <Modal
            title={title}
            open={openModal}
            onOk={handleOk}
            confirmLoading={confirmLoadingModal}
            onCancel={handleCancel}
            cancelText={cancelText}
            okText={okText}
            mask={true}
            maskClosable={maskClosable}
            width={width}
        >
            <Divider />
            {children}
        </Modal>
    );
};

export default MyModal;
