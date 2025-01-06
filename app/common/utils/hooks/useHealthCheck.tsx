import { FetchQueryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { env } from "../env";

export const healthCheckQueryOptions: FetchQueryOptions = {
  queryKey: ["healthCheck"],
  queryFn: async () => {
    const query = gql`
      {
        healthCheck {
          status
        }
      }
    `;
    return await request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query);
  },
};
