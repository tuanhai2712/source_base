import React from "react";
import { Layout } from "antd";

import styled from "styled-components";
import LogoImage from "@assets/images/header-logo.png";
const { Header } = Layout;
export default function HeaderComponent() {
  return (
    <HeaderStyled>
      <TextStyled>Boxes</TextStyled>
      <TextStyled>Marketplace</TextStyled>
      <img src={LogoImage} alt="logo"></img>
      <TextStyled>Contact Us</TextStyled>

      <TextStyled className="menu-active">Connect Wallet</TextStyled>
    </HeaderStyled>
  );
}
const HeaderStyled = styled(Header)`
  background: #100031;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  color: #fff;
  padding: 0px 150px;
  position: fixed;
  z-index: 1;
  width: 100%;
`;
const TextStyled = styled.div`
  font-size: 20px;
  line-height: 26px;
  width: 200px;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
