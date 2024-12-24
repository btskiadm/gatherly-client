import { DateOfAdding, GroupAndEventSort, NumberOfMembers } from "@/app/common/components/Sort/GroupAndEventSort";
import { SearchCategoryDto, SearchCityDto, SearchTitleDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { GroupsAutocompleteRouted } from "./GroupsAutocompleteRouted";
import { GroupsFilterRouted } from "./GroupsFilterRouted";
import { GroupsSortRouted } from "./GroupsSortRouted";

interface Props {
  searchLocations: SearchCityDto[];
  searchCategories: SearchCategoryDto[];
  searchTitles: SearchTitleDto[];
  allLocations: SearchCityDto[];
  allCategories: SearchCategoryDto[];
  allTitles: SearchTitleDto[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
  numberOfMembers: NumberOfMembers;
  dateOfAdding: DateOfAdding;
}

export const GroupsListing = ({
  searchCategories,
  searchLocations,
  searchTitles,
  allCategories,
  allLocations,
  allTitles,
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
      <GroupsAutocompleteRouted
        searchCategories={searchCategories}
        searchLocations={searchLocations}
        searchTitles={searchTitles}
        allCategories={allCategories}
        allLocations={allLocations}
        allTitles={allTitles}
      />
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
