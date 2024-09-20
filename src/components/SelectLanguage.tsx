import React from 'react';

import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { ArrowDownIcon } from '@/assets';
import i18n from '@/i18n';
import { ArrayFlag } from '@/i18n/types';

const { Option } = Select;

const SelectLanguage = () => {
  const langDefault = window.localStorage.getItem('language');

  const { t } = useTranslation();

  const onChangeLang = (e: string) => {
    window.localStorage.setItem('language', e);
    i18n.changeLanguage(e);
  };

  return (
    <Select
      placeholder={t('Select language')}
      className="dbs-select-lang"
      defaultValue={langDefault || ArrayFlag[0]?.type}
      suffixIcon={<ArrowDownIcon />}
      placement="bottomRight"
      onChange={onChangeLang}
      popupClassName={'dbs-select-lang__popup'}
    >
      {ArrayFlag.map((item) => (
        <Option value={item.type} key={item.type} className="option_icon">
          <item.icon />
          <div className="dbs_name_sellect">{item.name}</div>
        </Option>
      ))}
    </Select>
  );
};

export default SelectLanguage;
