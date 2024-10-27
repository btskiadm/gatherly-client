import { Link } from "@/app/common/components/NextLink";
import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { Avatar, Box, Grid2, Paper, Stack, Typography } from "@mui/material";

export const GroupMemberTile = () => {
  return (
    <Box position="relative">
      <Link
        href={`/profile/123-456-789`}
        sx={{
          height: 0,
          width: 0,
          "&:after": {
            zIndex: 1,
            bottom: 0,
            content: "''",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          },
        }}
      />
      <Paper>
        <Stack p={2} gap={1}>
          <Stack alignItems="center" gap={1} py={2} bgcolor="background.default">
            <Avatar />
            <Stack alignItems="center">
              <TruncatedTypography variant="body1">Adam Bartski</TruncatedTypography>
              <TruncatedTypography variant="body2" color="text.secondary">
                Łódź
              </TruncatedTypography>
            </Stack>
          </Stack>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <Stack alignItems="center">
                <TruncatedTypography variant="body2" color="text.secondary">
                  Ukończone
                </TruncatedTypography>
                <TruncatedTypography variant="h6">63</TruncatedTypography>
              </Stack>
            </Grid2>
            <Grid2 size={6}>
              <Stack alignItems="center">
                <TruncatedTypography variant="body2" color="text.secondary">
                  Wszystkie
                </TruncatedTypography>
                <TruncatedTypography variant="h6">99+</TruncatedTypography>
              </Stack>
            </Grid2>
          </Grid2>
        </Stack>
      </Paper>
    </Box>
  );
};
