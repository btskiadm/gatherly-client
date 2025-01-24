import { ArrowForward } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";

export default function Custom404() {
  return (
    <Container>
      <Stack py={{ xs: "15vh", sm: "20vh" }} gap={3} alignContent="center" alignItems="center">
        <Typography variant="h6">404</Typography>
        <Typography variant="h1">Page not found</Typography>
        <Typography variant="body1" color="text.secondary">
          Sorry, we couldn’t find the page you’re looking for.
        </Typography>
        <Stack direction="row" gap={2}>
          <Button variant="contained">Go back home</Button>
          <Button endIcon={<ArrowForward />}>Contact support</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
