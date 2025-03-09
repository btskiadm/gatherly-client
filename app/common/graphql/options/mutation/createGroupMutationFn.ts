import { env } from "@/app/common/utils/env";
import { CreateGroupDocument } from "@/app/model/docNodes";
import { CreateGroupMutationVariables } from "@/app/model/operations";
import request from "graphql-request";

export const createGroupMutationFn = (variables: CreateGroupMutationVariables) => {
  return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, CreateGroupDocument, variables);
};
