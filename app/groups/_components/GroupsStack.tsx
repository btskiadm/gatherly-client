import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { GroupsStackData } from "../mock";
import { GroupStackTags } from "./GroupStackTags";
import { GroupTilesList } from "./GroupTilesList";

export const GroupsStack = ({ tags, tiles }: PropsWithChildren<GroupsStackData>) => {
  return (
    <Stack gap={2} width="100%">
      <GroupStackTags tags={tags} />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
