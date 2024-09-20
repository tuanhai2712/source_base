import React, { useCallback, useState } from 'react';

import RangePicker from '@/components/Picker/RangePicker';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { convertLocalToUTCDate } from '@/utils';
import SinglePicker from '@/components/Picker/SinglePicker';

interface IProps {
  filterSelected: any;
  showAll?: boolean;
  mode?: 'single' | 'multiple' | undefined;
  action: (arr: { value: string; key: string }[]) => void;
}
enum TypeFilter {
  All = 0,
  CUSTOM,
  LAST7DAYS,
  LAST30DAYS,
}
export const TimeFilter: React.FC<IProps> = ({ filterSelected, action, mode = 'multiple', showAll }) => {
  const { t } = useTranslation();
  const [type, setType] = useState(TypeFilter.LAST30DAYS);
  const [openTooltip, setOpenTooltip] = useState(false);
  const handleSelectDate = useCallback(
    (option: number) => {
      let day = 0;
      if (option === TypeFilter.LAST7DAYS) {
        day = 7;
      }
      if (option === TypeFilter.LAST30DAYS) {
        day = 30;
      }
      const arr = [
        {
          value: String(
            new Date(convertLocalToUTCDate(dayjs().subtract(day, 'days').toLocaleString())).valueOf() / 1000,
          ),
          key: 'startTime',
        },
        {
          value: String(new Date(convertLocalToUTCDate(dayjs().toLocaleString(), true)).valueOf() / 1000),
          key: 'endTime',
        },
      ];
      action(arr);

      setType(option);
    },
    [action],
  );

  const handleSelectAll = () => {
    const arr = [
      {
        value: '',
        key: 'startTime',
      },
      {
        value: '',
        key: 'endTime',
      },
    ];
    action(arr);
    setType(TypeFilter.All);
  };
  const handleSelectCustomDate = (arr: { value: string; key: string }[]) => {
    action(arr);
    setType(TypeFilter.CUSTOM);
    setOpenTooltip(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpenTooltip(open);
  };
  return (
    <div className="card-item__quick-filter">
      {showAll && (
        <div
          className={type === TypeFilter.All ? `card-item__quick-filter-active` : `card-item__quick-filter-inactive`}
          onClick={() => handleSelectAll()}
        >
          {t('All')}
        </div>
      )}
      <div
        className={
          type === TypeFilter.LAST7DAYS ? `card-item__quick-filter-active` : `card-item__quick-filter-inactive`
        }
        onClick={() => handleSelectDate(TypeFilter.LAST7DAYS)}
      >
        {t('7 days')}
      </div>
      <div
        className={
          type === TypeFilter.LAST30DAYS ? `card-item__quick-filter-active` : `card-item__quick-filter-inactive`
        }
        onClick={() => handleSelectDate(TypeFilter.LAST30DAYS)}
      >
        {t('30 days')}
      </div>
      <Tooltip
        open={openTooltip}
        onOpenChange={handleOpenChange}
        placement="left"
        overlayInnerStyle={{
          width: 350,
        }}
        title={
          mode === 'single' ? (
            <SinglePicker
              callback={handleSelectCustomDate}
              currentTime={filterSelected.atMonth}
              showMonthYearPicker={false}
              enumKey="startTime"
            />
          ) : (
            <RangePicker
              callback={handleSelectCustomDate}
              startTime={filterSelected.startTime}
              endTime={filterSelected.endTime}
            />
          )
        }
        trigger="click"
      >
        <div
          className={type === TypeFilter.CUSTOM ? `card-item__quick-filter-active` : `card-item__quick-filter-inactive`}
        >
          {t('Custom')}
        </div>
      </Tooltip>
    </div>
  );
};

export default TimeFilter;
