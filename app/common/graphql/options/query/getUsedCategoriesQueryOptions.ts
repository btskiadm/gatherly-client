import { env } from "@/app/common/utils/env";
import { GetUsedCategoriesDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";

export const getUsedCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["GetUsedCategories"],
    queryFn: () => {
      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetUsedCategoriesDocument);
    },
  });
