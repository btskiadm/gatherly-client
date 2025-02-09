import { env } from "@/app/common/utils/env";
import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { CityDto } from "../../dto";

interface Data {
  getAllCities: CityDto[];
}

export const getAllCitiesQueryOptions = () =>
  queryOptions<Data>({
    queryKey: ["GetAllCities"],
    queryFn: () => {
      const query = gql`
        query GetAllCities {
          getAllCities {
            __typename
            value
            label
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query);
    },
  });
