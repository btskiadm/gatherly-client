"use client";

import { Link } from "@/app/common/components/next-link";
import { Diversity1Outlined, EventOutlined, PersonOutline } from "@mui/icons-material";
import { ListSubheader, styled, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { usePathname } from "next/navigation";
import React from "react";

const StyledList = styled(List)(({ theme }) => ({
  "&": {
    position: "sticky",
    top: "64px",
    width: "100%",
  },
  "& .MuiListSubheader-root": {
    backgroundColor: "transparent",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "12px",
    padding: "12px 16px",
    lineHeight: "normal",
  },
  "& .MuiListItemButton-root": {
    width: "100%",
    borderRadius: "12px",
    marginTop: "1px",
    marginBottom: "1px",
  },
  "& .MuiDivider-root": {
    marginTop: theme.spacing(2),
  },
  "& .MuiListItemIcon-root": {
    minWidth: theme.spacing(4),
  },
}));

const navigationGroups = [
  {
    group: "Konta",
    items: [
      {
        href: "/admin/dashboard/users",
        icon: <PersonOutline fontSize="small" />,
        text: "Użytkownicy",
      },
    ],
  },
  {
    group: "Grupy",
    items: [
      {
        href: "/admin/dashboard/groups",
        icon: <Diversity1Outlined fontSize="small" />,
        text: "Grupy",
      },
    ],
  },
  {
    group: "Wydarzenia",
    items: [
      {
        href: "/admin/dashboard/events",
        icon: <EventOutlined fontSize="small" />,
        text: "Wydarzenia",
      },
    ],
  },
];

export const AdminDashboardNavigation = () => {
  const pathname = usePathname();

  return (
    <StyledList dense disablePadding>
      {navigationGroups.map((group, groupIndex) => (
        <React.Fragment key={group.group}>
          <ListSubheader>{group.group}</ListSubheader>
          {group.items.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton LinkComponent={Link} href={item.href} selected={pathname === item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={<Typography variant="body2">{item.text}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
          {groupIndex < navigationGroups.length - 1 && <Divider variant="fullWidth" component="li" />}
        </React.Fragment>
      ))}
    </StyledList>
  );
};
