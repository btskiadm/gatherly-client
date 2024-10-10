import { Box, Container, Grid2 } from "@mui/material";
import React from "react";

export const AccountLayout = ({
  nav,
  children,
}: Readonly<{
  nav: React.ReactNode;
  children: React.ReactNode;
}>) => {
  return (
    <Container>
      <Box py={{ xs: 3, sm: 6 }}>
        <Grid2 container spacing={{ xs: 2, sm: 3 }} direction={{ sm: "row" }}>
          <Grid2 size={{ xs: 12, sm: 4 }}>{nav}</Grid2>
          <Grid2 size={{ xs: 12, sm: 8 }}>{children}</Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};
