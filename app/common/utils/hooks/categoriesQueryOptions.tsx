import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { env } from "../env";

export const categoriesQueryOptions = ({ usedOnly }: { usedOnly: boolean }) =>
  queryOptions({
    queryKey: ["categories", usedOnly],
    queryFn: () => {
      const query = gql`
        {
          categories {
            value
            label
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, { usedOnly });
    },
  });
