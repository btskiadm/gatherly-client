import { AcceptSentGroupInvitationDocument } from "@/app/model/docNodes";
import { AcceptSentGroupInvitationMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const acceptSentGroupInvitationMutationFn = (variables: AcceptSentGroupInvitationMutationVariables) => {
  return graphQLQueryFactory(AcceptSentGroupInvitationDocument, variables);
};
