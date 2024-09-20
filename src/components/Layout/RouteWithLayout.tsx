import React, { Suspense } from 'react';

import { Route } from 'react-router-dom';

import { Spin } from 'antd';
export interface RouteWithLayoutProps {
  component: React.FC<any>;
  path?: string | string[];
  from?: string;
  to?: string;
  exact?: boolean;
  routePath?: string;
  roles?: any[];
}

export const RouteWithLayout: React.FC<RouteWithLayoutProps> = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return (
          <Suspense fallback={<Spin />}>
            <Component {...matchProps} />
          </Suspense>
        );
      }}
    />
  );
};
