import { env } from "@/app/common/utils/env";
import { GetGroupTilesDocument } from "@/app/model/docNodes";
import { GetGroupTilesQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";

export const getGroupTilesQueryOptions = (variables: GetGroupTilesQueryVariables) =>
  queryOptions({
    queryKey: ["GetGroupTiles"],
    queryFn: () => request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetGroupTilesDocument, variables),
  });
