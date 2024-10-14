"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { GroupSettingsAboutTab } from "./GroupSettingsAboutTab";
import { GroupSettingsMembersTab } from "./GroupSettingsMembersTab";
import { GroupSettingsAvatarTab } from "./GroupSettingsAvatarTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box pt={{ xs: 2, sm: 3 }}>{children}</Box>}
    </div>
  );
}

export const GroupSettingsTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          variant="scrollable"
          indicatorColor="secondary"
        >
          <Tab label="About" />
          <Tab label="Members" />
          <Tab label="Avatar" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GroupSettingsAboutTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GroupSettingsMembersTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GroupSettingsAvatarTab />
      </CustomTabPanel>
    </Box>
  );
};
