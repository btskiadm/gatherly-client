import React from "react";
import { Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack gap={{ xs: 2, sm: 3 }} width="100%">
      <GroupHeader primary="Assystent" secondary="Dostarcza wsparcia przy zarządzaniu grupą" />
      {children}
    </Stack>
  );
}
