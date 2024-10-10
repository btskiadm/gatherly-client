"use client";

import { Link } from "@/app/common/components/NextLink";
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

export function AccountNavigation({ mobile = false }: Props) {
  const pathName = usePathname();

  const edit = "edit";
  const personal = "personal";
  const managment = "managment";
  const interest = "interest";

  const [editSelected, personalSelected, managmentSelected, interestSelected] = [
    pathName.includes(`/${edit}`),
    pathName.includes(`/${personal}`),
    pathName.includes(`/${managment}`),
    pathName.includes(`/${interest}`),
  ];

  let value = "unknown";
  if (editSelected) {
    value = edit;
  } else if (personalSelected) {
    value = personal;
  } else if (managmentSelected) {
    value = managment;
  } else if (interestSelected) {
    value = interest;
  }

  // edit profile -> avatar / name / location / bio
  // personal -> birthdate / gender
  // account managment -> email / password / language / time zone /  password / deactive

  if (mobile) {
    return (
      <Tabs value={value} textColor="primary" variant="scrollable" indicatorColor="primary">
        <Tab icon={<EditOutlined />} LinkComponent={Link} href="edit" value={edit} />
        <Tab icon={<ManageAccountsOutlined />} LinkComponent={Link} href="personal" value={personal} />
        <Tab icon={<SettingsOutlined />} LinkComponent={Link} href="managment" value={managment} />
        <Tab icon={<InterestsOutlined />} LinkComponent={Link} href="interest" value={interest} />
      </Tabs>
    );
  }

  return (
    <Paper
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="600" p={2} pb={0}>
        Settings
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton href="edit" LinkComponent={Link} selected={editSelected}>
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            <ListItemText primary="Edit profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="personal" LinkComponent={Link} selected={personalSelected}>
            <ListItemIcon>
              <ManageAccountsOutlined />
            </ListItemIcon>
            <ListItemText primary="Personal info" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="managment" LinkComponent={Link} selected={managmentSelected}>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText primary="Account managment" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="interest" LinkComponent={Link} selected={interestSelected}>
            <ListItemIcon>
              <InterestsOutlined />
            </ListItemIcon>
            <ListItemText primary="Interest" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
}
