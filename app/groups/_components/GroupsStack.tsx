import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { GroupStackTags } from "./GroupStackTags";
import { GroupTilesList } from "./GroupTilesList";
import { StackedGroupTiles } from "../mock";

export const GroupsStack = ({ tags, tiles }: PropsWithChildren<StackedGroupTiles>) => {
  return (
    <Stack gap={2} width="100%">
      <GroupStackTags tags={tags} />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
