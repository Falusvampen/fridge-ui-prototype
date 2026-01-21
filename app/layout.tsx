import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "./components/BottomNav";

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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased">
        <div className="max-w-md mx-auto min-h-screen bg-gray-50">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
