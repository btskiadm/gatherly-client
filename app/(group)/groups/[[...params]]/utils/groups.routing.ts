import { SearchItem, SearchItemType } from "@/app/common/components/Autocomplete/GroupAndEventAutocomplete";
import { DateOfAdding, NumberOfMembers } from "@/app/common/components/Sort/GroupAndEventSort";
import { CategoryDto, CityDto } from "@/app/common/graphql/dto";

export const ALL_CITIES = "all-cities";
export const EMPTY_ROUTE = "";

export interface ParsedParams {
  cities: string[];
  categories: string[];
}

const createParams = (cities: string[] = [], categories: string[] = []): ParsedParams => ({ cities, categories });
const parseParams = (param: string) => [...new Set(decodeURIComponent(param).split(","))];

export const resolveParams = (params: string[]): ParsedParams => {
  if (!params?.length) return createParams();

  const [first, second] = params;
  if (first !== ALL_CITIES && params.length === 1) return createParams(parseParams(first));
  if (first === ALL_CITIES) return createParams([], second ? parseParams(second) : []);

  return createParams(parseParams(first), parseParams(second));
};

export const resolveQueries = ({
  titles,
  numberOfMembers,
  dateOfAdding,
}: {
  titles?: string;
  numberOfMembers?: string;
  dateOfAdding?: string;
}): { titles: string[]; numberOfMembers: NumberOfMembers; dateOfAdding: DateOfAdding } => ({
  titles: titles ? parseParams(titles) : [],
  numberOfMembers: (numberOfMembers ?? "ascending") as NumberOfMembers,
  dateOfAdding: (dateOfAdding ?? "newest") as DateOfAdding,
});

const filterSearchByValues = <T extends { value: string }>(values: string[], availableItems: T[]) => {
  const searchSet = new Set(values);
  return availableItems.filter((item) => searchSet.has(item.value));
};

export const filterSearchCategoriesByValues = (categoryValues: string[], availableCategories: CategoryDto[]) =>
  filterSearchByValues(categoryValues, availableCategories);

export const filterSearchLocationsByValues = (locationValues: string[], availableLocations: CityDto[]) =>
  filterSearchByValues(locationValues, availableLocations);

export const uniqueSearchItems = (items: SearchItem[]) =>
  items.filter((item, index, array) => array.findIndex(({ value }) => value === item.value) === index);

const searchItemToRouterParams = (searchItems: SearchItem[], type: SearchItemType, key: "value" | "label") =>
  searchItems
    .filter((item) => item.__typename === type)
    .map((item) => item[key])
    .join(",");

const createParam = (searchItems: SearchItem[], type: SearchItemType, defaultValue: string) => {
  const parsedValues = searchItemToRouterParams(searchItems, type, "value");
  return parsedValues.length ? parsedValues : defaultValue;
};

export const createGroupsRoute = (searchItems: SearchItem[], urlSearchParams: URLSearchParams) => {
  const locations = createParam(searchItems, "City", ALL_CITIES);
  const categories = createParam(searchItems, "Category", EMPTY_ROUTE);
  const titles = searchItemToRouterParams(searchItems, "Title", "label");
  const searchParams = new URLSearchParams(urlSearchParams);

  let route = "/groups";
  if (!(locations === ALL_CITIES && !categories)) {
    route = `/groups/${locations}${categories ? "/" + categories : ""}`;
  }

  if (titles) {
    searchParams.set("titles", titles);
  } else {
    searchParams.delete("titles");
  }

  searchParams.sort();

  return searchParams.size > 0 ? `${route}?${searchParams.toString()}` : route;
};
