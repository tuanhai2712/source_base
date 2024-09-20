import { Layout } from 'antd';
import React from 'react';
import { IPropsLayoutMain } from './layout.interface';
import { Sidebar } from './Sidebar';
import { MainHeader } from './Header';

const { Content } = Layout;

export const LayoutMain: React.FC<IPropsLayoutMain> = ({ children }) => {
  return (
    <Layout className="main-content-index">
      <Sidebar />
      <Layout>
        <MainHeader />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};
