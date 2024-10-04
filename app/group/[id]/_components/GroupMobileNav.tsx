"use client";

import { Link } from "@/app/common/components/NextLink";
import { Tab, Tabs } from "@mui/material";
import { usePathname } from "next/navigation";

export function GroupMobileNav() {
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

  let value = "unknown";
  if (aboutSected) {
    value = about;
  } else if (eventsSelected) {
    value = events;
  } else if (calendarSelected) {
    value = calendar;
  } else if (membersSelected) {
    value = members;
  } else if (chatSelected) {
    value = chat;
  } else if (settingsSelected) {
    value = settings;
  }

  return (
    <Tabs value={value} textColor="primary" variant="scrollable" indicatorColor="primary">
      <Tab label="About" LinkComponent={Link} href="about" value={about} />
      <Tab label="Events" LinkComponent={Link} href="events" value={events} />
      <Tab label="Calendar" LinkComponent={Link} href="calendar" value={calendar} />
      <Tab label="Members" LinkComponent={Link} href="members" value={members} />
      <Tab label="Chat" LinkComponent={Link} href="chat" value={chat} />
      <Tab label="Settings" LinkComponent={Link} href="settings" value={settings} />
    </Tabs>
  );
}
