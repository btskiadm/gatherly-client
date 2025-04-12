import { AcceptFriendRequestDocument } from "@/app/model/docNodes";
import { MutationAcceptFriendRequestArgs } from "@/app/model/model";
import { graphQLQueryFactory } from "../../graphQLClient";

export const acceptFriendRequestMutationFn = (variables: MutationAcceptFriendRequestArgs) => {
  return graphQLQueryFactory(AcceptFriendRequestDocument, variables);
};
