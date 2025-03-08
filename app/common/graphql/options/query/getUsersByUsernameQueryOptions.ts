import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { env } from "../../../utils/env";
import { UserDto } from "../../dto";

interface Variables {
  username: string;
}

interface Data {
  getUsersByUsername: UserDto[];
}

export const getUsersByUsernameQueryOptions = (variables: Variables) =>
  queryOptions<Data>({
    enabled: variables.username.length >= 1,
    queryKey: ["GetUsersByUsername", variables.username],
    queryFn: () => {
      const query = gql`
        query GetUsersByUsername($username: String!) {
          getUsersByUsername(username: $username) {
            __typename
            id
            username
            thumbnail {
              id
              thumb
            }
            verifiedAt
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, variables);
    },
  });
