import { Container, Paper, Stack, Typography } from "@mui/material";

export const CreateGroupLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container maxWidth="sm">
      <Paper>
        <Stack marginTop="20%" p={4} gap={3} justifyContent="center">
          <Typography variant="h2">Create a group</Typography>
          {children}
        </Stack>
      </Paper>
    </Container>
  );
};
