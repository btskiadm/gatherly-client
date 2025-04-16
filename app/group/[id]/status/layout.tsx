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
        primary="Status grupy"
        secondary="W tym miejscu pojawią się informację na temat aktualnego stanu grupy"
      />
      {children}
    </Stack>
  );
}
