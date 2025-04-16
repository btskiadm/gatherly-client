"use client";

import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { Box, Tab, Tabs } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { GroupSettingsMembersTab } from "./GroupSettingsMembersTab";

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

export const GroupSettingsTabs = ({ groupId }: { groupId: string }) => {
  const { data } = useSuspenseQuery(getGroupDetailsQueryOptions({ groupId }));

  const [tab, setTab] = useState(0);

  const handleChange = useCallback((_: unknown, tabValue: number) => {
    setTab(tabValue);
  }, []);

  if (!data.getGroupDetails) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} textColor="secondary" variant="scrollable" indicatorColor="secondary">
          <Tab label="About" />
          <Tab label="Members" />
          <Tab label="Avatar" />
          <Tab label="Managment" />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        {/* <GroupSettingsAboutTab groupDetails={data.getGroupDetails} /> */}
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <GroupSettingsMembersTab groupDetails={data.getGroupDetails} />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={2}>
        {/* <GroupSettingsAvatarTab groupDetails={data.getGroupDetails} /> */}
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={3}>
        {/* <GroupSettingsManagmentTab groupDetails={data.getGroupDetails} /> */}
      </CustomTabPanel>
    </Box>
  );
};
