import {
  filterSearchCategoriesByValues,
  filterSearchLocationsByValues,
} from "@/app/(group)/groups/[[...params]]/utils/groups.routing";
import { DateOfAdding, NumberOfMembers } from "@/app/common/components/Sort/GroupAndEventSort";
import { getEventTiles, getSearchCategories, getSearchCities, getSearchEventTitles } from "@/app/mock/mock-api";
import { SearchCategoryDto, SearchCityDto, SearchTitleDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { EventTiles } from "./event-tiles";
import { EventsListing } from "./events-listing";

interface Props {
  categories: string[];
  locations: string[];
  titles: string[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
  numberOfMembers: NumberOfMembers;
  dateOfAdding: DateOfAdding;
}

export const EventsPage = ({
  locations,
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
  const tiles = getEventTiles({
    locations,
    categories,
    titles,
    remote,
    sponsored,
    verified,
    minMembers,
    maxMembers,
  });
  const allLocations = getSearchCities();
  const allCategories = getSearchCategories();
  const allTitles = getSearchEventTitles().slice(0, 15);

  const searchLocations: SearchCityDto[] = useMemo(
    () => filterSearchLocationsByValues(locations, allLocations),
    [locations, allLocations]
  );

  const searchCategories: SearchCategoryDto[] = useMemo(
    () => filterSearchCategoriesByValues(categories, allCategories),
    [categories, allCategories]
  );

  const searchTitles: SearchTitleDto[] = titles.map((title) => ({
    value: title,
    label: title,
    type: "title",
  }));

  return (
    <Stack gap={3}>
      <EventsListing
        searchLocations={searchLocations}
        searchCategories={searchCategories}
        searchTitles={searchTitles}
        allLocations={allLocations}
        allCategories={allCategories}
        allTitles={allTitles}
        remote={remote}
        sponsored={sponsored}
        verified={verified}
        minMembers={minMembers}
        maxMembers={maxMembers}
        numberOfMembers={numberOfMembers}
        dateOfAdding={dateOfAdding}
      />
      <EventTiles tiles={tiles} />
    </Stack>
  );
};
