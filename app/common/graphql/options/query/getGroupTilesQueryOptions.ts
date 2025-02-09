import { env } from "@/app/common/utils/env";
import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { GroupTileDto } from "../../dto";

interface Data {
  getGroupTiles: GroupTileDto[];
}

interface Variables {
  cities: string[];
  categories: string[];
  titles: string[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
  numberOfMembers: string;
  dateOfAdding: string;
}

export const getGroupTilesQueryOptions = (variables: Variables) =>
  queryOptions<Data>({
    queryKey: ["GetGroupTiles"],
    queryFn: () => {
      const query = gql`
        query GetGroupTiles(
          $categories: [String!]!
          $cities: [String!]!
          $titles: [String!]!
          $minMembers: Int!
          $maxMembers: Int!
          $remote: Boolean!
          $sponsored: Boolean!
          $verified: Boolean!
          $numberOfMembers: String!
          $dateOfAdding: String!
        ) {
          getGroupTiles(
            categories: $categories
            cities: $cities
            titles: $titles
            minMembers: $minMembers
            maxMembers: $maxMembers
            remote: $remote
            sponsored: $sponsored
            verified: $verified
            numberOfMembers: $numberOfMembers
            dateOfAdding: $dateOfAdding
          ) {
            __typename
            id
            title
            description
            createdAt
            cities {
              __typename
              label
              value
            }
            categories {
              __typename
              label
              value
            }
            thumbnail {
              __typename
              id
              thumb
            }
            eventsLength
            usersLength
            sponsored
            verified
            remote
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, variables);
    },
  });
