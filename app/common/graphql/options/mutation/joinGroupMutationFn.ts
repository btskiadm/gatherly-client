import { env } from "@/app/common/utils/env";
import { JoinGroupDocument } from "@/app/model/docNodes";
import { JoinGroupMutationVariables } from "@/app/model/operations";
import request from "graphql-request";

export const joinGroupMutationFn = (variables: JoinGroupMutationVariables) => {
  return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, JoinGroupDocument, variables);
};
