import { Box, Container } from "@mui/material";
import React from "react";

export const EventsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container>
      <Box py={{ xs: 3, sm: 6 }}>{children}</Box>
    </Container>
  );
};
