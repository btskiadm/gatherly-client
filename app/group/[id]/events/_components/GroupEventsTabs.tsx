"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { GroupEventsList } from "./GroupEventsList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
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
          aria-label="basic tabs example"
          textColor="secondary"
          variant="fullWidth"
          indicatorColor="secondary"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          <Tab label="Recurring" {...a11yProps(2)} />
          <Tab label="Past" {...a11yProps(3)} />
          <Tab label="Cancelled" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GroupEventsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GroupEventsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GroupEventsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <GroupEventsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GroupEventsList />
      </CustomTabPanel>
    </Box>
  );
};
