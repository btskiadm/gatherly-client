import { AcceptJoinRequestGroupDocument } from "@/app/model/docNodes";
import { AcceptJoinRequestGroupMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const acceptJoinRequestGroupMutationFn = (variables: AcceptJoinRequestGroupMutationVariables) => {
  return graphQLQueryFactory(AcceptJoinRequestGroupDocument, variables);
};
