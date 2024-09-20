import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';

import { RouteWithLayout } from '@/components/Layout/RouteWithLayout';
import { requestUserProfile } from '@/store/user/actions';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import './App.scss';
import { DialogError } from './components';
import './i18n';
import { LoginLayout, MainLayout } from './layouts';
import { privateRoutes, publicRoutes } from './routes';
import { IsLoggedIn } from './store/auth/selector';

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(IsLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(requestUserProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  if (isLoggedIn) {
  }
  return (
    <Switch>
      {isLoggedIn ? (
        <MainLayout>
          {privateRoutes.map(({ Component, routePath, exact, path }, key) => {
            return (
              <RouteWithLayout
                key={String(key + 1)}
                component={Component}
                exact={exact}
                path={path}
                routePath={routePath}
              />
            );
          })}
        </MainLayout>
      ) : (
        <LoginLayout>
          {publicRoutes.map(({ Component, routePath, exact, path }, key) => {
            return (
              <RouteWithLayout
                key={String(key + 1)}
                component={Component}
                exact={exact}
                path={path}
                routePath={routePath}
              />
            );
          })}
        </LoginLayout>
      )}
      <DialogError />
    </Switch>
  );
}
