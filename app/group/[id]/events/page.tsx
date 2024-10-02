import { Button, Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";
import { GroupEventsTabs } from "./_components/GroupEventsTabs";

export default function GroupEventsPage() {
  return (
    <Stack gap={3}>
      <GroupHeader
        primary="Events"
        subPrimary="(99+)"
        secondary="See scheduled group eventsevents."
        actions={
          <>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                },
                height: "min-content",
                textWrap: "nowrap",
              }}
            >
              Create an event
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                display: {
                  xs: "inline-flex",
                  md: "none",
                },
                height: "min-content",
                textWrap: "nowrap",
              }}
            >
              Create
            </Button>
          </>
        }
      />
      <GroupEventsTabs />
    </Stack>
  );
}
