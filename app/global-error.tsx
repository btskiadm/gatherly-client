"use client";

import { ArrowForward } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <Container>
          <Stack py={{ xs: "15vh", sm: "20vh" }} gap={3} alignContent="center" alignItems="center">
            <Typography variant="h6">500</Typography>
            <Typography variant="h1">Global error</Typography>
            <Typography variant="body1" color="text.secondary">
              Sorry, error occure.
            </Typography>
            <Stack direction="row" gap={2}>
              <Button variant="contained" onClick={() => reset()}>
                Try again
              </Button>
              <Button endIcon={<ArrowForward />}>Contact support</Button>
            </Stack>
          </Stack>
        </Container>
      </body>
    </html>
  );
}
