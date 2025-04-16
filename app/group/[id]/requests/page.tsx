import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { QueryClient } from "@tanstack/react-query";
import { GroupParams } from "../groupParams";
import { RequestsPage } from "./_components/RequestsPage";

export default async function Page({ params: promiseParams }: { params: GroupParams }) {
  const queryClient = new QueryClient();
  const { id } = await promiseParams;

  await queryClient.prefetchQuery(
    getGroupDetailsQueryOptions({
      groupId: id,
    })
  );

  return <RequestsPage groupId={id} />;
}
