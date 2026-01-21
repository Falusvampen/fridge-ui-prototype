"use client";

import React from "react";
import BottomNav from "./BottomNav";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Outer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f3f4f6 0%, #eef2ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Phone = styled.div`
  width: 380px;
  height: 812px;
  border-radius: 42px;
  background: white;
  box-shadow: 0 30px 60px rgba(2,6,23,0.2);
  position: relative;
  overflow: hidden;
`;

const Notch = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  width: 210px;
  height: 32px;
  margin-top: -8px;
  background: rgba(0,0,0,0.05);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  pointer-events: none;
`;

const Screen = styled.div`
  height: 100%;
  padding-top: 16px;
  padding-bottom: 72px;
  overflow: auto;
`;

const HomeIndicator = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
  width: 96px;
  height: 6px;
  background: rgba(0,0,0,0.05);
  border-radius: 9999px;
  pointer-events: none;
`;

const EmbeddedNavWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function PhoneFrame({ children }: Props) {
  return (
    <Outer>
      <Phone>
        <Notch />
        <Screen>{children}</Screen>
        <HomeIndicator />
        <EmbeddedNavWrap>
          <BottomNav isEmbedded />
        </EmbeddedNavWrap>
      </Phone>
    </Outer>
  );
}
