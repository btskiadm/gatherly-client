import { Link } from "@/app/common/components/NextLink";
import { Button, Stack } from "@mui/material";
import { GroupHeader } from "../../../_components/GroupHeader";
import { GroupMembersList } from "../../_components/GroupMembersList";

export const GroupMembersPage = () => {
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
              LinkComponent={Link}
              href="members/add"
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
              LinkComponent={Link}
              href="members/add"
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
};
