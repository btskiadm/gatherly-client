"use client";

import Logo from "@/app/public/assets/logo.webp";
import { AddCircleOutlineRounded, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Link } from "./NextLink";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<any>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

export const ApplicationNavBar = (props: Props) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar color="default">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Link
                href="/groups"
                sx={{
                  textDecoration: "unset",
                  color: "text.primary",
                }}
              >
                <Stack direction="row" alignItems="center" flexGrow={1} gap={1}>
                  <Image
                    src={Logo}
                    alt="logo"
                    sizes="100vw"
                    style={{
                      width: "38px",
                      height: "38px",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                  />

                  <Typography variant="h6" noWrap>
                    Gatherly
                  </Typography>
                </Stack>
              </Link>
              <Box flexGrow={1} />
              <Stack
                flexGrow={0}
                direction="row"
                sx={(theme) => ({
                  gap: 1,
                  [theme.breakpoints.up("sm")]: {
                    gap: 2,
                  },
                })}
              >
                <Button
                  sx={(theme) => ({
                    [theme.breakpoints.down("sm")]: {
                      display: "none",
                    },
                  })}
                  color="secondary"
                  href="/createGroup"
                  variant="contained"
                  startIcon={<AddCircleOutlineRounded fontSize="small" />}
                  LinkComponent={Link}
                >
                  Create a group
                </Button>
                <Button href="/login" LinkComponent={Link} variant="contained">
                  Login
                </Button>
                <Box sx={{ flexGrow: 1, display: "flex" }}>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};
