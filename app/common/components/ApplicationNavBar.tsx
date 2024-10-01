"use client";

import { Adb, AddCircleOutlineRounded, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useState } from "react";
import { Link } from "./NextLink";

const pages = ["Products", "Pricing", "Blog"];

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
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Adb sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/groups"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Gatherly
              </Typography>
              <Adb sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/groups"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Gatherly
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    size="small"
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
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
                  <Menu
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
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
