import { env } from "@/app/common/utils/env";
import { GetUsedCategoriesDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(env.NEXT_PUBLIC_BACKEND_GRAPHQL, {
  credentials: "include",
});

export const getUsedCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["GetUsedCategories"],
    queryFn: () => {
      return client.request(GetUsedCategoriesDocument);
    },
  });
