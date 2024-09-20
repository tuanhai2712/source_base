import { Button, Modal, Popover } from 'antd';
import React, { useState } from 'react';
import defaultLogo from '../../assets/images/avatar-default-icon.png';
import './index.scss';

import { useHistory } from 'react-router-dom';
import { IProfile } from '@/services/user';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UserLogout } from '@/store/auth/actions';

interface IProps {
  setIsOpenUserAccountInfo: any;
  profile: IProfile;
}

const AccountInfo = ({ setIsOpenUserAccountInfo, profile }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpenPopover(open);
  };

  const onClickLogout = () => {
    setOpenPopover(false);
    Modal.confirm({
      title: `${t('logoutComfirm')}`,
      content: `${t('doYouWantToLogout')}`,
      okText: `${t('accept')}`,
      cancelText: `${t('refuse')}`,
      onOk: () => {
        dispatch(UserLogout());
        history.push('/login');
      },
      okButtonProps: {
        style: {
          background: '#6dbe45',
          color: 'white',
        },
      },
    });
  };

  const handlOpenModalEditProfile = () => {
    setIsOpenUserAccountInfo(true);
    setOpenPopover(false);
  };

  return (
    <Popover
      onOpenChange={handleOpenChange}
      open={openPopover}
      title={t('accountInformation')}
      trigger="click"
      placement="bottomRight"
      content={
        <div className="profile-content">
          <div className="account-info">
            <div className="text-center avatar-user rounded-[50%]">
              <img src={defaultLogo} alt="logo" className="rounded-[50%] w-[100px] h-[100px] object-cover" />
            </div>
            <div className="text-center user-name">{profile.userName}</div>
            <Button className="info-user bg-main" onClick={handlOpenModalEditProfile} type="primary">
              {t('changeInformation')}
            </Button>

            <Button className="btn-logout" onClick={onClickLogout}>
              {t('logout')}
            </Button>
          </div>
        </div>
      }
      arrow={false}
    >
      <div className="profile-wrapper">
        <div className="login-avatar">
          <img src={defaultLogo} alt="logo" />
          <strong>{profile.userName}</strong>
        </div>
      </div>
    </Popover>
  );
};
export default AccountInfo;
