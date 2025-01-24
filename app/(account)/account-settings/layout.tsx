import React from "react";
import { AccountLayout } from "./_components/account-layout";

export default function Layout({
  nav,
  children,
}: Readonly<{
  nav: React.ReactNode;
  children: React.ReactNode;
}>) {
  return <AccountLayout nav={nav}>{children}</AccountLayout>;
}
