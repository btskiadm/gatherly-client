import { SearchItem, SearchItemType } from "@/app/common/components/Autocomplete/GroupAndEventAutocomplete";
import { SearchCategoryDto, SearchCityDto } from "@/app/mock/mock-api.types";

const ALL_LOCATIONS = "all-locations";
const EMPTY_ROUTE = "";

export interface ParsedParams {
  locations: string[];
  categories: string[];
}

const create = (locations: string[] = [], categories: string[] = []): ParsedParams => ({ locations, categories });

const parseParams = (param: string) => Array.from(new Set(decodeURIComponent(param).split(",")));

export const resolveParams = (params: string[]): ParsedParams => {
  // empty
  if (!params || (params && params.length === 0)) {
    return create();
  }

  // lodz,warsaw,cracow
  if (params[0] !== ALL_LOCATIONS && params.length === 1) {
    return create(parseParams(params[0]));
  }

  // all-locations/football,basketball,dance
  if (params[0] === ALL_LOCATIONS && params.length >= 2) {
    return create([], parseParams(params[1]));
  }

  return create(parseParams(params[0]), parseParams(params[1]));
};

export const resolveQueries = ({ titles }: { titles: string }) => {
  return { titles: parseParams(titles) };
};

export const filterSearchCategoriesByValues = (categoryValues: string[], availableCategories: SearchCategoryDto[]) => {
  const searchValues = Array.from(new Set(categoryValues));

  return availableCategories.filter((c) => c.type === "category" && searchValues.some((value) => value === c.value));
};

export const filterSearchLocationsByValues = (locationValues: string[], availableLocations: SearchCityDto[]) => {
  const searchValues = Array.from(new Set(locationValues));

  return availableLocations.filter((l) => l.type === "city" && searchValues.some((value) => value === l.value));
};

export const uniqueSearchItems = (items: SearchItem[]) =>
  items.filter((item, index, array) => array.findIndex((value) => value === item) === index);

const searchItemToRouterParams = (searchItems: SearchItem[], type: SearchItemType) =>
  searchItems
    .filter((item) => item.type === type)
    .map(({ value }) => value)
    .join(",");

const createLocationsParam = (searchItems: SearchItem[]) => {
  const parsedLocations = searchItemToRouterParams(searchItems, "city");
  const locations = parsedLocations.length <= 0 ? ALL_LOCATIONS : parsedLocations;
  return locations;
};

const createCategoriesParam = (searchItems: SearchItem[]) => {
  const parsedCategories = searchItemToRouterParams(searchItems, "category");
  const categories = parsedCategories.length <= 0 ? EMPTY_ROUTE : parsedCategories;
  return categories;
};

export const createGroupsRoute = (searchItems: SearchItem[]) => {
  const locations = createLocationsParam(searchItems);
  const categories = createCategoriesParam(searchItems);

  if (locations === ALL_LOCATIONS && categories.length <= 0) {
    return "/groups";
  }

  return `/groups/${locations}${categories ? "/" + categories : EMPTY_ROUTE}`;
};
