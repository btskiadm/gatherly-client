import { env } from "@/app/common/utils/env";
import request, { gql } from "graphql-request";

interface Variables {
  groupId: string;
}

interface Response {
  leaveGroup: {
    success: boolean;
  };
}

export const leaveGroupMutationFn = (variables: Variables) => {
  const query = gql`
    mutation LeaveGroup($groupId: String!) {
      leaveGroup(groupId: $groupId) {
        __typename
        success
      }
    }
  `;

  return request<Response>(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, variables);
};
