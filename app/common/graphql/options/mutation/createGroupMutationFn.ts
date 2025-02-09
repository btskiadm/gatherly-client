import { env } from "@/app/common/utils/env";
import request, { gql } from "graphql-request";
import { CommentDto, GroupDto } from "../../dto";

interface Variables {
  createGroupInput: {
    title: string;
    description: string;
    categories: string[];
    cities: string[];
    remote: boolean;
  };
}

interface Response {
  createGroup: {
    success: boolean;
    group: GroupDto;
  };
}

export const createGroupMutationFn = (variables: Variables) => {
  const query = gql`
    mutation CreateGroupInput($createGroupInput: CreateGroupInput!) {
      createGroup(createGroupInput: $createGroupInput) {
        __typename
        success
        group {
          __typename
          id
          title
          description
          createdAt
          sponsored
          verified
          remote
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
          events {
            __typename
            id
            title
            description
            canceled
            createdAt
            sponsored
            verified
            remote
            users {
              __typename
              id
              isHost
              isModerator
              user {
                __typename
                id
                username
                thumbnail {
                  __typename
                  id
                  thumb
                }
                verifiedAt
              }
            }
            date {
              __typename
              id
              startAt
              endAt
            }
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
          }
          users {
            __typename
            isHost
            isModerator
            user {
              __typename
              id
              username
              thumbnail {
                __typename
                id
                thumb
              }
              verifiedAt
            }
          }
          comments {
            __typename
            id
            rate
            content
            createdAt
            user {
              __typename
              id
              username
              thumbnail {
                __typename
                id
                thumb
              }
              verifiedAt
            }
          }
          thumbnail {
            __typename
            id
            thumb
          }
        }
      }
    }
  `;

  return request<Response>(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, variables);
};
