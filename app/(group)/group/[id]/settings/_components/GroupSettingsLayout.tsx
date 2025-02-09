import { Stack } from "@mui/material";
import React from "react";
import { GroupHeader } from "../../_components/GroupHeader";

export const GroupSettingsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Settings" secondary="See group settings and change it." />
      {children}
    </Stack>
  );
};
