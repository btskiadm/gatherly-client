"use client";

import { GroupDetails } from "@/app/model/model";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { GroupEventsList } from "./GroupEventsList";

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
  groupDetails: GroupDetails;
}

export const GroupEventsTabs = ({ groupDetails }: Props) => {
  const [value, setValue] = React.useState(0);

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
          <Tab
            label={
              <Stack direction="row" flexWrap="nowrap" alignItems="center" gap={0.5}>
                <Typography variant="button">Upcoming</Typography>
                <Typography variant="caption">({groupDetails.upcomingLength})</Typography>
              </Stack>
            }
          />

          <Tab
            label={
              <Stack direction="row" flexWrap="nowrap" alignItems="center" gap={0.5}>
                <Typography variant="button">Pending</Typography>
                <Typography variant="caption">({groupDetails.pendingLength})</Typography>
              </Stack>
            }
          />

          <Tab
            label={
              <Stack direction="row" flexWrap="nowrap" alignItems="center" gap={0.5}>
                <Typography variant="button">Past</Typography>
                <Typography variant="caption">({groupDetails.pastLength})</Typography>
              </Stack>
            }
          />

          <Tab
            label={
              <Stack direction="row" flexWrap="nowrap" alignItems="center" gap={0.5}>
                <Typography variant="button">Cancelled</Typography>
                <Typography variant="caption">({groupDetails.cancelledLength})</Typography>
              </Stack>
            }
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GroupEventsList events={groupDetails.upcoming} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GroupEventsList events={groupDetails.pending} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GroupEventsList events={groupDetails.past} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GroupEventsList events={groupDetails.cancelled} />
      </CustomTabPanel>
    </Box>
  );
};
