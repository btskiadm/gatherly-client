import { GroupDetailsDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupEventsTabs } from "../_components/GroupEventsTabs";

interface Props {
  groupDetails: GroupDetailsDto;
}

export const GroupEventsPage = ({ groupDetails }: Props) => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Events" subPrimary="(99+)" secondary="See scheduled group eventsevents." />
      <GroupEventsTabs groupDetails={groupDetails} />
    </Stack>
  );
};
