"use client";

import {
  AdminPanelSettingsOutlined,
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
import toast from "react-hot-toast";
import { AppRole } from "@/app/model/model";

interface Props {
  bottomChildren?: React.ReactElement;
}

export const DrawerProfileList = ({ bottomChildren }: Props) => {
  const {
    data: { me },
  } = useSuspenseQuery(meQueryOptions());

  const logoutMutation = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess(data, variables, context) {
      localStorage.removeItem("accessToken");
      toast.success("Zostałeś wylogowany!");
      window.location.replace("/groups");
    },
    onError() {
      toast.error("Wystąpił błąd w trakcie próby wylogowania. Spróbuj ponownie później.");
    },
  });

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  if (!me) {
    return null;
  }

  return (
    <>
      <List dense>
        <ListItem disablePadding>
          <ListItemButton href={`/profile/${me.id}`} LinkComponent={Link}>
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
          <ListItemButton href="/account/settings/events" LinkComponent={Link}>
            <ListItemIcon>
              <EventOutlined />
            </ListItemIcon>
            <ListItemText primary="Twoje wydarzenia" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton href="/account/settings/groups" LinkComponent={Link}>
            <ListItemIcon>
              <Diversity1Outlined />
            </ListItemIcon>
            <ListItemText primary="Twoje grupy" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton href="/account/settings/notifications" LinkComponent={Link}>
            <ListItemIcon>
              <NotificationsOutlined />
            </ListItemIcon>
            <ListItemText primary="Powiadomienia" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton href="/account/settings/profile" LinkComponent={Link}>
            <ListItemIcon>
              <TuneOutlined />
            </ListItemIcon>
            <ListItemText primary="Ustawienia" />
          </ListItemButton>
        </ListItem>

        {(me?.role === AppRole.Admin || me?.role === AppRole.Moderator) && (
          <ListItem disablePadding>
            <ListItemButton href="/admin/dashboard/users" LinkComponent={Link}>
              <ListItemIcon>
                <AdminPanelSettingsOutlined />
              </ListItemIcon>
              <ListItemText primary="Admin panel" />
            </ListItemButton>
          </ListItem>
        )}

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
