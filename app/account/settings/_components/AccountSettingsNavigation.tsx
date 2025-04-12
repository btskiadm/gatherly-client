"use client";

import React from "react";
import { ListSubheader, styled, Typography } from "@mui/material";
import {
  Diversity1Outlined,
  EmailOutlined,
  EventOutlined,
  NotificationsNoneOutlined,
  PersonOutline,
  TextSnippetOutlined,
  SecurityOutlined,
  ReceiptOutlined,
  MonetizationOnOutlined,
  PaymentOutlined,
  Brightness4Outlined,
  LanguageOutlined,
  ExitToAppOutlined,
  Diversity3Outlined,
} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "@/app/common/components/next-link";
import { usePathname } from "next/navigation";

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
    group: "Konto",
    items: [
      {
        href: "/account/settings/profile",
        icon: <PersonOutline fontSize="small" />,
        text: "Profil",
      },
      {
        href: "/account/settings/groups",
        icon: <Diversity1Outlined fontSize="small" />,
        text: "Groupy",
      },
      {
        href: "/account/settings/events",
        icon: <EventOutlined fontSize="small" />,
        text: "Wydarzenia",
      },
      {
        href: "/account/settings/friends",
        icon: <Diversity3Outlined fontSize="small" />,
        text: "Znajomi",
      },
    ],
  },
  {
    group: "Finanse",
    items: [
      {
        href: "/account/settings/membership-and-plans",
        icon: <MonetizationOnOutlined fontSize="small" />,
        text: "Członkostwo i plany",
      },
      {
        href: "/account/settings/payment-methods",
        icon: <PaymentOutlined fontSize="small" />,
        text: "Metody płatności",
      },
      {
        href: "/account/settings/invoices",
        icon: <ReceiptOutlined fontSize="small" />,
        text: "Faktury",
      },
      {
        href: "/account/settings/statements",
        icon: <TextSnippetOutlined fontSize="small" />,
        text: "Zlecenia",
      },
    ],
  },
  {
    group: "Dostęp",
    items: [
      {
        href: "/account/settings/change-email",
        icon: <EmailOutlined fontSize="small" />,
        text: "Zmiana e-mail",
      },
      {
        href: "/account/settings/change-password",
        icon: <SecurityOutlined fontSize="small" />,
        text: "Zmiana hasła",
      },
      {
        href: "/account/settings/deactivate-account",
        icon: <ExitToAppOutlined fontSize="small" />,
        text: "Dezaktywacja konta",
      },
    ],
  },
  {
    group: "Preferencje",
    items: [
      {
        href: "/account/settings/language-and-region",
        icon: <LanguageOutlined fontSize="small" />,
        text: "Język i region",
      },
      {
        href: "/account/settings/theme",
        icon: <Brightness4Outlined fontSize="small" />,
        text: "Motyw",
      },
      {
        href: "/account/settings/notifications",
        icon: <NotificationsNoneOutlined fontSize="small" />,
        text: "Notifikacje",
      },
    ],
  },
];

export const AccountSettingsNavigation = () => {
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
