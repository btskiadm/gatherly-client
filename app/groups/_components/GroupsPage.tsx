import { getStackedGroups } from "@/app/mock/mock";
import { Stack } from "@mui/material";
import { GroupsListing } from "./GroupsListing";
import { GroupsStack } from "./GroupsStack";

export const GroupsPage = () => {
  const stackedGroups = getStackedGroups();
  return (
    <Stack gap={3}>
      <GroupsListing />
      {stackedGroups.map((stackedGroup, idx) => (
        <GroupsStack key={idx} stackedGroup={stackedGroup} />
      ))}
    </Stack>
  );
};
