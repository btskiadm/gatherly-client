import { CreateEventDocument } from "@/app/model/docNodes";
import { CreateEventMutationVariables } from "@/app/model/operations";

import { graphQLQueryFactory } from "../../graphQLClient";

export const createEventMutationFn = (variables: CreateEventMutationVariables) => {
  return graphQLQueryFactory(CreateEventDocument, variables);
};
