import { GetCategoriesDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { env } from "../../../utils/env";

const client = new GraphQLClient(env.NEXT_PUBLIC_BACKEND_GRAPHQL, {
  credentials: "include",
});

export const getCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["GetCategories"],
    queryFn: () => client.request(GetCategoriesDocument),
  });
