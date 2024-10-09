import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupEventsTabs } from "../_components/GroupEventsTabs";

export const GroupEventsPage = () => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Events" subPrimary="(99+)" secondary="See scheduled group eventsevents." />
      <GroupEventsTabs />
    </Stack>
  );
};
