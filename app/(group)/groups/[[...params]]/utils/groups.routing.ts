import { SearchItem, SearchItemType } from "@/app/common/components/Autocomplete/group-and-event-autocomplete";
import { DateOfAdding, NumberOfMembers } from "@/app/common/components/Sort/group-and-event-sort";
import { SearchCategoryDto, SearchCityDto } from "@/app/mock/mock-api.types";

export const ALL_LOCATIONS = "all-locations";
export const EMPTY_ROUTE = "";

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

export const resolveQueries = ({
  titles,
  numberOfMembers,
  dateOfAdding,
}: {
  titles?: string;
  numberOfMembers?: string;
  dateOfAdding?: string;
}): { titles: string[]; numberOfMembers: NumberOfMembers; dateOfAdding: DateOfAdding } => {
  return {
    titles: titles && titles?.length > 0 ? parseParams(titles) : [],
    numberOfMembers: (numberOfMembers ?? "ascending") as NumberOfMembers,
    dateOfAdding: (dateOfAdding ?? "newest") as DateOfAdding,
  };
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
  items.filter((item, index, array) => array.findIndex((arr) => arr.value === item.value) === index);

const searchItemToRouterParamsByValue = (searchItems: SearchItem[], type: SearchItemType) =>
  searchItems
    .filter((item) => item.type === type)
    .map(({ value }) => value)
    .join(",");

const searchItemToRouterParamsByLabel = (searchItems: SearchItem[], type: SearchItemType) =>
  searchItems
    .filter((item) => item.type === type)
    .map(({ label }) => label)
    .join(",");

const createLocationsParam = (searchItems: SearchItem[]) => {
  const parsedLocations = searchItemToRouterParamsByValue(searchItems, "city");
  const locations = parsedLocations.length <= 0 ? ALL_LOCATIONS : parsedLocations;
  return locations;
};

const createCategoriesParam = (searchItems: SearchItem[]) => {
  const parsedCategories = searchItemToRouterParamsByValue(searchItems, "category");
  const categories = parsedCategories.length <= 0 ? EMPTY_ROUTE : parsedCategories;
  return categories;
};

const createTitlesQuery = (searchItems: SearchItem[]) => {
  const parsedCategories = searchItemToRouterParamsByLabel(searchItems, "title");

  if (parsedCategories.length <= 0) {
    return EMPTY_ROUTE;
  }

  return parsedCategories;
};

export const createGroupsRoute = (searchItems: SearchItem[], urlSearchParams: URLSearchParams) => {
  const locations = createLocationsParam(searchItems);
  const categories = createCategoriesParam(searchItems);
  const titles = createTitlesQuery(searchItems);
  const searchParams = new URLSearchParams(urlSearchParams);

  let route = "/groups";

  if (locations === ALL_LOCATIONS && categories.length <= 0) {
    // route
  } else {
    route = `/groups/${locations}${categories ? "/" + categories : EMPTY_ROUTE}`;
  }

  if (titles.length > 0) {
    searchParams.set("titles", titles);
  } else {
    searchParams.delete("titles");
  }

  searchParams.sort();

  if (searchParams.size > 0) {
    return route + "?" + searchParams.toString();
  }

  return route;
};
