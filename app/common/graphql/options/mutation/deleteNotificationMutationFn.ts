import { DeleteNotificationDocument } from "@/app/model/docNodes";
import { DeleteNotificationMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const deleteNotificationMutationFn = (variables: DeleteNotificationMutationVariables) => {
  return graphQLQueryFactory(DeleteNotificationDocument, variables);
};
