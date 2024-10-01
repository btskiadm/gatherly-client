"use client";
import { Grid2, Paper, Stack, Typography } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";

const Tile = ({ primary, secondary }: { primary: string; secondary: string }) => {
  return (
    <Paper
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "14rem",
        gap: 1,
        boxShadow: 1,
        [theme.breakpoints.up("sm")]: {
          height: "8rem",
          transition: "all 0.2s",
          "&:hover": {
            boxShadow: 6,
          },
        },
      })}
    >
      <Typography variant="body2" color="text.secondary">
        {secondary}
      </Typography>
      <Typography variant="h2" fontWeight="600">
        {primary}
      </Typography>
    </Paper>
  );
};

export default function GroupDashboardPage() {
  return (
    <Stack gap={3}>
      <GroupHeader primary="Dashboard" secondary="See basic information about this group." />
      <Grid2 container spacing={4}>
        <Grid2 size={4}>
          <Tile primary="24" secondary="Zakończone" />
        </Grid2>
        <Grid2 size={4}>
          <Tile primary="24" secondary="Odwołane" />
        </Grid2>
        <Grid2 size={4}>
          <Tile primary="24" secondary="Wszystkie" />
        </Grid2>
      </Grid2>
    </Stack>
  );
}
