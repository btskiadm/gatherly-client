import { Box, Container, Paper, Stack, Typography } from "@mui/material";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container maxWidth="sm">
      <Paper>
        <Stack marginTop="30%" p={4} gap={3} justifyContent="center">
          <Typography variant="h2">Log in</Typography>
          {children}
        </Stack>
      </Paper>
    </Container>
  );
}
