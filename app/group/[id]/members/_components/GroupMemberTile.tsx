import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { Avatar, Grid2, Paper, Stack, Typography } from "@mui/material";

export const GroupMemberTile = () => {
  return (
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
  );
};
