import { getGroupTiles, getSearchCategories, getSearchCities, getSearchGroups } from "@/app/mock/mock-api";
import { SearchCategoryDto, SearchCityDto, SearchGroupDto } from "@/app/mock/mock-api.types";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { filterSearchCategoriesByValues, filterSearchLocationsByValues } from "../utils/groups.routing";
import { GroupTilesList } from "./GroupTilesList";
import { GroupsListing } from "./GroupsListing";

interface Props {
  categories: string[];
  locations: string[];
  titles: string[];
}

export const GroupsPage = ({ locations, categories, titles }: Props) => {
  const tiles = getGroupTiles({ locations, categories, titles });
  const allLocations = getSearchCities();
  const allCategories = getSearchCategories();
  const allTitles = getSearchGroups().slice(0, 15);

  const searchLocations: SearchCityDto[] = useMemo(
    () => filterSearchLocationsByValues(locations, allLocations),
    [locations, allLocations]
  );

  const searchCategories: SearchCategoryDto[] = useMemo(
    () => filterSearchCategoriesByValues(categories, allCategories),
    [categories, allCategories]
  );

  const searchTitles: SearchGroupDto[] = titles.map((title) => ({
    value: title,
    label: title,
    type: "title",
  }));

  return (
    <Stack gap={3}>
      <GroupsListing
        searchLocations={searchLocations}
        searchCategories={searchCategories}
        searchTitles={searchTitles}
        allLocations={allLocations}
        allCategories={allCategories}
        allTitles={allTitles}
      />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
