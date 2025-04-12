"use client";

import { AppRole, User } from "@/app/model/model";
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
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  styled,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { logoutMutationFn } from "../../graphql/options/mutation/logoutMutationFn";
import { Link } from "../next-link";
import { TruncatedTypography } from "../truncated-typography";
import toast from "react-hot-toast";

const StyledList = styled(List)(({ theme }) => ({
  "& .MuiListItemButton-root": {
    width: "100%",
  },

  "& .MuiListItemIcon-root": {
    minWidth: theme.spacing(4),
  },
}));

interface Props {
  me: User;
}

export const AccountButton = ({ me }: Props) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

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

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuAnchor(null);
  }, []);

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync();
    handleMenuClose();
  }, [handleMenuClose]);

  return (
    <>
      <Avatar
        src={me.smallPhoto}
        onClick={handleMenuClick}
        sx={{
          cursor: "pointer",
          boxShadow: "rgba(0, 0, 0, 0.086) 0px 5px 10px",
        }}
      />

      <Popover
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={handleMenuClose}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
      >
        <Stack direction="column" gap={1} alignItems="center" p={3}>
          <Avatar
            src={me.smallPhoto}
            onClick={handleMenuClick}
            sx={{
              width: "60px",
              height: "60px",
            }}
          />
          <TruncatedTypography variant="h5" fontSize="1rem">
            {me.username}
          </TruncatedTypography>
          <TruncatedTypography variant="body3" color="text.secondary">
            {me.email}
          </TruncatedTypography>
        </Stack>

        <Divider />

        <StyledList dense disablePadding>
          <ListItem disablePadding onClick={handleMenuClose}>
            <ListItemButton href={`/profile/${me.id}`} LinkComponent={Link}>
              <ListItemIcon>
                <PersonOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Mój profil" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={handleMenuClose}>
            <ListItemButton href="/" LinkComponent={Link}>
              <ListItemIcon>
                <ChatBubbleOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Wiadomości" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={handleMenuClose}>
            <ListItemButton href="/account/settings/events" LinkComponent={Link}>
              <ListItemIcon>
                <EventOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Twoje wydarzenia" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={handleMenuClose}>
            <ListItemButton href="/account/settings/groups" LinkComponent={Link}>
              <ListItemIcon>
                <Diversity1Outlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Twoje grupy" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={handleMenuClose}>
            <ListItemButton href="/account/settings/notifications" LinkComponent={Link}>
              <ListItemIcon>
                <NotificationsOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Powiadomienia" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={handleMenuClose}>
            <ListItemButton href="/account/settings/profile" LinkComponent={Link}>
              <ListItemIcon>
                <TuneOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Ustawienia" />
            </ListItemButton>
          </ListItem>

          {(me?.role === AppRole.Admin || me?.role === AppRole.Moderator) && (
            <ListItem disablePadding onClick={handleMenuClose}>
              <ListItemButton href="/admin/dashboard/users" LinkComponent={Link}>
                <ListItemIcon>
                  <AdminPanelSettingsOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Admin panel" />
              </ListItemButton>
            </ListItem>
          )}

          <Divider />

          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Wyloguj się" />
            </ListItemButton>
          </ListItem>
        </StyledList>
      </Popover>
    </>
  );
};
