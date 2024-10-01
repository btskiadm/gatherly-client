import { Button, Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";

export default function GroupSettingsPage() {
  return (
    <Stack gap={3}>
      <GroupHeader
        primary="Settings"
        secondary="See group settings and change it."
        actions={
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              height: "min-content",
            }}
          >
            Edit
          </Button>
        }
      />
    </Stack>
  );
}
