import { GetGroupJoinInvitationRequestsDocument } from "@/app/model/docNodes";
import { GetGroupJoinInvitationRequestsQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getGroupJoinInvitationRequestsQueryKey = (groupId: string, status: string) => [
  "GetGroupJoinInvitationRequests",
  groupId,
  status,
];

export const getGroupJoinInvitationRequestsQueryOptions = (variables: GetGroupJoinInvitationRequestsQueryVariables) =>
  queryOptions({
    queryKey: getGroupJoinInvitationRequestsQueryKey(
      variables.groupId,
      Object.values(variables.status ?? []).join(",")
    ),
    queryFn: () => graphQLQueryFactory(GetGroupJoinInvitationRequestsDocument, variables),
  });
