import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { getUserGroupTilesQueryOptions } from "@/app/common/graphql/options/query/getUserGroupTilesQueryOptions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { GroupParams } from "../groupParams";
import { GroupMembersPage } from "./_components/GroupMembersPage";
import { itemsPerPage } from "./config";

export default async function Page({ params: promiseParams }: { params: GroupParams }) {
  const queryClient = new QueryClient();
  const { id: groupId } = await promiseParams;

  await Promise.all([
    queryClient.prefetchQuery(
      getGroupDetailsQueryOptions({
        groupId: groupId,
      })
    ),
    queryClient.prefetchInfiniteQuery(
      getUserGroupTilesQueryOptions({
        groupId: groupId,
        itemsPerPage: itemsPerPage,
      })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupMembersPage groupId={groupId} />
    </HydrationBoundary>
  );
}
