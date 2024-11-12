import { CategoryDto, CityDto, SearchCategoryDto, SearchCityDto } from "@/app/mock/mock-api.types";

export const cityDtoToSearchCityDto = (city: CityDto): SearchCityDto => ({
  ...city,
  type: "city",
});

export const categoryDtoToSearchCategoryDto = (category: CategoryDto): SearchCategoryDto => ({
  ...category,
  type: "category",
});
