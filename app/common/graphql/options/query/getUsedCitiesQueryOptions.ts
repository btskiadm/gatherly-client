import { env } from "@/app/common/utils/env";
import { GetUsedCitiesDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";

export const getUsedCitiesQueryOptions = () =>
  queryOptions({
    queryKey: ["GetUsedCities"],
    queryFn: () => {
      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetUsedCitiesDocument);
    },
  });
