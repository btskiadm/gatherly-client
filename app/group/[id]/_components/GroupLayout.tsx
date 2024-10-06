import { Box, Container, Grid2 } from "@mui/material";
import { GroupMobileNav } from "./GroupMobileNav";
import { GroupNav } from "./GroupNav";

export const GroupLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container>
      <Box py={{ xs: 2, sm: 6 }}>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box
              display={{
                xs: "none",
                sm: "block",
              }}
            >
              <GroupNav />
            </Box>
            <Box
              display={{
                sm: "none",
              }}
            >
              <GroupMobileNav />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8 }}>{children}</Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};
