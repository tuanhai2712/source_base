import React from 'react';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type IPropsButtonExport = {
  action: () => void;
  label: string;
};

export const ButtonExport: React.FC<IPropsButtonExport> = ({ action, label }) => {
  return (
    <Button type="dashed" icon={<CloudDownloadOutlined />} onClick={action}>
      {label}
    </Button>
  );
};

export default ButtonExport;
