import { Stack } from "@mui/material";
import { GroupsListing } from "./_components/GroupsListing";
import { GroupsStack } from "./_components/GroupsStack";
import { stack } from "./mock";
import Link from "next/link";

export default async function GroupsPage() {
  return (
    <Stack gap={3} mt={4}>
      <Link href="/login">link</Link>
      <GroupsListing />
      <Stack gap={6} direction="row" flexWrap="wrap" justifyContent="center">
        {stack.map((s, idx) => (
          <GroupsStack key={idx} tags={s.tags} tiles={s.tiles} />
        ))}
      </Stack>
    </Stack>
  );
}
