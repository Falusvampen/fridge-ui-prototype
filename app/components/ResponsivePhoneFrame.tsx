"use client";

import React, { useEffect, useState } from "react";
import PhoneFrame from "./PhoneFrame";
import BottomNav from "./BottomNav";
import styled from "styled-components";

const EmbeddedNavWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function ResponsivePhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPhone, setIsPhone] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsPhone(mq.matches);
    update();
    // modern browsers
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // While we don't know the size (first render), render the phone mock to avoid a flash on desktop.
  if (isPhone === null) {
    return (
      <PhoneFrame>
        {children}
        <EmbeddedNavWrap>
          <BottomNav isEmbedded />
        </EmbeddedNavWrap>
      </PhoneFrame>
    );
  }

  return isPhone ? (
    <>
      {children}
      <BottomNav />
    </>
  ) : (
    <PhoneFrame>
      {children}
      <EmbeddedNavWrap>
        <BottomNav isEmbedded />
      </EmbeddedNavWrap>
    </PhoneFrame>
  );
}
