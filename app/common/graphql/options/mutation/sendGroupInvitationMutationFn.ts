import { SendFriendRequestDocument } from "@/app/model/docNodes";
import { MutationSendGroupInvitationArgs } from "@/app/model/model";
import { graphQLQueryFactory } from "../../graphQLClient";

export const sendGroupInvitationMutationFn = (variables: MutationSendGroupInvitationArgs) => {
  return graphQLQueryFactory(SendFriendRequestDocument, variables);
};
