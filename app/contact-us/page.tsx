import { Button, Container, FormControl, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";

import { Facebook, Instagram, LinkedIn, Pinterest, SendOutlined, Twitter, YouTube } from "@mui/icons-material";
import Image from "next/image";
import ContactUsImg from "../public/assets/contact-us.jpg";

export default function Page() {
  return (
    <Container>
      <Stack direction="column" gap={3} pt={4}>
        <Typography variant="h3">Contact Us</Typography>
        <Paper>
          <Stack direction="row">
            <Stack p={3} gap={4} direction="column" width="100%">
              <Stack direction="column" gap={1}>
                <Typography variant="body2" color="text.secondary">
                  Send message
                </Typography>
                <Typography variant="h3">Let's talk</Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <FormControl sx={{ width: "50%" }}>
                  <TextField label="First Name" variant="outlined" />
                </FormControl>
                <FormControl sx={{ width: "50%" }}>
                  <TextField label="Second Name" variant="outlined" />
                </FormControl>
              </Stack>
              <Stack direction="row" gap={2}>
                <FormControl sx={{ width: "50%" }}>
                  <TextField label="Email" variant="outlined" />
                </FormControl>
                <FormControl sx={{ width: "50%" }}>
                  <TextField label="Phone No." variant="outlined" />
                </FormControl>
              </Stack>
              <FormControl>
                <TextField multiline minRows={6} label="How can we help you?" />
              </FormControl>
              <Button variant="contained" sx={{ width: "min-content" }} endIcon={<SendOutlined />}>
                Send
              </Button>
            </Stack>
            <Image
              src={ContactUsImg}
              alt="contact us image"
              style={{
                aspectRatio: 1 / 1,
                flexBasis: "40%",
                objectFit: "cover",
                height: "600px",
              }}
            />
          </Stack>
        </Paper>
        <Stack direction="column" gap={2} justifyContent="center" mt={4}>
          <Typography variant="h3" align="center">
            Follow Us
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
              sx={{
                color: "primary.contrastText",
                transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "4px",
                background: "linear-gradient(135deg, rgb(145, 169, 241), rgb(87, 95, 216))",
                "&:hover": {
                  filter: "brightness(0.95)",
                },
              }}
              aria-label="facebook"
            >
              <Facebook fontSize="medium" />
            </IconButton>
            <IconButton
              sx={{
                color: "primary.contrastText",
                transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "4px",
                background: "linear-gradient(135deg, rgb(54, 186, 224), rgb(90, 128, 232))",
                "&:hover": {
                  filter: "brightness(0.95)",
                },
              }}
              aria-label="twitter"
            >
              <Twitter fontSize="medium" />
            </IconButton>
            <IconButton
              sx={{
                color: "primary.contrastText",
                transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "4px",
                background: "linear-gradient(135deg, rgb(164, 54, 175), rgb(204, 77, 130))",
                "&:hover": {
                  filter: "brightness(0.95)",
                },
              }}
              aria-label="instagram"
            >
              <Instagram fontSize="medium" />
            </IconButton>
            <IconButton
              sx={{
                color: "primary.contrastText",
                transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "4px",
                background: "linear-gradient(135deg, rgb(72, 85, 150), rgb(36, 180, 207))",
                "&:hover": {
                  filter: "brightness(0.95)",
                },
              }}
              aria-label="linkedin"
            >
              <LinkedIn fontSize="medium" />
            </IconButton>
            <IconButton
              sx={{
                color: "primary.contrastText",
                transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "4px",
                background: "linear-gradient(135deg, rgb(214, 96, 96), rgb(175, 7, 7))",
                "&:hover": {
                  filter: "brightness(0.95)",
                },
              }}
              aria-label="pinterest"
            >
              <Pinterest fontSize="medium" />
            </IconButton>
            <IconButton
              sx={{
                color: "primary.contrastText",
                transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "4px",
                background: "linear-gradient(135deg, rgb(241, 135, 229), rgb(232, 67, 214))",
                "&:hover": {
                  filter: "brightness(0.95)",
                },
              }}
              aria-label="youtube"
            >
              <YouTube fontSize="medium" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
