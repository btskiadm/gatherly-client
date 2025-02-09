import { env } from "@/app/common/utils/env";
import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { CategoryDto } from "../../dto";

interface Data {
  getUsedCategories: CategoryDto[];
}

export const getUsedCategoriesQueryOptions = () =>
  queryOptions<Data>({
    queryKey: ["GetUsedCategories"],
    queryFn: () => {
      const query = gql`
        query GetUsedCategories {
          getUsedCategories {
            __typename
            value
            label
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query);
    },
  });
