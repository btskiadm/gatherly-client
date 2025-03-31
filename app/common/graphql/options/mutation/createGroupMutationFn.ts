import { CreateGroupDocument } from "@/app/model/docNodes";
import { CreateGroupMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const createGroupMutationFn = (variables: CreateGroupMutationVariables) => {
  return graphQLQueryFactory(CreateGroupDocument, variables);
};
