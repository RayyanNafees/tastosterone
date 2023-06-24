'use client'
import "./globals.css";
import React, { useState } from "react";
import { Open_Sans } from "next/font/google";
import { UserAuthTokenContext } from "./data/globalData";

const open_sans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: "TAS Next",
  description: "TAS NextJS API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authData, setAuthData] = useState({ email: "", token: "" });

  return (
    <html lang="en">
      <body className={open_sans.className}>
        <UserAuthTokenContext.Provider value={{ authData, setAuthData }}>
          {children}
        </UserAuthTokenContext.Provider>
      </body>
    </html>
  );
}
