import { ChevronLeftIcon, ChevronRightIcon } from '@/assets';
import { FormatTime } from '@/constants';
import { convertLocalToUTCDate } from '@/utils';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';

interface IProps {
  callback: (arr: { value: string; key: string }[]) => void;
  currentTime: string;
  enumKey: string;
  maxDate?: any;
  showMonthYearPicker?: boolean;
}

const SinglePicker: React.FC<IProps> = ({ maxDate, callback, currentTime, showMonthYearPicker = true, enumKey }) => {
  const [currentDate, setCurrentDate] = useState<any>();
  useEffect(() => {
    if (currentTime) {
      setCurrentDate(new Date(parseInt(currentTime) * 1000).setHours(0, 0, 0, 0));
    }
  }, [currentTime]);
  const onChange = (date: any) => {
    setCurrentDate(date);

    const arr = [{ value: String(new Date(convertLocalToUTCDate(date, true)).valueOf() / 1000), key: enumKey }];
    callback(arr);
  };

  const renderMonthContent = (month: any, shortMonth: any, longMonth: any) => {
    return <span>{shortMonth}</span>;
  };

  return (
    <div className="main-picker">
      <DatePicker
        renderMonthContent={renderMonthContent}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth, decreaseYear, increaseYear }) => (
          <div style={{ margin: '5px 0px' }}>
            <button
              aria-label="Previous Month"
              className={'react-datepicker__navigation react-datepicker__navigation--previous'}
              onClick={showMonthYearPicker ? decreaseYear : decreaseMonth}
            >
              <ChevronLeftIcon />
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString('en', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              aria-label="Next Month"
              className={'react-datepicker__navigation react-datepicker__navigation--next'}
              onClick={showMonthYearPicker ? increaseYear : increaseMonth}
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
        selected={currentDate}
        onChange={onChange}
        inline
        showMonthYearPicker={showMonthYearPicker}
        dateFormat={showMonthYearPicker ? FormatTime.MonthYear : FormatTime.Date}
        maxDate={maxDate}
      />
    </div>
  );
};

export default SinglePicker;
