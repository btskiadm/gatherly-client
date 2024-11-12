import { Stack } from "@mui/material";
import { GroupsListing } from "./GroupsListing";
import { GroupsStack } from "./GroupsStack";
import { getStackedGroupTiles } from "@/app/mock/mock-api";

//todo: mock
const stackedGroupTiles = getStackedGroupTiles();

export const GroupsPage = () => {
  return (
    <Stack gap={3}>
      <GroupsListing />
      {stackedGroupTiles.map((stackedGroupTile, idx) => (
        <GroupsStack key={idx} stackedGroupTile={stackedGroupTile} />
      ))}
    </Stack>
  );
};
