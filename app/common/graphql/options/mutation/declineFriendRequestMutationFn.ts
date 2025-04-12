import { DeclineFriendRequestDocument } from "@/app/model/docNodes";
import { DeclineFriendRequestMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const declineFriendRequestMutationFn = (variables: DeclineFriendRequestMutationVariables) => {
  return graphQLQueryFactory(DeclineFriendRequestDocument, variables);
};
