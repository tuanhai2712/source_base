import React from 'react';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import type { PasswordProps } from 'antd/es/input';

type IPropsInputPassword = {} & PasswordProps;

export const InputPassword: React.FC<IPropsInputPassword> = ({ ...rest }) => {
  return (
    <Input.Password
      {...rest}
      maxLength={30}
      iconRender={(visible: boolean) =>
        visible ? (
          <Tooltip title="Hide">
            <EyeTwoTone />
          </Tooltip>
        ) : (
          <Tooltip title="Show">
            <EyeInvisibleOutlined />
          </Tooltip>
        )
      }
    />
  );
};

export default InputPassword;
