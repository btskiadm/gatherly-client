import { getStackedGroups } from "@/app/mock/mock";
import { Stack } from "@mui/material";
import { GroupsListing } from "./GroupsListing";
import { GroupsStack } from "./GroupsStack";

//todo: mock
const stackedGroups = getStackedGroups();

export const GroupsPage = () => {
  return (
    <Stack gap={3}>
      <GroupsListing />
      {stackedGroups.map((stackedGroup, idx) => (
        <GroupsStack key={idx} stackedGroup={stackedGroup} />
      ))}
    </Stack>
  );
};
