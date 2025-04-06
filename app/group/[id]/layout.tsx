import { Box, Container, Grid2, Stack } from "@mui/material";

export default function Layout({
  children,
  nav,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  nav: React.ReactNode;
}>) {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" py={4} gap={4}>
        <Box width="100%" maxWidth="360px" flexShrink={0}>
          {nav}
        </Box>
        {children}
      </Stack>
    </Container>
  );
}
