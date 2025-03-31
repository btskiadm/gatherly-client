"use client";

import {
  AdminPanelSettingsOutlined,
  ChatBubbleOutline,
  Diversity1Outlined,
  EventOutlined,
  ExpandMoreOutlined,
  LogoutOutlined,
  PersonOutline,
  TuneOutlined,
} from "@mui/icons-material";
import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { logoutMutationFn } from "../../graphql/options/mutation/logoutMutationFn";
import { meQueryOptions } from "../../graphql/options/query/meQueryOptions";
import { Link } from "../next-link";
import { AppRole } from "@/app/model/model";

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

      {me && (
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
            href={`/profile/${me?.username ?? ""}`}
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
      </Menu>
    </>
  );
};
