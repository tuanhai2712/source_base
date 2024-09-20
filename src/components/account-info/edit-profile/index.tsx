import { Tabs, TabsProps } from 'antd';
import React from 'react';

import ChangePasswordProfile from './ChangePasswordProfile';
import { useTranslation } from 'react-i18next';
import InfoProfile from './InfoProfile';
import { IProfile } from '@/services/user';
import { Dialog } from '@/components/Dialog';

interface IProps {
  open: boolean;
  setIsOpenUserAccountInfo: any;
  onCancel: () => void;
  profile: IProfile;
}

const EditProfile = ({ open, setIsOpenUserAccountInfo, onCancel, profile }: IProps) => {
  const { t } = useTranslation();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `${t('profile.profileInformation')}`,
      children: (
        <InfoProfile onCancel={onCancel} setIsOpenUserAccountInfo={setIsOpenUserAccountInfo} profile={profile} />
      ),
    },
    {
      key: '2',
      label: `${t('changePassword')}`,
      children: <ChangePasswordProfile setIsOpenUserAccountInfo={setIsOpenUserAccountInfo} id={profile?.id} />,
    },
  ];

  return (
    <>
      <Dialog isOpen={open} handleClose={onCancel} footer={null} title={`${t('profile.editProfile')}`}>
        <Tabs defaultActiveKey={items[0].key} items={items} />
      </Dialog>
    </>
  );
};
export default EditProfile;
