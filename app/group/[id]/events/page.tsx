import { Button, Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";
import { GroupEventsTabs } from "./_components/GroupEventsTabs";

export default function GroupEventsPage() {
  return (
    <Stack gap={3}>
      <GroupHeader
        primary="Events"
        subPrimary="(99+)"
        secondary="See scheduled group events."
        actions={
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              height: "min-content",
            }}
          >
            Create an event
          </Button>
        }
      />
      <GroupEventsTabs />
    </Stack>
  );
}
