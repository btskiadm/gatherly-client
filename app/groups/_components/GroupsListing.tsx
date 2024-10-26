import { GroupAndEventAutocomplete } from "@/app/common/components/Autocomplete/GroupAndEventAutocomplete";
import { GroupAndEventFilter } from "@/app/common/components/Filter/GroupAndEventFilter";
import { GroupAndEventSort } from "@/app/common/components/Sort/GroupAndEventSort";
import { Stack } from "@mui/material";

export const GroupsListing = () => {
  return (
    <Stack direction="row" gap={1}>
      <GroupAndEventAutocomplete />
      <GroupAndEventFilter />
      <GroupAndEventSort />
    </Stack>
  );
};
