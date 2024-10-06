import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupCalendar } from "./GroupCalendar.component";

export const GroupCalendarPage = () => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Calendar" secondary="See group events on calendar." />
      <GroupCalendar />
    </Stack>
  );
};
