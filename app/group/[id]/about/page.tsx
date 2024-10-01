import { Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";

export default function GroupMembersPage() {
  return (
    <Stack gap={3}>
      <GroupHeader primary="About" secondary="See basic information about group." />
    </Stack>
  );
}
