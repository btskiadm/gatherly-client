"use client";

import { AppRole } from "@/app/model/model";
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
  Button,
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
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { logoutMutationFn } from "../../graphql/options/mutation/logoutMutationFn";
import { meQueryOptions } from "../../graphql/options/query/meQueryOptions";
import { Link } from "../next-link";
import { TruncatedTypography } from "../truncated-typography";

const StyledList = styled(List)(({ theme }) => ({
  "& .MuiListItemButton-root": {
    width: "100%",
  },

  "& .MuiListItemIcon-root": {
    minWidth: theme.spacing(4),
  },
}));

export const LoginButton = () => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

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

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!me && (
        <Button size="small" color="inherit" variant="contained" href="/auth/sign-in" LinkComponent={Link}>
          Zaloguj się
        </Button>
      )}
      {me && <Avatar src={me.smallPhoto} onClick={handleMenuClick} />}
      {me && (
        <Popover anchorEl={menuAnchor} open={!!menuAnchor} onClose={handleMenuClose}>
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
              <ListItemButton href={`/profile/${me?.id ?? ""}`} LinkComponent={Link}>
                <ListItemIcon>
                  <PersonOutline fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Mój profil" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleMenuClose}>
              <ListItemButton href={"/"} LinkComponent={Link}>
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
      )}

      {/* {me && (
        <Button
          size="small"
          color="inherit"
          variant="text"
          onClick={handleMenuClick}
          endIcon={<ExpandMoreOutlined fontSize="small" />}
          startIcon={
            <Avatar
              src={me.smallPhoto}
              sx={{
                width: "24px",
                height: "24px",
              }}
            />
          }
        >
          Mój profil
        </Button>
      )}
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            "& .MuiMenuItem-root": {
              "& .MuiSvgIcon-root": {
                marginRight: (theme) => theme.spacing(1),
              },
            },
          },
        }}
      >
        <MenuItem disableRipple>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "small",
              textDecoration: "none",
              verticalAlign: "center",
            }}
            href={`/profile/${me?.id ?? ""}`}
          >
            <PersonOutline fontSize="small" sx={{ color: "text.primary" }} />
            Mój profil
          </Link>
        </MenuItem>
        <MenuItem disableRipple sx={{ color: "text.secondary", fontSize: "small" }}>
          <ChatBubbleOutline fontSize="small" sx={{ color: "text.primary" }} />
          Wiadomości
        </MenuItem>
        <MenuItem disableRipple>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "small",
              textDecoration: "none",
              verticalAlign: "center",
            }}
            href="/account/settings/events"
          >
            <EventOutlined fontSize="small" sx={{ color: "text.primary" }} />
            Twoje wydarzenia
          </Link>
        </MenuItem>
        <MenuItem disableRipple>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "small",
              textDecoration: "none",
              verticalAlign: "center",
            }}
            href="/account/settings/groups"
          >
            <Diversity1Outlined fontSize="small" sx={{ color: "text.primary" }} />
            Twoje grupy
          </Link>
        </MenuItem>
        <MenuItem disableRipple>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "small",
              textDecoration: "none",
              verticalAlign: "center",
            }}
            href="/"
          >
            <NotificationsOutlined fontSize="small" sx={{ color: "text.primary" }} />
            Powiadomienia
          </Link>
        </MenuItem>
        <MenuItem disableRipple>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "small",
              textDecoration: "none",
              verticalAlign: "center",
            }}
            href="/account/settings/profile"
          >
            <TuneOutlined fontSize="small" sx={{ color: "text.primary" }} />
            Ustawienia
          </Link>
        </MenuItem>

        {(me?.role === AppRole.Admin || me?.role === AppRole.Moderator) && (
          <MenuItem disableRipple>
            <Link
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
                fontSize: "small",
                textDecoration: "none",
                verticalAlign: "center",
              }}
              href="/admin/dashboard/users"
            >
              <AdminPanelSettingsOutlined fontSize="small" sx={{ color: "text.primary" }} />
              Admin panel
            </Link>
          </MenuItem>
        )}

        <Divider />
        <MenuItem disableRipple sx={{ color: "text.secondary", fontSize: "small" }} onClick={handleLogout}>
          <LogoutOutlined fontSize="small" sx={{ color: "text.primary" }} />
          Wyloguj się
        </MenuItem>
        <Divider />
        <Divider />
        <MenuItem disableRipple sx={{ color: "text.secondary", fontSize: "small" }}>
          <Link href="/auth/sign-in">[TEST] sign in intercepted</Link>
        </MenuItem>
      </Menu> */}
    </>
  );
};
