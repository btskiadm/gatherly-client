import { Stack } from "@mui/material";
import { GroupsListing } from "./_components/GroupsListing";
import { GroupsStack } from "./_components/GroupsStack";
import { stack } from "./mock";

export default async function GroupsPage() {
  return (
    <Stack gap={3} mt={4}>
      <GroupsListing />
      <Stack gap={6} direction="row" flexWrap="wrap" justifyContent="center">
        {stack.map(({ tags, tiles }, idx) => (
          <GroupsStack key={idx} tags={tags} tiles={tiles} />
        ))}
      </Stack>
    </Stack>
  );
}
