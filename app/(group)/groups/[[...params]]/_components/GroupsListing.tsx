import { GroupAndEventFilter } from "@/app/common/components/Filter/GroupAndEventFilter";
import { GroupAndEventSort } from "@/app/common/components/Sort/GroupAndEventSort";
import { SearchCategoryDto, SearchCityDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { GroupAndEventAutocompleteRouted } from "./GroupAndEventAutocompleteRouted";

interface Props {
  titles: string[];
  searchLocations: SearchCityDto[];
  searchCategories: SearchCategoryDto[];
  allLocations: SearchCityDto[];
  allCategories: SearchCategoryDto[];
}

export const GroupsListing = ({ titles, searchCategories, searchLocations, allCategories, allLocations }: Props) => {
  return (
    <Stack direction="row" gap={1}>
      <GroupAndEventAutocompleteRouted
        titles={titles}
        searchCategories={searchCategories}
        searchLocations={searchLocations}
        allCategories={allCategories}
        allLocations={allLocations}
      />
      <GroupAndEventFilter />
      <GroupAndEventSort />
    </Stack>
  );
};
