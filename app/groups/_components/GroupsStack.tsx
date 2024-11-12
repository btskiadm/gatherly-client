import { StackedGroupTilesDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { GroupStackAttributes } from "./GroupStackAttributes";
import { GroupTilesList } from "./GroupTilesList";

export const GroupsStack = ({ stackedGroupTile }: { stackedGroupTile: StackedGroupTilesDto }) => {
  const { attributes, tiles } = stackedGroupTile;
  return (
    <Stack gap={2} width="100%">
      <GroupStackAttributes attributes={attributes} />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
