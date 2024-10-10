"use client";

import Logo from "@/app/public/assets/logo.webp";
import {
  AddCircleOutlineRounded,
  Close,
  Cookie,
  Event,
  FacebookOutlined,
  Groups,
  Help,
  Instagram,
  Logout,
  Menu as MenuIcon,
  Message,
  Notifications,
  Person,
  PrivacyTip,
  Settings,
  Twitter,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  Toolbar,
  Typography,
  alpha,
  useScrollTrigger,
} from "@mui/material";
import Image from "next/image";
import { useCallback, useState } from "react";
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
  const [hamburger, setHamburger] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setHamburger(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setHamburger(null);
  }, []);

  return (
    <>
      <Drawer open={!!hamburger} onClose={handleCloseNavMenu} anchor="right">
        <Stack
          width={{
            xs: "260px",
            sm: "320px",
          }}
          p={{
            xs: 2,
            sm: 3,
          }}
          gap={2}
        >
          <Stack direction="row" gap={4} alignItems="center">
            <IconButton
              size="small"
              sx={{
                border: "1px solid",
                borderColor: (t) => alpha(t.palette.divider, 0.1),
                borderRadius: 2,
              }}
              onClick={handleCloseNavMenu}
            >
              <Close />
            </IconButton>
            <Typography variant="h5" fontWeight={600}>
              Menu
            </Typography>
          </Stack>
          <List>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="View profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="Your events" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <Groups />
                </ListItemIcon>
                <ListItemText primary="Your groups" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <Message />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/account/edit" LinkComponent={Link}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <Help />
                </ListItemIcon>
                <ListItemText primary="Help" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <PrivacyTip />
                </ListItemIcon>
                <ListItemText primary="Privacy" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <Cookie />
                </ListItemIcon>
                <ListItemText primary="Cookies" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <Stack direction="row" justifyContent="space-evenly">
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              sx={{
                border: "1px solid",
                borderColor: (t) => alpha(t.palette.divider, 0.1),
                borderRadius: 2,
              }}
            >
              <FacebookOutlined />
            </IconButton>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              sx={{
                border: "1px solid",
                borderColor: (t) => alpha(t.palette.divider, 0.1),
                borderRadius: 2,
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://www.x.com"
              target="_blank"
              sx={{
                border: "1px solid",
                borderColor: (t) => alpha(t.palette.divider, 0.1),
                borderRadius: 2,
              }}
            >
              <Twitter />
            </IconButton>
          </Stack>
        </Stack>
      </Drawer>
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
