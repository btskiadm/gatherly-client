import { Stack } from "@mui/material";
import { GroupHeader } from "../../../_components/GroupHeader";
import { GroupMembersList } from "../../_components/GroupMembersList";

export const GroupMembersPage = () => {
  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader primary="Members" subPrimary="(99+)" secondary="See group members." />
      <GroupMembersList />
    </Stack>
  );
};
