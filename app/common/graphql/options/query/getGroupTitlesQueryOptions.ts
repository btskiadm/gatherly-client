import { env } from "@/app/common/utils/env";
import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { TitleDto } from "../../dto";

interface Data {
  getGroupTitles: TitleDto[];
}

interface Variables {
  title: string;
}

export const getGroupTitlesQueryOptions = (variables: Variables) =>
  queryOptions<Data>({
    queryKey: ["GetGroupTitles"],
    queryFn: () => {
      const query = gql`
        query GetGroupTitles($title: String!) {
          getGroupTitles(title: $title) {
            __typename
            value
            label
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query);
    },
  });
