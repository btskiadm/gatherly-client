import { Box, Container, Grid2, Paper, Stack } from "@mui/material";
import React from "react";

export const EventLayout = ({
  group,
  event,
}: Readonly<{
  group: React.ReactNode;
  event: React.ReactNode;
}>) => {
  return (
    <Container>
      <Box py={{ xs: 3, sm: 6 }}>
        <Grid2 container spacing={{ xs: 2, sm: 3 }} direction={{ xs: "column-reverse", sm: "row" }}>
          <Grid2 size={{ xs: 12, sm: 8 }}>{event}</Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>{group}</Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};
