import type { Metadata } from "next";
import "./globals.css";
import PhoneFrame from "./components/PhoneFrame";
import StyledProviders from "./providers/StyledProviders";
import StyledComponentsRegistry from "./providers/StyledComponentsRegistry";

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
            <PhoneFrame>{children}</PhoneFrame>
          </StyledProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
