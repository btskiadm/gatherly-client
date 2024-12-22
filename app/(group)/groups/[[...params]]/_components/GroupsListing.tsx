import { GroupAndEventFilter } from "@/app/common/components/Filter/GroupAndEventFilter";
import { GroupAndEventSort } from "@/app/common/components/Sort/GroupAndEventSort";
import { SearchCategoryDto, SearchCityDto, SearchGroupDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { GroupAndEventAutocompleteRouted } from "./GroupAndEventAutocompleteRouted";

interface Props {
  searchLocations: SearchCityDto[];
  searchCategories: SearchCategoryDto[];
  searchTitles: SearchGroupDto[];
  allLocations: SearchCityDto[];
  allCategories: SearchCategoryDto[];
  allTitles: SearchGroupDto[];
}

export const GroupsListing = ({
  searchCategories,
  searchLocations,
  searchTitles,
  allCategories,
  allLocations,
  allTitles,
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
      <GroupAndEventFilter />
      <GroupAndEventSort />
    </Stack>
  );
};
