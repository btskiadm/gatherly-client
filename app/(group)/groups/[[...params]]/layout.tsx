import React from "react";
import { GroupsLayout } from "./_components/groups-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GroupsLayout>{children}</GroupsLayout>;
}
