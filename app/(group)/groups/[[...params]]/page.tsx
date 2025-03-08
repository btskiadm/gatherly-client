import { DateOfAdding, NumberOfMembers } from "@/app/common/components/Sort/GroupAndEventSort";
import {
  getGroupTilesQueryOptions,
  getUsedCategoriesQueryOptions,
  getUsedCitiesQueryOptions,
} from "@/app/common/graphql/options/query";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { decodeAndParseUniqueParams } from "./utils/decodeAndParseUniqueParams";
import { resolveCityAndCategoryParams } from "./utils/resolveCityAndCategoryParams";
import { GroupsPage } from "./_components/GroupsPage";

export default async function Page({
  params: promiseParams,
  searchParams: promiseSearchParams,
}: {
  params: Promise<{ params: string[] }>;
  searchParams: Promise<{
    titles?: string;
    sponsored?: string;
    verified?: string;
    remote?: string;
    minMembers?: string;
    maxMembers?: string;
    numberOfMembers?: string;
    dateOfAdding?: string;
  }>;
}) {
  const queryClient = new QueryClient();

  const [params, searchParams] = await Promise.all([promiseParams, promiseSearchParams]);
  const {
    dateOfAdding,
    maxMembers,
    minMembers,
    numberOfMembers: numberOfMembersParam,
    remote,
    sponsored,
    titles: titlesParam,
    verified,
  } = searchParams;

  const _sponsored = Boolean(sponsored);
  const _remote = Boolean(remote);
  const _verified = Boolean(verified);
  const _minMembers = minMembers ? parseInt(minMembers, 10) : 1;
  const _maxMembers = maxMembers ? parseInt(maxMembers, 10) : 50;

  const { categories, cities } = resolveCityAndCategoryParams(params.params);

  const titles = titlesParam ? decodeAndParseUniqueParams(titlesParam) : [];
  const numberOfMembers = (numberOfMembersParam ?? "ascending") as NumberOfMembers;
  const decoredDateOfAdding = (dateOfAdding ?? "newest") as DateOfAdding;

  await Promise.all([
    queryClient.prefetchQuery(getUsedCategoriesQueryOptions()),
    queryClient.prefetchQuery(getUsedCitiesQueryOptions()),
    // queryClient.prefetchQuery(getGroupTitlesQueryOptions({})),
    queryClient.prefetchQuery(
      getGroupTilesQueryOptions({
        categories: categories,
        cities: cities,
        titles: titles,
        minMembers: _minMembers,
        maxMembers: _maxMembers,
        remote: _remote,
        sponsored: _sponsored,
        verified: _verified,
        numberOfMembers: numberOfMembers,
        dateOfAdding: decoredDateOfAdding,
      })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupsPage
        categories={categories}
        cities={cities}
        titles={titles}
        remote={_remote}
        sponsored={_sponsored}
        verified={_verified}
        minMembers={_minMembers}
        maxMembers={_maxMembers}
        dateOfAdding={decoredDateOfAdding}
        numberOfMembers={numberOfMembers}
      />
    </HydrationBoundary>
  );
}
