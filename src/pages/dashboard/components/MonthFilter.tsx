import React, { useState } from 'react';

import SinglePicker from '@/components/Picker/SinglePicker';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import { FormatTime } from '@/constants';

interface IProps {
  filterSelected: {
    atMonth: string;
  };
  action: (arr: { value: string; key: string }[]) => void;
}

export const MonthFilter: React.FC<IProps> = ({ filterSelected, action }) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const handleSelectCustomDate = (arr: { value: string; key: string }[]) => {
    action(arr);
    setOpenTooltip(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpenTooltip(open);
  };
  return (
    <div className="card-item__quick-filter">
      <Tooltip
        open={openTooltip}
        onOpenChange={handleOpenChange}
        placement="left"
        title={
          <SinglePicker
            callback={handleSelectCustomDate}
            currentTime={filterSelected.atMonth}
            enumKey="atMonth"
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
          />
        }
        trigger="click"
      >
        <div className={`card-item__quick-filter-active`}>
          {filterSelected.atMonth ? dayjs.unix(parseInt(filterSelected.atMonth)).format(FormatTime.MonthYear) : ''}
        </div>
      </Tooltip>
    </div>
  );
};

export default MonthFilter;
