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
    <Container maxWidth="lg">
      <Stack direction="row" py={4} gap={4}>
        <Box width="360px" maxWidth="360px">
          {nav}
        </Box>
        {children}
      </Stack>
    </Container>
  );
}
