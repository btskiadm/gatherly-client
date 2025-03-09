import { env } from "@/app/common/utils/env";
import { LeaveGroupDocument } from "@/app/model/docNodes";
import { LeaveGroupMutationVariables } from "@/app/model/operations";
import request from "graphql-request";

export const leaveGroupMutationFn = (variables: LeaveGroupMutationVariables) => {
  return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, LeaveGroupDocument, variables);
};
