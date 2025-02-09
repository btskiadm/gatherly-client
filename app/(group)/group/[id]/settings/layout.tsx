import React from "react";
import { GroupSettingsLayout } from "./_components/GroupSettingsLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GroupSettingsLayout>{children}</GroupSettingsLayout>;
}
