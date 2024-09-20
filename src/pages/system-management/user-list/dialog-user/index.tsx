import React, { useEffect, useState } from 'react';
import { Dialog } from '@/components';
import { Tabs, TabsProps } from 'antd';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import UserInfo from './UserInfo';
import { getUserById, IUserList } from '@/services/system-management/user-list';
import ChangePassword from './ChangePassword';

interface IProps {
  openDialog: boolean;
  action: () => void;
  close: () => void;
  selectedRecord: IUserList;
}

const DialogUser = ({ openDialog, close, action, selectedRecord }: IProps) => {
  const [userInfo, serUserInfo] = useState<IUserList | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedRecord.id) {
      handleGetDataUserById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecord]);

  const getTitle = () => {
    if (isEmpty(selectedRecord)) {
      return t(`createNew`);
    }
    return t(`edit`);
  };

  const handleGetDataUserById = async () => {
    const res = await getUserById({
      id: selectedRecord.id,
    });
    serUserInfo(res.data);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t(`userInformation`),
      children: <UserInfo close={close} userData={userInfo} action={action} />,
    },
  ];

  if (!isEmpty(selectedRecord)) {
    items.push({
      key: '2',
      label: t(`changePassword`),
      children: <ChangePassword id={selectedRecord.id} action={action} />,
    });
  }

  return (
    <Dialog isOpen={openDialog} handleClose={close} footer={null} title={getTitle()}>
      <Tabs defaultActiveKey={items[0].key} items={items} />
    </Dialog>
  );
};

export default DialogUser;
