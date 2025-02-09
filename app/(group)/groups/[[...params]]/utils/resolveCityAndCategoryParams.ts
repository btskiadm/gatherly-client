import { decodeAndParseUniqueParams } from "./decodeAndParseUniqueParams";

export const ALL_CITIES = "all-cities";
export const EMPTY_ROUTE = "";

export interface CityAndCategoryParams {
  cities: string[];
  categories: string[];
}

const createCityAndCategoryParams = (cities: string[] = [], categories: string[] = []): CityAndCategoryParams => ({
  cities,
  categories,
});

export const resolveCityAndCategoryParams = (params: string[]): CityAndCategoryParams => {
  if (!params?.length) return createCityAndCategoryParams();

  const [first, second] = params;
  if (first !== ALL_CITIES && params.length === 1)
    return createCityAndCategoryParams(decodeAndParseUniqueParams(first));
  if (first === ALL_CITIES) return createCityAndCategoryParams([], second ? decodeAndParseUniqueParams(second) : []);

  return createCityAndCategoryParams(decodeAndParseUniqueParams(first), decodeAndParseUniqueParams(second));
};
