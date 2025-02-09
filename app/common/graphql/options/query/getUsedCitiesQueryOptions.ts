import { env } from "@/app/common/utils/env";
import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { CityDto } from "../../dto";

interface GetUsedCitiesData {
  getUsedCities: CityDto[];
}

export const getUsedCitiesQueryOptions = () =>
  queryOptions<GetUsedCitiesData>({
    queryKey: ["GetUsedCities"],
    queryFn: () => {
      const query = gql`
        query GetUsedCities {
          getUsedCities {
            __typename
            value
            label
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query);
    },
  });
