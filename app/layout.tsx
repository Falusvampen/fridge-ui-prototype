import type { Metadata } from "next";
import "./globals.css";
import ResponsivePhoneFrame from "./components/ResponsivePhoneFrame";
import StyledProviders from "./providers/StyledProviders";
import StyledComponentsRegistry from "./providers/StyledComponentsRegistry";
import styled from "styled-components";

export const metadata: Metadata = {
  title: "Fridge UI Prototype",
  description: "A prototype app for managing your fridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <ResponsivePhoneFrame>{children}</ResponsivePhoneFrame>
          </StyledProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
