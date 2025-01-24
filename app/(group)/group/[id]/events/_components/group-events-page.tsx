import { GroupDetailsDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/group-header";
import { GroupEventsTabs } from "./group-events-tabs";

interface Props {
  groupDetails: GroupDetailsDto;
}

export const GroupEventsPage = ({ groupDetails }: Props) => {
  const label = groupDetails.eventsLength > 99 ? "(99+)" : `(${groupDetails.eventsLength})`;
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Events" subPrimary={label} secondary="See scheduled group eventsevents." />
      <GroupEventsTabs groupDetails={groupDetails} />
    </Stack>
  );
};
