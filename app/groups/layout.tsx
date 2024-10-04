import React from "react";
import { GroupsLayout } from "./_components/GroupsLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GroupsLayout>{children}</GroupsLayout>;
}
