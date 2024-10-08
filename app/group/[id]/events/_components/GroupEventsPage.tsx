import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack } from "@mui/material";
import { Link } from "@/app/common/components/NextLink";
import { GroupEventsTabs } from "../_components/GroupEventsTabs";
import { GroupHeader } from "../../_components/GroupHeader";
import { FileCopy, Print, Save, Share } from "@mui/icons-material";

const actions = [
  { icon: <FileCopy />, name: "Copy" },
  { icon: <Save />, name: "Save" },
  { icon: <Print />, name: "Print" },
  { icon: <Share />, name: "Share" },
];

export const GroupEventsPage = () => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
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
              LinkComponent={Link}
              href="events/createEvent"
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
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16, }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial>
    </Stack>
  );
};
