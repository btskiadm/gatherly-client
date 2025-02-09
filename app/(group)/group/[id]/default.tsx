import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { QueryClient } from "@tanstack/react-query";
import { GroupAboutPage } from "./about/_components/GroupAboutPage";
import { GroupParams } from "./groupParams";

export default async function Default({ params: promiseParams }: { params: GroupParams }) {
  const queryClient = new QueryClient();
  const { id } = await promiseParams;

  await queryClient.prefetchQuery(
    getGroupDetailsQueryOptions({
      groupId: id,
    })
  );

  return <GroupAboutPage groupId={id} />;
}
