"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { GroupEventsList } from "./GroupEventsList";
import { CANCELED_EVENTS, PAST_EVENTS, PENDING_EVENTS, UPCOMING_EVENTS } from "../events.mock";

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

export const GroupEventsTabs = () => {
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
          <Tab label="Upcoming" />
          <Tab label="Pending" />
          <Tab label="Recurring" />
          <Tab label="Past" />
          <Tab label="Cancelled" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GroupEventsList groupEvents={UPCOMING_EVENTS} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GroupEventsList groupEvents={PENDING_EVENTS} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GroupEventsList groupEvents={[]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GroupEventsList groupEvents={PAST_EVENTS} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GroupEventsList groupEvents={CANCELED_EVENTS} />
      </CustomTabPanel>
    </Box>
  );
};
