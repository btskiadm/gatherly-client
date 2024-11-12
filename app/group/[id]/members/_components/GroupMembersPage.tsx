import { GroupDetailsDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupMembersList } from "./GroupMembersList";

interface Props {
  groupDetails: GroupDetailsDto;
}

export const GroupMembersPage = ({ groupDetails }: Props) => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Members" subPrimary="(99+)" secondary="See group members." />
      <GroupMembersList groupUsers={groupDetails.users} />
    </Stack>
  );
};
