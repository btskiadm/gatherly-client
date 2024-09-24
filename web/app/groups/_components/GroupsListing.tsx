import { Stack } from "@mui/material";
import { GroupsAutocomplete } from "./GroupsAutocomplete";
import { GroupsFilter } from "./GroupsFilter";
import { GroupsSort } from "./GroupsSort";

export const GroupsListing = () => {
  return (
    <Stack direction="row" gap={1}>
      <GroupsAutocomplete />
      <GroupsFilter />
      <GroupsSort />
    </Stack>
  );
};
