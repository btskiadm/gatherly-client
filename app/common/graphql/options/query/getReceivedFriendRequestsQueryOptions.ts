import { GetReceivedFriendRequestsDocument } from "@/app/model/docNodes";
import { GetSentFriendRequestsQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getReceivedFriendRequestsQueryKey = (skip: number, take: number) => [
  "GetReceivedFriendRequests",
  skip,
  take,
];

export const getReceivedFriendRequestsQueryOptions = (variables: GetSentFriendRequestsQueryVariables) =>
  queryOptions({
    queryKey: getReceivedFriendRequestsQueryKey(variables.skip, variables.take ?? 6),
    queryFn: () => graphQLQueryFactory(GetReceivedFriendRequestsDocument, variables),
    placeholderData: (p) => p,
  });
