import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/group-header";
import { GroupCalendar } from "./group-calendar-component";
import { GroupDetailsDto } from "@/app/mock/mock-api.types";

interface Props {
  groupDetails: GroupDetailsDto;
}

export const GroupCalendarPage = ({ groupDetails }: Props) => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Calendar" secondary="See group events on calendar." />
      <GroupCalendar groupDetails={groupDetails} />
    </Stack>
  );
};
