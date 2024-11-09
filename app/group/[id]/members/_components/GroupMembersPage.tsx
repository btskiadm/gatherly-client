import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupMembersList } from "./GroupMembersList";
import { GroupDetails } from "@/app/mock/mock";

interface Props {
  groupDetails: GroupDetails;
}

export const GroupMembersPage = ({ groupDetails }: Props) => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Members" subPrimary="(99+)" secondary="See group members." />
      <GroupMembersList groupUsers={groupDetails.users} />
    </Stack>
  );
};
