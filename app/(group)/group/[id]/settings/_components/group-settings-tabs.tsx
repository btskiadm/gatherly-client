"use client";

import { GroupDetailsDto } from "@/app/mock/mock-api.types";
import { Box, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import { GroupSettingsAboutTab } from "./group-settings-about-tab";
import { GroupSettingsAvatarTab } from "./group-settings-avatar-tab";
import { GroupSettingsMembersTab } from "./group-settings-members-tab";

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

interface Props {
  groupDetails: GroupDetailsDto;
}

export const GroupSettingsTabs = ({ groupDetails }: Props) => {
  const [tab, setTab] = useState(0);

  const handleChange = useCallback((_: unknown, tabValue: number) => {
    setTab(tabValue);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} textColor="secondary" variant="scrollable" indicatorColor="secondary">
          <Tab label="About" />
          <Tab label="Members" />
          <Tab label="Avatar" />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <GroupSettingsAboutTab groupDetails={groupDetails} />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <GroupSettingsMembersTab groupDetails={groupDetails} />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={2}>
        <GroupSettingsAvatarTab groupDetails={groupDetails} />
      </CustomTabPanel>
    </Box>
  );
};
