import { env } from "@/app/common/utils/env";
import { GetGroupDetailsDocument } from "@/app/model/docNodes";
import { GetGroupDetailsQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(env.NEXT_PUBLIC_BACKEND_GRAPHQL, {
  credentials: "include",
});

export const getGroupDetailsQueryOptions = (variables: GetGroupDetailsQueryVariables) =>
  queryOptions({
    queryKey: ["GroupDetailsQuery", variables.groupId],
    queryFn: () => client.request(GetGroupDetailsDocument, variables),
  });
