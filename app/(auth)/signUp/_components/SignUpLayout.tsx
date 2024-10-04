import { Container, Paper, Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {}

export const SignUpLayout = ({ children }: Props) => {
  return (
    <Container maxWidth="sm">
      <Paper>
        <Stack marginTop="30%" p={4} gap={3} justifyContent="center">
          <Typography variant="h2">Sign up</Typography>
          {children}
        </Stack>
      </Paper>
    </Container>
  );
};
