"use client";
import { ArrowBack } from "@mui/icons-material";
import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";

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
    <Stack gap={4}>
      <Stack>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          sx={{
            width: "min-content",
          }}
        >
          Back
        </Button>
        <Stack direction="row" alignItems="end" gap={1}>
          <Typography variant="h4">Dashboard</Typography>
        </Stack>
      </Stack>
      <Grid2 container spacing={4}>
        <Grid2 size={4}>
          <Tile primary={"24"} secondary="Zakończone" />
        </Grid2>
        <Grid2 size={4}>
          <Tile primary={"24"} secondary="Odwołane" />
        </Grid2>
        <Grid2 size={4}>
          <Tile primary={"24"} secondary="Wszystkie" />
        </Grid2>
      </Grid2>
    </Stack>
  );
}
