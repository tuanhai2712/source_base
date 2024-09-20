import { Modal } from 'antd';

interface IModalConfirm {
  record?: any;
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  t?: any;
  // eslint-disable-next-line no-unused-vars
  onOk: (data?: any) => void;
}

const showModalConfirm = ({ record, title, content, okText, cancelText, t, onOk }: IModalConfirm) => {
  Modal.confirm({
    title,
    content,
    okText: okText || t.accept,
    cancelText: cancelText || t.cancel,
    onOk: () => {
      onOk(record);
    },
    okButtonProps: {
      style: {
        background: '#617bb8',
        color: 'white',
      },
    },
  });
};

export default showModalConfirm;
