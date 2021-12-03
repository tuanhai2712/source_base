import React from "react";
import { Layout } from "antd";

import styled from "styled-components";
import HeaderComponent from "@components/Header";
import BackgroundImage from "@assets/images/background.png";
import ConnectWallet from "@pages/ConnectWallet/ConnectWallet";
const { Content } = Layout;
export default function Main() {
  return (
    <MainWrapper>
      <Layout>
        <HeaderComponent />
        <ContentWrapper>
          <Content
            style={{
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: "cover",
            }}
          >
            <ConnectWallet />
          </Content>
        </ContentWrapper>
      </Layout>
    </MainWrapper>
  );
}

const ContentWrapper = styled.div`
  height: 100%;
  margin-top: 80px;
`;
const MainWrapper = styled.div`
  height: 100vh;
  .ant-layout {
    height: 100%;
  }
`;
