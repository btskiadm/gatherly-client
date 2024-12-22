import { getGroupTiles, getSearchCategories, getSearchCities } from "@/app/mock/mock-api";
import { SearchCategoryDto, SearchCityDto } from "@/app/mock/mock-api.types";
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

  const searchLocations: SearchCityDto[] = useMemo(
    () => filterSearchLocationsByValues(locations, allLocations),
    [locations, allLocations]
  );

  const searchCategories: SearchCategoryDto[] = useMemo(
    () => filterSearchCategoriesByValues(categories, allCategories),
    [categories, allCategories]
  );

  return (
    <Stack gap={3}>
      <GroupsListing
        titles={titles}
        searchLocations={searchLocations}
        searchCategories={searchCategories}
        allLocations={allLocations}
        allCategories={allCategories}
      />
      <GroupTilesList tiles={tiles} />
    </Stack>
  );
};
