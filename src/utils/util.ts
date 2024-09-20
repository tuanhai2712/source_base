/* eslint-disable import/no-extraneous-dependencies */
import queryString from 'query-string';

import {
  FormatTime,
  ObjMemberGradeFilter,
  errorCode,
  listAcitivityLogModule,
  listStatusClaimRequest,
  listStatusUser,
} from '@/constants';
import { LIST_ROLE, SelectedOptions } from '@/constants/roleList';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validatePassword = (password: string) => {
  return String(password).match(/^(?=.*\d)(?=.*[A-Z]).{8,30}/);
};

export const handleErrorCode = (response: any) => {
  return errorCode[response.errorCode as keyof typeof errorCode];
};

export const modifyDirectionOrder = (value: string | undefined) => {
  if (value === 'ascend') return 'ASC';
  if (value === 'descend') return 'DESC';
  return '';
};
export const revertDirectionOrder = (value: string) => {
  if (value === 'ASC') return 'ascend';
  return 'descend';
};

export const handleValueFilter = (value: string | undefined) => {
  if (value === 'all') return '';
  return value;
};

export const handleStringify = (obj: any, history: any) => {
  const stringifySymbol = queryString.stringify(obj, { skipEmptyString: true });
  history.push({ pathname: window.location.pathname, search: stringifySymbol });
};

export const formatNumber = (vl: number, valueUnit?: string, notSkipEmptyValue?: boolean, primary?: boolean) => {
  const value = Number(vl.toFixed(3));
  if (value && !notSkipEmptyValue) {
    return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: primary ? 2 : 6 })} ${
      valueUnit ?? ''
    }`;
  }
  if (notSkipEmptyValue) {
    return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: primary ? 2 : 6 })} ${
      valueUnit ?? ''
    }`;
  }
  return 0;
};

let b64DecodeUnicode = (str: string) =>
  decodeURIComponent(
    Array.prototype.map.call(atob(str), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''),
  );

export const parseJwt = (token: string) =>
  JSON.parse(b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')));

export const handleNumber = (value: number | undefined) => {
  if (!value || value === 0) {
    return '';
  }
  if (value > 0) {
    return '+';
  }
};

export const hideEmail = (email: string) => {
  return email.replace(/(.{3})(.*)(?=@)/, function (gp1, gp2, gp3) {
    for (let i = 0; i < gp3.length; i++) {
      // eslint-disable-next-line no-param-reassign
      gp2 += '*';
    }
    return gp2;
  });
};

export const formatCurrencyToNumber = (value: string) => {
  if (value) {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  }
  return null;
};

export const convertLocalToUTCDate = (date: string, endDate?: boolean) => {
  if (!date) {
    return date;
  }
  let newDate = new Date(date);
  let utcDate = Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0);
  if (endDate) {
    utcDate = Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 23, 59, 59);
  }
  newDate = new Date(utcDate);
  return newDate.toUTCString();
};

export const convertUTCToLocalDate = (date: string, endDate?: boolean) => {
  if (!date) {
    return date;
  }
  let newDate = new Date(date);
  let utcDate = new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), 0, 0, 0);
  if (endDate) {
    utcDate = new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), 23, 59, 59);
  }
  newDate = new Date(utcDate);
  return newDate;
};

export const formatDateTime = (date: string | Dayjs = '', hasTime: boolean = false) => {
  return (
    date &&
    dayjs
      .utc(date)
      .local()
      .format(hasTime ? FormatTime.DateFull : FormatTime.Date)
  );
};

export const getStatusUserByStatusKey = (key: string) => {
  const result = listStatusUser.find((i) => i.key === key);
  return result?.name;
};

export const getMemberGradeByKey = (key: string) => {
  const result = ObjMemberGradeFilter.items.find((i) => i.key === key);
  return result?.name || '-';
};

export const formatExchange = (arr: string[]) => {
  let text = '';
  arr.forEach((element, idx) => {
    text = text + `${element.charAt(0).toUpperCase() + element.slice(1)}`;
    if (idx < arr.length - 1) {
      text = text + `, `;
    }
  });
  return text;
};

export const getStatusClaimRequestByStatusKey = (key: number) => {
  const result = listStatusClaimRequest.find((i) => i.key === key);
  return result;
};

export const getAcitivityLogModuleName = (key: string) => {
  const result = listAcitivityLogModule.find((i) => i.key === key);
  return result?.name;
};

export const truncateMiddleText = (text: string, ellipsis = '...', start = 6, end = 6): string => {
  if (text?.length > start + end) {
    return text.substr(0, start) + ellipsis + text.substr(end * -1);
  }

  return text;
};

export const onChangeAll = ({
  checked,
  setSelectedOptions,
}: {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  setSelectedOptions: (_value: any) => void;
}) => {
  const objectChange: { [key: string]: string[] } = {};
  if (checked) {
    LIST_ROLE().forEach((item) => {
      item.options.forEach((el) => {
        objectChange[el.value] = el.children.map((e) => e.value);
      });
    });
    setSelectedOptions(objectChange);
    return;
  }
  setSelectedOptions({});
};

export const handleCheckIndeterminateAll = ({ selectedOptions }: { selectedOptions: SelectedOptions }) => {
  let totalCount = 0;
  for (const key in selectedOptions) {
    if (Object.prototype.hasOwnProperty.call(selectedOptions, key)) {
      totalCount += selectedOptions[key]?.length || 0;
    }
  }
  return !!totalCount;
};
export const checkedAll = (selectedOptions: SelectedOptions) => {
  let totalCount = 0;

  for (const item of LIST_ROLE()) {
    if (item.options) {
      for (const el of item.options) {
        if (el.children) {
          totalCount += el.children.length;
        }
      }
    }
  }
  const totalCountValue = Object.values(selectedOptions).reduce((acc, value) => acc + value.length, 0);

  return totalCountValue === totalCount;
};

export const convertUtcToLocalTime = (time: string, format = 'YYYY/MM/DD') => {
  if (!time) {
    return '';
  }
  return dayjs.utc(time).local().format(format);
};

export const convertLocaleTimeToUtcTime = (time: string | Date | Dayjs) => {
  if (!time) {
    return '';
  }
  return dayjs(time).toISOString();
};
