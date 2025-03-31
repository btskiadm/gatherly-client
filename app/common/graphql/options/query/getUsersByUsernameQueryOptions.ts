import { GetUsersByUsernameDocument } from "@/app/model/docNodes";
import { GetUsersByUsernameQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { env } from "../../../utils/env";

const client = new GraphQLClient(env.NEXT_PUBLIC_BACKEND_GRAPHQL, {
  credentials: "include",
});

export const getUsersByUsernameQueryOptions = (variables: GetUsersByUsernameQueryVariables) =>
  queryOptions({
    enabled: variables.username.length >= 3,
    queryKey: ["GetUsersByUsername", variables.username],
    queryFn: () => client.request(GetUsersByUsernameDocument, variables),
  });
