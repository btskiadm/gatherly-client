"use client";

import {
  ChatBubbleOutline,
  Diversity1Outlined,
  EventOutlined,
  LogoutOutlined,
  NotificationsOutlined,
  PersonOutline,
  TuneOutlined,
} from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { logoutMutationFn } from "../../graphql/options/mutation/logoutMutationFn";
import { meQueryOptions } from "../../graphql/options/query/meQueryOptions";
import { Link } from "../next-link";

interface Props {
  bottomChildren?: React.ReactElement;
}

export const DrawerProfileList = ({ bottomChildren }: Props) => {
  const {
    data: { me },
    isLoading,
  } = useSuspenseQuery(meQueryOptions());

  const logoutMutation = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess(data, variables, context) {
      localStorage.removeItem("accessToken");
      window.location.replace("/groups");
    },
  });

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  if (isLoading || !me) {
    return null;
  }

  return (
    <>
      <List dense>
        <ListItem disablePadding>
          <ListItemButton href={`/profile/${me.id}`}>
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText primary="Mój profil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/" LinkComponent={Link}>
            <ListItemIcon>
              <ChatBubbleOutline />
            </ListItemIcon>
            <ListItemText primary="Wiadomości" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/" LinkComponent={Link}>
            <ListItemIcon>
              <EventOutlined />
            </ListItemIcon>
            <ListItemText primary="Twoje wydarzenia" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/" LinkComponent={Link}>
            <ListItemIcon>
              <Diversity1Outlined />
            </ListItemIcon>
            <ListItemText primary="Twoje grupy" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/" LinkComponent={Link}>
            <ListItemIcon>
              <NotificationsOutlined />
            </ListItemIcon>
            <ListItemText primary="Powiadomienia" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/account-settings/edit" LinkComponent={Link}>
            <ListItemIcon>
              <TuneOutlined />
            </ListItemIcon>
            <ListItemText primary="Ustawienia" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary="Wyloguj się" />
          </ListItemButton>
        </ListItem>
      </List>
      {bottomChildren}
    </>
  );
};
