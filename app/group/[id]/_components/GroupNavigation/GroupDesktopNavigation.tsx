"use client";

import { ClampTypography } from "@/app/common/components/clamp-typography";
import { Link } from "@/app/common/components/next-link";
import { GroupDetails } from "@/app/model/model";
import {
  AssistantOutlined,
  CalendarMonthOutlined,
  ChatOutlined,
  EventOutlined,
  GavelOutlined,
  GroupOutlined,
  InfoOutlined,
  LayersOutlined,
  PersonAddAlt1Outlined,
  PolicyOutlined,
  ReportOutlined,
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

interface Props {
  groupDetails: GroupDetails;
}

const navItems = [
  { href: "about", label: "O grupie", icon: <InfoOutlined />, group: "main" },
  { href: "events", label: "Wydarzenia", icon: <EventOutlined />, group: "main" },
  { href: "calendar", label: "Kalendarz", icon: <CalendarMonthOutlined />, group: "main" },
  { href: "members", label: "Członkowie", icon: <GroupOutlined />, group: "main" },
  { href: "chat", label: "Chat", icon: <ChatOutlined />, group: "main" },
  { href: "overview", label: "Przegląd", icon: <LayersOutlined />, group: "secondary" },
  { href: "assistant", label: "Asystent", icon: <AssistantOutlined />, group: "secondary" },
  { href: "requests", label: "Prośby o dołączenie", icon: <PersonAddAlt1Outlined />, group: "secondary" },
  { href: "reports", label: "Zgłoszenia", icon: <ReportOutlined />, group: "secondary" },
  { href: "status", label: "Status grupy", icon: <PolicyOutlined />, group: "secondary" },
  { href: "roles", label: "Role użytkowników", icon: <GavelOutlined />, group: "secondary" },
  { href: "settings", label: "Ustawienia", icon: <SettingsOutlined />, group: "secondary" },
];

export function GroupDesktopNavigation({ groupDetails }: Props) {
  const pathname = usePathname();
  const subPath = pathname.split("/")?.[3] ?? "";

  const { largePhoto, title } = groupDetails;

  const renderNavItems = (group: string) =>
    navItems
      .filter((item) => item.group === group)
      .map(({ href, label, icon }) => (
        <ListItem disablePadding key={href}>
          <ListItemButton href={href} LinkComponent={Link} selected={subPath.includes(href)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ));

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
        <List disablePadding>{renderNavItems("main")}</List>
        <Divider sx={{ my: 1 }} />
        <List disablePadding>{renderNavItems("secondary")}</List>
      </Stack>
    </Paper>
  );
}
