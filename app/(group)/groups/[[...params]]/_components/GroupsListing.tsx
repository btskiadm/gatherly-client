import { DateOfAdding, NumberOfMembers } from "@/app/common/components/Sort/GroupAndEventSort";
import { Stack } from "@mui/material";
import { GroupsAutocompleteRouted } from "./GroupsAutocompleteRouted";
import { GroupsFilterRouted } from "./GroupsFilterRouted";
import { GroupsSortRouted } from "./GroupsSortRouted";

interface Props {
  cities: string[];
  categories: string[];
  titles: string[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
  numberOfMembers: NumberOfMembers;
  dateOfAdding: DateOfAdding;
}

export const GroupsListing = ({
  cities,
  categories,
  titles,
  remote,
  sponsored,
  verified,
  minMembers,
  maxMembers,
  numberOfMembers,
  dateOfAdding,
}: Props) => {
  return (
    <Stack direction="row" gap={1}>
      <GroupsAutocompleteRouted cities={cities} titles={titles} categories={categories} />
      <GroupsFilterRouted
        remote={remote}
        verified={verified}
        sponsored={sponsored}
        minMembers={minMembers}
        maxMembers={maxMembers}
      />
      <GroupsSortRouted numberOfMembers={numberOfMembers} dateOfAdding={dateOfAdding} />
    </Stack>
  );
};
