import { env } from "@/app/common/utils/env";
import { GetGroupTilesDocument } from "@/app/model/docNodes";
import { GetGroupTilesQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(env.NEXT_PUBLIC_BACKEND_GRAPHQL, {
  credentials: "include",
});

export const getGroupTilesQueryOptions = (variables: GetGroupTilesQueryVariables) =>
  queryOptions({
    queryKey: ["GetGroupTiles"],
    queryFn: () => client.request(GetGroupTilesDocument, variables),
  });
