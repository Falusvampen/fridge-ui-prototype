import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import PhoneFrame from "./components/PhoneFrame";
import StyledProviders from "./providers/StyledProviders";
import StyledComponentsRegistry from "./providers/StyledComponentsRegistry";
import styled from "styled-components";
import BottomNav from "./components/BottomNav";

export const metadata: Metadata = {
  title: "Fridge UI Prototype",
  description: "A prototype app for managing your fridge",
};
const EmbeddedNavWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ua = (await headers()).get("user-agent") ?? "";
  const isPhone =
    /(iphone|ipod|android.+mobile|iemobile|opera mini|mobile)/i.test(ua);
  return (
    <html lang="sv">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="antialiased">
        <StyledComponentsRegistry>
          <StyledProviders>
            {/* On phones we skip the phone mock and render children directly with a fixed BottomNav. */}
            {isPhone ? (
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
            )}
          </StyledProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
