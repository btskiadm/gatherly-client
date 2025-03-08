import { env } from "@/app/common/utils/env";
import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { City } from "../../contracts/city.types";
import { citySchema } from "../schemas/city.schemas";

interface Data {
  getCities: City[];
}

export const getCitiesQueryOptions = () =>
  queryOptions<Data>({
    queryKey: ["GetCities"],
    queryFn: () => {
      const query = gql`
        query GetCities {
          getCities {
            ${citySchema}
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query);
    },
  });
