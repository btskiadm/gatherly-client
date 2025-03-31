import { AddGroupCommentDocument } from "@/app/model/docNodes";
import { AddGroupCommentMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const addCommentMutationFn = (variables: AddGroupCommentMutationVariables) => {
  return graphQLQueryFactory(AddGroupCommentDocument, variables);
};
