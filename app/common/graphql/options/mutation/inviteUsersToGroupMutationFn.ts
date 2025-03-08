import { env } from "@/app/common/utils/env";
import request, { gql } from "graphql-request";

interface Variables {
  groupId: string;
  userIds: string[];
}

interface Response {
  inviteUsersToGroup: {
    success: boolean;
  };
}

export const inviteUsersToGroupMutationFn = (variables: Variables) => {
  const query = gql`
    mutation InviteUsersToGroup($groupId: String!) {
      inviteUsersToGroup(groupId: $groupId) {
        __typename
        success
      }
    }
  `;

  return request<Response>(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, variables);
};
