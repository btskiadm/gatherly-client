import { StackedGroups } from "@/app/mock/mock";
import { Stack } from "@mui/material";
import { GroupStackAttributes } from "./GroupStackAttributes";
import { GroupTilesList } from "./GroupTilesList";

export const GroupsStack = ({ stackedGroup }: { stackedGroup: StackedGroups }) => {
  const { attributes, tiles } = stackedGroup;
  return (
    <Stack gap={2} width="100%">
      <GroupStackAttributes attributes={attributes} />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
