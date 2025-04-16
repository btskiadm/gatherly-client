import { GetSentFriendRequestsDocument } from "@/app/model/docNodes";
import { GetSentFriendRequestsQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getSentFriendRequestsRootQueryKey = "GetSentFriendRequests";

export const getSentFriendRequestsQueryKey = (skip: number, take: number) => [
  getSentFriendRequestsRootQueryKey,
  skip,
  take,
];

export const getSentFriendRequestsQueryOptions = (variables: GetSentFriendRequestsQueryVariables) =>
  queryOptions({
    queryKey: getSentFriendRequestsQueryKey(variables.skip, variables.take),
    queryFn: () => graphQLQueryFactory(GetSentFriendRequestsDocument, variables),
    placeholderData: (p) => p,
  });
