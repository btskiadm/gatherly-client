import { env } from "@/app/common/utils/env";
import request, { gql } from "graphql-request";
import { CommentDto } from "../../dto";

interface Variables {
  groupId: string;
  addGroupCommentInput: {
    rate: number;
    content: string;
  };
}

interface Response {
  addGroupComment: {
    success: boolean;
    comment: CommentDto | null;
  };
}

export const addCommentMutationFn = (variables: Variables) => {
  const query = gql`
    mutation AddGroupComment($groupId: String!, $addGroupCommentInput: AddGroupCommentInput!) {
      addGroupComment(groupId: $groupId, addGroupCommentInput: $addGroupCommentInput) {
        __typename
        success
        comment {
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
      }
    }
  `;

  return request<Response>(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, variables);
};
