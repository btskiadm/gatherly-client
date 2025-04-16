import { CancelSentGroupInvitationDocument } from "@/app/model/docNodes";
import { MutationCancelSentGroupInvitationArgs } from "@/app/model/model";
import { graphQLQueryFactory } from "../../graphQLClient";

export const cancelSentGroupInvitationMutationFn = (variables: MutationCancelSentGroupInvitationArgs) => {
  return graphQLQueryFactory(CancelSentGroupInvitationDocument, variables);
};
