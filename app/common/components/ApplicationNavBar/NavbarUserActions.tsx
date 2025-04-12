"use client";

import { AddCircleOutlineRounded, NotificationsOutlined } from "@mui/icons-material";
import { Badge, Button, IconButton, Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { meQueryOptions } from "../../graphql/options/query/meQueryOptions";
import { Link } from "../next-link";
import { AccountButton } from "./AccountButton";
import { MessagesButton } from "./MessagesButton";

export const NavbarUserActions = () => {
  const { data } = useSuspenseQuery(meQueryOptions());

  const me = data?.me;

  if (!me) {
    return (
      <Button size="small" color="inherit" variant="contained" href="/auth/sign-in" LinkComponent={Link}>
        Zaloguj się
      </Button>
    );
  }

  return (
    <Stack
      direction="row"
      sx={(theme) => ({
        gap: 1,
        [theme.breakpoints.up("sm")]: {
          gap: 4,
        },
      })}
    >
      <Button
        size="small"
        variant="text"
        color="inherit"
        href="/create-new"
        LinkComponent={Link}
        startIcon={<AddCircleOutlineRounded fontSize="small" />}
        sx={(theme) => ({
          // mobile only
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        })}
      >
        Utwórz nowe
      </Button>
      <Stack direction="row" gap={0.5}>
        <Badge
          slotProps={{
            badge: {
              style: {
                borderRadius: "50%",
                borderColor: "white",
                borderWidth: "2px",
                borderStyle: "solid",
                right: "6px",
                top: "6px",
                width: "12px",
                height: "12px",
              },
            },
          }}
          color="warning"
          variant="dot"
          anchorOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
        >
          <IconButton
            size="medium"
            sx={{
              flexShrink: 0,
              width: "40px",
              height: "40px",
              bgcolor: "background.paper",
              boxShadow: "rgba(0, 0, 0, 0.086) 0px 5px 10px",
              "&:hover": {
                "& .MuiSvgIcon-root": {
                  color: "text.primary",
                },
                bgcolor: "background.paper",
              },
            }}
          >
            <NotificationsOutlined fontSize="small" />
          </IconButton>
        </Badge>
        <MessagesButton me={me} />
      </Stack>

      <AccountButton me={me} />
    </Stack>
  );
};
