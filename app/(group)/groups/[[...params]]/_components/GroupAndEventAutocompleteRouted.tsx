"use client";

import { GroupAndEventAutocomplete, SearchItem } from "@/app/common/components/Autocomplete/GroupAndEventAutocomplete";
import { SearchCategoryDto, SearchCityDto, SearchGroupDto } from "@/app/mock/mock-api.types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createGroupsRoute, uniqueSearchItems } from "../utils/groups.routing";

interface Props {
  searchLocations: SearchCityDto[];
  searchCategories: SearchCategoryDto[];
  searchTitles: SearchGroupDto[];
  allLocations: SearchCityDto[];
  allCategories: SearchCategoryDto[];
  allTitles: SearchGroupDto[];
}

export const GroupAndEventAutocompleteRouted = ({
  searchCategories,
  searchLocations,
  searchTitles,
  allCategories,
  allLocations,
  allTitles,
}: Props) => {
  const router = useRouter();

  const [searchItems, setSearchItems] = useState<SearchItem[]>(() => {
    return uniqueSearchItems([...searchCategories, ...searchLocations, ...searchTitles]);
  });

  const onChange = useCallback((items: SearchItem[]) => {
    const unique = uniqueSearchItems(items);

    setSearchItems(unique);

    router.push(createGroupsRoute(unique));
  }, []);

  const onDelete = useCallback(
    (itemToDelete: SearchItem) => {
      const items = searchItems.filter(({ value }) => value !== itemToDelete.value);
      onChange(items);
    },
    [searchItems, onChange]
  );

  return (
    <GroupAndEventAutocomplete
      selected={searchItems}
      onChange={onChange}
      onDelete={onDelete}
      allCategories={allCategories}
      allLocations={allLocations}
      allTitles={allTitles}
    />
  );
};
