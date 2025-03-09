import { GetCategoriesDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";
import { env } from "../../../utils/env";

export const getCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["GetCategories"],
    queryFn: () => request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetCategoriesDocument),
  });
