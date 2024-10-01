import {
  CloudOutlined,
  FmdGoodOutlined,
  InterestsOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { GroupsStackData } from "../mock";
import { GroupTilesList } from "./GroupTilesList";
import { GroupStackTags } from "./GroupStackTags";

export const GroupsStack = ({ tags, tiles }: PropsWithChildren<GroupsStackData>) => {
  return (
    <Stack gap={2} width="100%">
      <GroupStackTags tags={tags} />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
