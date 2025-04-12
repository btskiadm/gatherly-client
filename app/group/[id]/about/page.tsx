import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { GroupParams } from "../groupParams";
import { GroupAboutPage } from "./_components/GroupAboutPage";
import { getGroupCommentsQueryOptions } from "@/app/common/graphql/options/query/getGroupCommentsQueryOptions";
import { commentsItemsPerPage } from "./config";

export default async function Page({ params: promiseParams }: { params: GroupParams }) {
  const queryClient = new QueryClient();
  const { id: groupId } = await promiseParams;

  await Promise.all([
    queryClient.prefetchQuery(
      getGroupDetailsQueryOptions({
        groupId,
      })
    ),
    // init comments
    queryClient.prefetchQuery(getGroupCommentsQueryOptions({ groupId, skip: 0, take: commentsItemsPerPage })),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupAboutPage groupId={groupId} />
    </HydrationBoundary>
  );
}
