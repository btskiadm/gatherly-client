import { ArrowForward } from "@mui/icons-material";
import { Button, Container, GlobalStyles, Stack, Typography } from "@mui/material";

export default function Custom404() {
  return (
    <>
      <GlobalStyles
        styles={{
          ".MuiToolbar-root": {
            display: "none !important",
          },
        }}
      />

      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack gap={3} alignContent="center" alignItems="center">
          <Typography variant="h6" fontSize="6rem">
            404
          </Typography>
          <Typography variant="h1">Paage not found</Typography>
          <Typography variant="body1" color="text.secondary">
            Oops, an error has occurred. Page not found!
          </Typography>
          <Stack direction="row" gap={2}>
            <Button variant="contained">Go back home</Button>
            <Button endIcon={<ArrowForward />}>Contact support</Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
