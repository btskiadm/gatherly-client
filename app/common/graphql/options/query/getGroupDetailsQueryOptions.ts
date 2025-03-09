import { env } from "@/app/common/utils/env";
import { GetGroupDetailsDocument } from "@/app/model/docNodes";
import { GetGroupDetailsQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";

export const getGroupDetailsQueryOptions = (variables: GetGroupDetailsQueryVariables) =>
  queryOptions({
    queryKey: ["GroupDetailsQuery", variables.groupId],
    queryFn: () => request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetGroupDetailsDocument, variables),
  });
