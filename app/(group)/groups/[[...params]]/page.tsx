import { healthCheckQueryOptions } from "@/app/common/utils/hooks/use-health-check";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { resolveParams, resolveQueries } from "./utils/groups.routing";
import { GroupsPage } from "./_components/groups-page";

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
  const [{ params }, { dateOfAdding, maxMembers, minMembers, numberOfMembers, remote, sponsored, titles, verified }] =
    await Promise.all([promiseParams, promiseSearchParams, queryClient.prefetchQuery(healthCheckQueryOptions)]);

  const _sponsored = !!sponsored;
  const _remote = !!remote;
  const _verified = !!verified;
  const _minMembers = minMembers ? ~~minMembers : 1;
  const _maxMembers = maxMembers ? ~~maxMembers : 50;

  const { categories, locations } = resolveParams(params);

  const {
    titles: _titles,
    numberOfMembers: _numberOfMembers,
    dateOfAdding: _dateOfAdding,
  } = resolveQueries({ titles, numberOfMembers, dateOfAdding });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupsPage
        remote={_remote}
        sponsored={_sponsored}
        verified={_verified}
        minMembers={_minMembers}
        maxMembers={_maxMembers}
        categories={categories}
        locations={locations}
        titles={_titles}
        dateOfAdding={_dateOfAdding}
        numberOfMembers={_numberOfMembers}
      />
    </HydrationBoundary>
  );
}
