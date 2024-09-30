import { ArrowBack } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

export default function GroupSettingsPage() {
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
          <Typography variant="h4">Settings</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
