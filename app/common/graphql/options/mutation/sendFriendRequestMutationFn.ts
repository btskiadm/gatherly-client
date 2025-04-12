import { SendFriendRequestDocument } from "@/app/model/docNodes";
import { SendFriendRequestMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const sendFriendRequestMutationFn = (variables: SendFriendRequestMutationVariables) => {
  return graphQLQueryFactory(SendFriendRequestDocument, variables);
};
