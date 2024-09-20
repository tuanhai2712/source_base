import { IRoute, publicRoutes } from '@/routes';
import { SIGN_IN_ROUTER } from '@/routes/constants';
import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
export const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const history = useHistory();
  useEffect(() => {
    const findItem = publicRoutes.find((i: IRoute) => i.path === history.location.pathname);
    if (!findItem) {
      history.push(SIGN_IN_ROUTER);
    }
  }, [history]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: '#667085',
          colorBorder: 'transparent',
          colorErrorBgHover: '#667085',
        },
        components: {
          Input: {
            activeBorderColor: '#667085',
            hoverBorderColor: 'transparent',
            activeShadow: 'transparent',
          },
        },
      }}
    >
      <div className="login-layout">
        <div className="signin-page">{children}</div>
      </div>
    </ConfigProvider>
  );
};
