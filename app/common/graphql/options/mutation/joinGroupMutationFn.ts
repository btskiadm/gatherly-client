import { JoinGroupDocument } from "@/app/model/docNodes";
import { JoinGroupMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const joinGroupMutationFn = (variables: JoinGroupMutationVariables) => {
  return graphQLQueryFactory(JoinGroupDocument, variables);
};
