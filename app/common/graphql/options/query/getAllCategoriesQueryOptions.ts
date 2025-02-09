import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { env } from "../../../utils/env";
import { CategoryDto } from "../../dto";

interface Data {
  getAllCategories: CategoryDto[];
}

export const getAllCategoriesQueryOptions = () =>
  queryOptions<Data>({
    queryKey: ["GetAllCategories"],
    queryFn: () => {
      const query = gql`
        query GetAllCategories {
          getAllCategories {
            __typename
            value
            label
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query);
    },
  });
