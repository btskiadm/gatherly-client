import { env } from "@/app/common/utils/env";
import { GetCitiesDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";

export const getCitiesQueryOptions = () =>
  queryOptions({
    queryKey: ["GetCities"],
    queryFn: () => {
      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetCitiesDocument);
    },
  });
