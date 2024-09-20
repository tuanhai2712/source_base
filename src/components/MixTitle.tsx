import React from 'react';

import { InfoCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { RequiredIcon } from '@/assets';

interface IMixTitle {
  title?: string | null;
  isTooltip?: boolean;
  isRequired?: boolean;
  tooltipValue?: string | null;
  titleWeight?: number;
}

export const MixTitle: React.FC<IMixTitle> = ({ title, isTooltip, tooltipValue, titleWeight, isRequired }) => {
  return (
    <div className="mix-title-index">
      <span className="mix-title-index__title">{title}</span>
      {isTooltip && (
        <Tooltip title={tooltipValue ?? ''} className="mix-title-index__tooltip">
          <InfoCircleFilled />
        </Tooltip>
      )}
      {isRequired && (
        <div className="mix-title-index__required">
          <RequiredIcon />
        </div>
      )}
    </div>
  );
};
