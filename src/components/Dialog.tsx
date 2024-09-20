import React from 'react';

import { Modal, ModalProps } from 'antd';

type IPropDialog = {
  isOpen: boolean;
  handleClose: () => void;
  children?: string | React.ReactNode;
  handleSubmit?: () => void;
} & ModalProps;

export const Dialog: React.FC<IPropDialog> = ({ isOpen, handleClose, handleSubmit, children, ...rest }) => {
  return (
    <Modal title="" centered open={isOpen} onOk={handleClose} onCancel={handleClose} {...rest}>
      {children}
    </Modal>
  );
};
