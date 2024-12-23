import { GroupAndEventSort } from "@/app/common/components/Sort/GroupAndEventSort";
import { SearchCategoryDto, SearchCityDto, SearchTitleDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { EventAutocompleteRouted } from "./EventAutocompleteRouted";
import { EventFilterRouted } from "./EventFilterRouted";

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
}

export const EventsListing = ({
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
      <EventAutocompleteRouted
        searchCategories={searchCategories}
        searchLocations={searchLocations}
        searchTitles={searchTitles}
        allCategories={allCategories}
        allLocations={allLocations}
        allTitles={allTitles}
      />
      <EventFilterRouted
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
