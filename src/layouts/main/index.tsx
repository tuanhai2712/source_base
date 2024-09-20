import React, { useEffect } from 'react';

import { LayoutMain } from '@/components';
import { useSelector } from 'react-redux';
import { IsLoggedIn } from '@/store/auth/selector';
import { useHistory } from 'react-router-dom';
import { SIGN_IN_ROUTER } from '@/routes/constants';

interface IPropsLayoutMain {
  children: React.ReactNode;
}

export const MainLayout: React.FC<IPropsLayoutMain> = ({ children }) => {
  const isLoggedIn = useSelector(IsLoggedIn);
  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      history.push(SIGN_IN_ROUTER);
    }
  }, [history, isLoggedIn]);
  return <LayoutMain>{children}</LayoutMain>;
};
