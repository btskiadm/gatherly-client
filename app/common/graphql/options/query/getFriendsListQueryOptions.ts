import { GetFriendsListDocument } from "@/app/model/docNodes";
import { GetFriendsListQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getFriendListQueryKey = (skip: number, take: number) => ["GetFriendList", skip, take];

export const getFriendsListQueryOptions = (variables: GetFriendsListQueryVariables) =>
  queryOptions({
    queryKey: getFriendListQueryKey(variables.skip, variables.take ?? 6),
    queryFn: () => graphQLQueryFactory(GetFriendsListDocument, variables),
    placeholderData: (p) => p,
  });
