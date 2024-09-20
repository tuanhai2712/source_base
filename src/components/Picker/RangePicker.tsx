import { ArrowRightIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@/assets';
import { convertLocalToUTCDate, convertUTCToLocalDate, formatDateTime } from '@/utils';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';

interface IProps {
  callback: (arr: { value: string; key: string }[]) => void;
  startTime: string;
  endTime: string;
}

const RangePicker: React.FC<IProps> = ({ callback, startTime, endTime }) => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  useEffect(() => {
    if (startTime && endTime) {
      const start = String(new Date(parseInt(startTime) * 1000));
      const end = String(new Date(parseInt(endTime) * 1000));
      setStartDate(convertUTCToLocalDate(start));
      setEndDate(convertUTCToLocalDate(end, true));
    }
  }, [startTime, endTime]);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    if (start && end) {
      const arr = [
        { value: String(new Date(convertLocalToUTCDate(start)).valueOf() / 1000), key: 'startTime' },
        { value: String(new Date(convertLocalToUTCDate(end, true)).valueOf() / 1000), key: 'endTime' },
      ];
      callback(arr);
    }
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="main-picker">
      <div className="main-picker__view">
        <div className="view-item">
          <span>{startDate ? formatDateTime(dayjs(startDate)) : ''}</span>
          <ArrowRightIcon />
        </div>
        <div className="view-item">
          <span>{endDate ? formatDateTime(dayjs(endDate)) : ''}</span>
          <CalendarIcon />
        </div>
      </div>
      <DatePicker
        renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
          <div style={{ margin: '5px 0px' }}>
            <button
              aria-label="Previous Month"
              className={'react-datepicker__navigation react-datepicker__navigation--previous'}
              onClick={decreaseMonth}
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
              onClick={increaseMonth}
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
  );
};

export default RangePicker;
