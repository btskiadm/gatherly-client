"use client";

import Logo from "@/app/public/assets/logo.webp";
import {
  AddCircleOutlineRounded,
  CalendarMonthOutlined,
  Close,
  CookieOutlined,
  Groups2Outlined,
  HelpOutline,
  MenuOutlined,
  PrivacyTipOutlined,
} from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Box,
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
  useScrollTrigger,
} from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Link } from "../next-link";
import { DrawerSocialLinks } from "./DrawerSocialLinks";

const NavbarUserActions = dynamic(
  () => import("./NavbarUserActions").then((component) => component.NavbarUserActions),
  {
    ssr: false,
  }
);

const DrawerProfileList = dynamic(
  () => import("./DrawerProfileList").then((component) => component.DrawerProfileList),
  {
    ssr: false,
  }
);

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
        >
          <Stack gap={4} mb={2} direction="row" alignItems="center">
            <IconButton
              size="small"
              sx={{
                border: "1px solid",
                borderColor: "divider",
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
          <Divider />
          <DrawerProfileList bottomChildren={<Divider />} />
          <List dense>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/groups" LinkComponent={Link}>
                <ListItemIcon>
                  <Groups2Outlined />
                </ListItemIcon>
                <ListItemText primary="Wszystkie grupy" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/events" LinkComponent={Link}>
                <ListItemIcon>
                  <CalendarMonthOutlined />
                </ListItemIcon>
                <ListItemText primary="Wszystkie wydarzenia" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List dense>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/create-group" LinkComponent={Link}>
                <ListItemIcon>
                  <AddCircleOutlineRounded />
                </ListItemIcon>
                <ListItemText primary="Utwórz grupę" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List dense>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/contact-us" LinkComponent={Link}>
                <ListItemIcon>
                  <HelpOutline />
                </ListItemIcon>
                <ListItemText primary="Kontakt" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <PrivacyTipOutlined />
                </ListItemIcon>
                <ListItemText primary="Polityka prywatności" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleCloseNavMenu}>
              <ListItemButton href="/" LinkComponent={Link}>
                <ListItemIcon>
                  <CookieOutlined />
                </ListItemIcon>
                <ListItemText primary="Ustawienia cookies" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <DrawerSocialLinks />
        </Stack>
      </Drawer>
      <HideOnScroll {...props}>
        <AppBar
          color="default"
          square
          sx={{
            borderRadius: 0,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Link
                href="/groups"
                sx={{
                  textDecoration: "unset",
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

                  <Typography variant="h6" noWrap color="text.primary">
                    Gatherly
                  </Typography>
                </Stack>
              </Link>
              <Box flexGrow={1} />
              <Stack
                direction="row"
                alignItems="center"
                sx={(theme) => ({
                  gap: 1,
                  [theme.breakpoints.up("sm")]: {
                    gap: 4,
                  },
                })}
              >
                <NavbarUserActions />
                <IconButton color="inherit" onClick={handleOpenNavMenu}>
                  <MenuOutlined />
                </IconButton>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};
