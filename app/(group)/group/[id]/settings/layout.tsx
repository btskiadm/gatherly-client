import React from "react";
import { GroupSettingsLayout } from "./_components/group-settings-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GroupSettingsLayout>{children}</GroupSettingsLayout>;
}
