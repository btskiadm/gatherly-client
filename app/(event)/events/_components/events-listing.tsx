import { DateOfAdding, NumberOfMembers } from "@/app/common/components/Sort/group-and-event-sort";
import { SearchCategoryDto, SearchCityDto, SearchTitleDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { EventAutocompleteRouted } from "./event-autocomplete-routed";
import { EventFilterRouted } from "./event-filter-routed";
import { EventsSortRouted } from "./events-sort-routed";

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
  numberOfMembers,
  dateOfAdding,
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
      <EventsSortRouted numberOfMembers={numberOfMembers} dateOfAdding={dateOfAdding} />
    </Stack>
  );
};
