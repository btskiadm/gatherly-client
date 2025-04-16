import { GetGroupJoinRequestsDocument } from "@/app/model/docNodes";
import { GetGroupJoinRequestsQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getGroupJoinRequestsQueryKey = (groupId: string, status: string) => [
  "getGroupJoinRequests",
  groupId,
  status,
];

export const getGroupJoinRequestsQueryOptions = (variables: GetGroupJoinRequestsQueryVariables) =>
  queryOptions({
    queryKey: getGroupJoinRequestsQueryKey(variables.groupId, Object.values(variables.status ?? []).join(",")),
    queryFn: () => graphQLQueryFactory(GetGroupJoinRequestsDocument, variables),
  });
