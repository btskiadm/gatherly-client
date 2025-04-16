import { MarkAsReadDocument } from "@/app/model/docNodes";
import { MarkAsReadMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const markAsReadMutationFn = (variables: MarkAsReadMutationVariables) => {
  return graphQLQueryFactory(MarkAsReadDocument, variables);
};
