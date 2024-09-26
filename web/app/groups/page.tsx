import { Stack } from "@mui/material";
import { CreateGroupModal } from "./_components/CreateGroupModal";
import { GroupsListing } from "./_components/GroupsListing";
import { GroupsStack } from "./_components/GroupsStack";
import { stack } from "./mock";

export default async function GroupsPage() {
  return (
    <Stack gap={3} mt={4}>
      <GroupsListing />
      <Stack gap={6} direction="row" flexWrap="wrap" justifyContent="center">
        {stack.map((s, idx) => (
          <GroupsStack key={idx} tags={s.tags} tiles={s.tiles} />
        ))}
      </Stack>
    </Stack>
  );
}
