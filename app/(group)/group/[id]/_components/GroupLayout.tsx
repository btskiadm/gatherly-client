import { Box, Container, Grid2 } from "@mui/material";

export const GroupLayout = ({
  children,
  modal,
  nav,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  nav: React.ReactNode;
}>) => {
  return (
    <>
      {modal}
      <Container>
        <Box py={{ xs: 2, sm: 6 }}>
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 4 }}>{nav}</Grid2>
            <Grid2 size={{ xs: 12, sm: 8 }}>{children}</Grid2>
          </Grid2>
        </Box>
      </Container>
    </>
  );
};
