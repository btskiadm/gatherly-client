import { CancelFriendRequestDocument } from "@/app/model/docNodes";
import { MutationCancelFriendRequestArgs } from "@/app/model/model";
import { graphQLQueryFactory } from "../../graphQLClient";

export const cancelFriendRequestMutationFn = (variables: MutationCancelFriendRequestArgs) => {
  return graphQLQueryFactory(CancelFriendRequestDocument, variables);
};
