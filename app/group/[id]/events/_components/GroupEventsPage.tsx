import { GroupDetails } from "@/app/mock/mock";
import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupEventsTabs } from "../_components/GroupEventsTabs";

interface Props {
  groupDetails: GroupDetails;
}

export const GroupEventsPage = ({ groupDetails }: Props) => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Events" subPrimary="(99+)" secondary="See scheduled group eventsevents." />
      <GroupEventsTabs groupDetails={groupDetails} />
    </Stack>
  );
};
