import { GetUsersByUsernameDocument } from "@/app/model/docNodes";
import { GetUsersByUsernameQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";
import { env } from "../../../utils/env";

export const getUsersByUsernameQueryOptions = (variables: GetUsersByUsernameQueryVariables) =>
  queryOptions({
    enabled: variables.username.length >= 3,
    queryKey: ["GetUsersByUsername", variables.username],
    queryFn: () => request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetUsersByUsernameDocument, variables),
  });
