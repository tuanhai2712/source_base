import { Layout, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { useSelector } from 'react-redux';
import { userProfileState } from '@/store/user/selector';
import AccountInfo from '../account-info';
import EditProfile from '../account-info/edit-profile';
import { ArrayFlag } from '@/i18n/types';
import i18n from 'i18next';

const { Header } = Layout;
const { Option } = Select;

export const MainHeader: React.FC<any> = () => {
  const [locale, setLocale] = useState('');
  const [isOpenUserAccountInfo, setIsOpenUserAccountInfo] = useState<boolean>(false);
  const profileUser = useSelector(userProfileState);

  const onCancel = () => {
    setIsOpenUserAccountInfo(false);
  };

  useEffect(() => {
    const currenLang = localStorage.getItem('locale');
    setLocale(currenLang || 'vi');
  }, []);

  const handleSetLocale = (value: string) => {
    i18n.changeLanguage(value);
    setLocale(value);
    localStorage.setItem('locale', value);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <Header className="main-header-index">
      <Breadcrumbs />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Select
          style={{ marginRight: '20px' }}
          className="w-[100px] select-locale"
          value={locale}
          onChange={handleSetLocale}
        >
          {ArrayFlag.map((item) => {
            return (
              <Option key={item.value}>
                <Space>
                  <div className="flex items-center" style={{ color: 'black' }}>
                    <img src={item.icon} alt={item.name} style={{ width: '24px', marginRight: '8px' }} />
                    {item.name}
                  </div>
                </Space>
              </Option>
            );
          })}
        </Select>
        <AccountInfo setIsOpenUserAccountInfo={setIsOpenUserAccountInfo} profile={profileUser} />
      </div>
      {isOpenUserAccountInfo && (
        <EditProfile
          open={isOpenUserAccountInfo}
          setIsOpenUserAccountInfo={setIsOpenUserAccountInfo}
          onCancel={onCancel}
          profile={profileUser}
        />
      )}
    </Header>
  );
};
