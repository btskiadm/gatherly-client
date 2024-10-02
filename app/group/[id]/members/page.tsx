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
          <>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
                height: "min-content",
              }}
            >
              Add member
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                display: {
                  sm: "none",
                },
                height: "min-content",
              }}
            >
              Add
            </Button>
          </>
        }
      />
      <GroupMembersList />
    </Stack>
  );
}
