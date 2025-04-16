import { GetGroupTilesByUserIdDocument } from "@/app/model/docNodes";
import { GetFriendsListQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getGroupTilesByUserIdQueryKey = (skip: number, take: number) => ["GetGroupTilesByUserId", skip, take];

export const getGroupTilesByUserIdQueryOptions = (variables: GetFriendsListQueryVariables) =>
  queryOptions({
    queryKey: getGroupTilesByUserIdQueryKey(variables.skip, variables.take),
    queryFn: () => graphQLQueryFactory(GetGroupTilesByUserIdDocument, variables),
    placeholderData: (p) => p,
  });
