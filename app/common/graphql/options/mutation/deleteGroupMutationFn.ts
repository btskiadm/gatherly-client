import { env } from "@/app/common/utils/env";
import request, { gql } from "graphql-request";

interface Variables {
  groupId: string;
}

interface Response {
  deleteGroup: {
    success: boolean;
  };
}

export const deleteGroupMutationFn = (variables: Variables) => {
  const query = gql`
    mutation DeleteGroup($groupId: String!) {
      deleteGroup(groupId: $groupId) {
        __typename
        success
      }
    }
  `;

  return request<Response>(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, variables);
};
