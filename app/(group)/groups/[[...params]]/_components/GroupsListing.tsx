import { GroupAndEventSort } from "@/app/common/components/Sort/GroupAndEventSort";
import { SearchCategoryDto, SearchCityDto, SearchGroupDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { GroupAndEventAutocompleteRouted } from "./GroupAndEventAutocompleteRouted";
import { GroupAndEventFilterRouted } from "./GroupAndEventFilterRouted";

interface Props {
  searchLocations: SearchCityDto[];
  searchCategories: SearchCategoryDto[];
  searchTitles: SearchGroupDto[];
  allLocations: SearchCityDto[];
  allCategories: SearchCategoryDto[];
  allTitles: SearchGroupDto[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
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
}: Props) => {
  return (
    <Stack direction="row" gap={1}>
      <GroupAndEventAutocompleteRouted
        searchCategories={searchCategories}
        searchLocations={searchLocations}
        searchTitles={searchTitles}
        allCategories={allCategories}
        allLocations={allLocations}
        allTitles={allTitles}
      />
      <GroupAndEventFilterRouted
        remote={remote}
        verified={verified}
        sponsored={sponsored}
        minMembers={minMembers}
        maxMembers={maxMembers}
      />
      <GroupAndEventSort />
    </Stack>
  );
};
