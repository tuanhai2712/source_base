import React from 'react';
import { Input, InputProps } from 'antd';

type IPropsInputNormal = {
  inputRef?: any;
} & InputProps;

export const InputNormal: React.FC<IPropsInputNormal> = ({ inputRef, ...rest }) => {
  return <Input ref={inputRef} {...rest} />;
};

export default InputNormal;
