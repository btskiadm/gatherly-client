"use client";

import { GroupAndEventAutocomplete, SearchItem } from "@/app/common/components/Autocomplete/GroupAndEventAutocomplete";
import {
  getGroupTitlesQueryOptions,
  getUsedCategoriesQueryOptions,
  getUsedCitiesQueryOptions,
} from "@/app/common/graphql/options/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { createGroupsRoute, uniqueSearchItems } from "../utils/groups.routing";

interface Props {
  cities: string[];
  categories: string[];
  titles: string[];
}

export const GroupsAutocompleteRouted = ({ cities, categories, titles }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    data: { getUsedCategories = [] },
  } = useSuspenseQuery(getUsedCategoriesQueryOptions());
  const {
    data: { getUsedCities = [] },
  } = useSuspenseQuery(getUsedCitiesQueryOptions());
  const {
    data: { getGroupTitles = [] },
  } = useSuspenseQuery(getGroupTitlesQueryOptions());

  const searchItems = useMemo(() => {
    const categorySet = new Set(categories);
    const citySet = new Set(cities);
    const titleSet = new Set(titles);

    return [
      ...getUsedCategories.filter(({ value }) => categorySet.has(value)),
      ...getUsedCities.filter(({ value }) => citySet.has(value)),
      ...getGroupTitles.filter(({ value }) => titleSet.has(value)),
    ];
  }, [getUsedCategories, getUsedCities, getGroupTitles, categories, cities, titles]);

  const onChange = useCallback(
    (items: SearchItem[]) => {
      const unique = uniqueSearchItems(items);
      router.push(createGroupsRoute(unique, searchParams));
    },
    [searchParams, router]
  );

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
      categories={getUsedCategories}
      cities={getUsedCities}
      titles={getGroupTitles}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
};
