import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/GroupHeader";

export const GroupCalendarPage = () => {
  return (
    <Stack gap={3}>
      <GroupHeader primary="Calendar" secondary="See group events on calendar." />
    </Stack>
  );
};
