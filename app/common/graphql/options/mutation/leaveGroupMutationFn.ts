import { LeaveGroupDocument } from "@/app/model/docNodes";
import { LeaveGroupMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const leaveGroupMutationFn = (variables: LeaveGroupMutationVariables) => {
  return graphQLQueryFactory(LeaveGroupDocument, variables);
};
