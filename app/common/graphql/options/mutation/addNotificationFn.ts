import { AddNotificationDocument } from "@/app/model/docNodes";
import { AddNotificationMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const addNotificationMutationFn = (variables: AddNotificationMutationVariables) => {
  return graphQLQueryFactory(AddNotificationDocument, variables);
};
