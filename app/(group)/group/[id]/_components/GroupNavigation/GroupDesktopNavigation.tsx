"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { Link } from "@/app/common/components/next-link";
import { GroupDetailsDto } from "@/app/common/graphql/dto";
import { CalendarMonth, Chat, Event, Group, InfoOutlined, SettingsOutlined } from "@mui/icons-material";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";

const about = "about";
const events = "events";
const calendar = "calendar";
const members = "members";
const chat = "chat";
const settings = "settings";

interface Props {
  groupDetails: GroupDetailsDto;
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

  const {
    thumbnail: { thumb },
    title,
  } = groupDetails;

  return (
    <Paper>
      {/* todo: width */}
      <Image
        src={thumb}
        width="0"
        height="0"
        alt="group logo"
        sizes="100vw"
        style={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
          objectFit: "cover",
        }}
      />
      <Stack width="100%" p={3} py={2} gap={2}>
        <ClampTypography variant="body1">{title}</ClampTypography>
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
          <ListItem disablePadding>
            <ListItemButton href="settings" LinkComponent={Link} selected={settingsSelected}>
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </Paper>
  );
}
