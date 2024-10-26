import { Box, Container, Grid2 } from "@mui/material";
import React from "react";
import { ProfileInfo } from "./_components/ProfileInfo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container maxWidth="md">
      <Box py={{ xs: 3, sm: 6 }}>
        <Grid2 container spacing={{ xs: 2, sm: 3 }} direction={{ xs: "column", sm: "row" }}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <ProfileInfo />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8 }}>{children}</Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
