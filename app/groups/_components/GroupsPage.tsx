import { Stack } from "@mui/material";
import { stackedGroupTiles } from "../mock";
import { GroupsListing } from "./GroupsListing";
import { GroupsStack } from "./GroupsStack";

export const GroupsPage = () => {
  return (
    <Stack gap={3}>
      <GroupsListing />
      {stackedGroupTiles.map(({ tags, tiles }, idx) => (
        <GroupsStack key={idx} tags={tags} tiles={tiles} />
      ))}
    </Stack>
  );
};
