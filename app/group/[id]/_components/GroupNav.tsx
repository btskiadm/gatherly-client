"use client";

import { Link } from "@/app/common/components/NextLink";
import { CalendarMonth, Chat, Dashboard, Event, Group, InfoOutlined, SettingsOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";

export function GroupNav() {
  const pathName = usePathname();

  const about = "about";
  const events = "events";
  const calendar = "calendar";
  const members = "members";
  const chat = "chat";
  const settings = "settings";

  const [aboutSected, eventsSelected, calendarSelected, membersSelected, chatSelected, settingsSelected] = [
    pathName.includes(`/${about}`),
    pathName.includes(`/${events}`),
    pathName.includes(`/${calendar}`),
    pathName.includes(`/${members}`),
    pathName.includes(`/${chat}`),
    pathName.includes(`/${settings}`),
  ];

  return (
    <Paper>
      <Stack width="100%" p={2} gap={2}>
        <Box
          border="1px solid grey"
          sx={{
            height: 0,
            overflow: "hidden",
            paddingTop: "56.25%",
          }}
        >
          (Avatar)
        </Box>
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egestas eget,
        </Typography>
      </Stack>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton href="about" LinkComponent={Link} selected={aboutSected}>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="events" LinkComponent={Link} selected={eventsSelected}>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="calendar" LinkComponent={Link} selected={calendarSelected}>
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="members" LinkComponent={Link} selected={membersSelected}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="chat" LinkComponent={Link} selected={chatSelected}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton href="settings" LinkComponent={Link} selected={settingsSelected}>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
}
