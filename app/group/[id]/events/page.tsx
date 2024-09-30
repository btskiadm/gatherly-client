import { ArrowBack } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { GroupEventsTabs } from "./_components/GroupEventsTabs";

// upcomming
// past
// cancelled
// pending
// recurring

export default function GroupEventsPage() {
  return (
    <Stack gap={3}>
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
        <Stack gap={1}>
          <Typography variant="h4" fontWeight="600">
            Events
          </Typography>
          <Typography variant="body2" color="text.secondary">
            See scheduled group events.
          </Typography>
          {/* <Typography variant="h6">(231)</Typography> */}
        </Stack>
      </Stack>
      <Stack gap={4}>
        <GroupEventsTabs />
      </Stack>
    </Stack>
  );
}
