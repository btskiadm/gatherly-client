import { CancelFriendshipDocument } from "@/app/model/docNodes";
import { MutationCancelFriendshipArgs } from "@/app/model/model";
import { graphQLQueryFactory } from "../../graphQLClient";

export const cancelFriendshipMutationFn = (variables: MutationCancelFriendshipArgs) => {
  return graphQLQueryFactory(CancelFriendshipDocument, variables);
};
