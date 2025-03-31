"use client";
import { Box, Container, Stack } from "@mui/material";
import React, { Suspense } from "react";

import { AdminDashboardNavigation } from "./_components/AdminDashboardNavigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        px: 5,
        height: {
          xs: "100%",
          sm: "calc(100dvh - var(--template-frame-height, 0px))",
        },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Stack gap={{ xs: 2, sm: 3 }} direction={{ sm: "row" }}>
          <Box
            sx={{
              pt: { xs: 0, sm: 6 },
              minWidth: "240px",
            }}
          >
            <AdminDashboardNavigation />
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "start",
              pt: { xs: 0, sm: 6 },
              pb: { xs: 0, sm: 6 },
            }}
          >
            <Suspense fallback={"Loading.."}>{children}</Suspense>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
