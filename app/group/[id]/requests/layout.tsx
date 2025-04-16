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
      <GroupHeader
        primary="Prośby o dołączenie"
        secondary="Sprawdz przychodzące i wychodzące zaproszenia oraz zarządzaj nimi."
      />
      {children}
    </Stack>
  );
}
