import { Avatar, Grid2, Paper, Stack, Typography } from "@mui/material";

export const GroupMemberTile = () => {
  return (
    <Paper>
      <Stack p={2} gap={1}>
        <Stack alignItems="center" gap={1} py={2} bgcolor="background.default">
          <Avatar />
          <Stack alignItems="center">
            <Typography variant="body1">Adam Bartski</Typography>
            <Typography variant="body2" color="text.secondary">
              Łódź
            </Typography>
          </Stack>
        </Stack>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <Stack alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Ukończone
              </Typography>
              <Typography variant="h6">63</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={6}>
            <Stack alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Wszystkie
              </Typography>
              <Typography variant="h6">99+</Typography>
            </Stack>
          </Grid2>
        </Grid2>
      </Stack>
    </Paper>
  );
};
