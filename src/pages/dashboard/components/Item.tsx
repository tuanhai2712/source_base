import { InfoCircleIcon } from '@/assets';
import { Tooltip } from 'antd';
import React from 'react';

const Item = ({ amount, text, description }: { amount?: string | number; text: string; description?: any }) => {
  return (
    <div className="item-wrapper">
      <div className="item-text">
        {text}
        {description && (
          <Tooltip title={description}>
            <InfoCircleIcon />
          </Tooltip>
        )}
      </div>
      {amount && <div className="item-amount">{amount}</div>}
    </div>
  );
};
export default Item;
