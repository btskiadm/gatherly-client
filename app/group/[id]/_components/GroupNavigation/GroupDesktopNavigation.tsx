"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { Link } from "@/app/common/components/next-link";
import { GroupDetails } from "@/app/model/model";
import {
  CalendarMonthOutlined,
  ChatOutlined,
  EventOutlined,
  GroupOutlined,
  InfoOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import { usePathname } from "next/navigation";

const about = "about";
const events = "events";
const calendar = "calendar";
const members = "members";
const chat = "chat";
const settings = "settings";

interface Props {
  groupDetails: GroupDetails;
}

export function GroupDesktopNavigation({ groupDetails }: Props) {
  const pathname = usePathname();

  // "/group/123-456-789/settings/avatar"
  const subPath = pathname.split("/")?.[3] ?? "";

  const [aboutSected, eventsSelected, calendarSelected, membersSelected, chatSelected, settingsSelected] = [
    subPath.includes(`${about}`),
    subPath.includes(`${events}`),
    subPath.includes(`${calendar}`),
    subPath.includes(`${members}`),
    subPath.includes(`${chat}`),
    subPath.includes(`${settings}`),
  ];

  const { largePhoto, title } = groupDetails;

  return (
    <Paper elevation={1}>
      <Avatar
        alt="logo"
        variant="rounded"
        sizes="100vw"
        src={largePhoto ?? ""}
        sx={{
          width: "100%",
          height: "16rem",
        }}
      />

      <Stack width="100%" p={3} py={2} gap={2}>
        <ClampTypography variant="h5">{title}</ClampTypography>
        <Divider />
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton href="about" LinkComponent={Link} selected={aboutSected}>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText primary="O grupie" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="events" LinkComponent={Link} selected={eventsSelected}>
              <ListItemIcon>
                <EventOutlined />
              </ListItemIcon>
              <ListItemText primary="Wydarzenia" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="calendar" LinkComponent={Link} selected={calendarSelected}>
              <ListItemIcon>
                <CalendarMonthOutlined />
              </ListItemIcon>
              <ListItemText primary="Kalendarz" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="members" LinkComponent={Link} selected={membersSelected}>
              <ListItemIcon>
                <GroupOutlined />
              </ListItemIcon>
              <ListItemText primary="Członkowie" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="chat" LinkComponent={Link} selected={chatSelected}>
              <ListItemIcon>
                <ChatOutlined />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="settings" LinkComponent={Link} selected={settingsSelected}>
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText primary="Ustawienia" />
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </Paper>
  );
}
