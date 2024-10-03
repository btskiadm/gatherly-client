import { Button, Stack } from "@mui/material";
import { Link } from "@/app/common/components/NextLink";
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
              LinkComponent={Link}
              href="events/createEvent"
              sx={{
                display: {
                  xs: "none",
                  sm: "inline-flex",
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
                  sm: "none",
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
