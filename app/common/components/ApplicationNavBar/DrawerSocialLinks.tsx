import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { alpha, IconButton, Stack } from "@mui/material";

export const DrawerSocialLinks = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      mt={{
        xs: 2,
      }}
    >
      <IconButton
        href="https://www.facebook.com"
        target="_blank"
        sx={{
          border: "1px solid",
          borderColor: (t) => alpha(t.palette.divider, 0.1),
          borderRadius: 2,
        }}
      >
        <Facebook />
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
  );
};
