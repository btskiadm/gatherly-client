import { CancelJoinRequestGroupDocument } from "@/app/model/docNodes";
import { MutationCancelJoinRequestGroupArgs } from "@/app/model/model";
import { graphQLQueryFactory } from "../../graphQLClient";

export const cancelJoinRequestGroupMutationFn = (variables: MutationCancelJoinRequestGroupArgs) => {
  return graphQLQueryFactory(CancelJoinRequestGroupDocument, variables);
};
