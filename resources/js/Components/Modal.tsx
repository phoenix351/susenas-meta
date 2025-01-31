import React, { PropsWithChildren, useState } from "react";
import { Button, Divider, Modal } from "antd";
import { ModalProps } from "@/types";


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
    noFooter,
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
            footer={noFooter?null:undefined}
        >
            <Divider />
            {children}
        </Modal>
    );
};

export default MyModal;
