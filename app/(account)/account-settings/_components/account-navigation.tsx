"use client";

import { Link } from "@/app/common/components/next-link";
import { EditOutlined, InterestsOutlined, ManageAccountsOutlined, SettingsOutlined } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";

interface Props {
  mobile?: boolean;
}

const TAB_CONFIG = [
  { value: "edit", label: "Edit profile", icon: <EditOutlined />, href: "edit" },
  { value: "personal", label: "Personal info", icon: <ManageAccountsOutlined />, href: "personal" },
  { value: "managment", label: "Account management", icon: <SettingsOutlined />, href: "managment" },
  { value: "interest", label: "Interest", icon: <InterestsOutlined />, href: "interest" },
];

export const AccountNavigation = ({ mobile = false }: Props) => {
  const pathName = usePathname();
  const routeSegment = pathName.split("/")?.[2] ?? "";

  const selectedTab = TAB_CONFIG.find((tab) => routeSegment.includes(tab.value))?.value || "edit";

  if (mobile) {
    return (
      <Tabs value={selectedTab} textColor="primary" variant="scrollable" indicatorColor="primary">
        {TAB_CONFIG.map(({ value, icon, href }) => (
          <Tab key={value} icon={icon} LinkComponent={Link} href={href} value={value} />
        ))}
      </Tabs>
    );
  }

  return (
    <Paper sx={{ width: "100%" }}>
      <Typography variant="h6" fontWeight="600" p={2} pb={0}>
        Settings
      </Typography>
      <List>
        {TAB_CONFIG.map(({ value, label, icon, href }) => (
          <ListItem key={value} disablePadding>
            <ListItemButton href={href} LinkComponent={Link} selected={selectedTab === value}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
