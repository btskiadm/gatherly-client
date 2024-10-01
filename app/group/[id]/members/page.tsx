import { Button, Stack } from "@mui/material";
import { GroupHeader } from "../_components/GroupHeader";
import { GroupMembersList } from "./_components/GroupMembersList";

export default function GroupMembersPage() {
  return (
    <Stack gap={3}>
      <GroupHeader
        primary="Members"
        subPrimary="(99+)"
        secondary="See group members."
        actions={
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              height: "min-content",
            }}
          >
            Add member
          </Button>
        }
      />
      <GroupMembersList />
    </Stack>
  );
}
