import { env } from "@/app/common/utils/env";
import { CreateEventDocument } from "@/app/model/docNodes";
import { CreateEventMutationVariables } from "@/app/model/operations";

import request from "graphql-request";

export const createEventMutationFn = (variables: CreateEventMutationVariables) => {
  return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, CreateEventDocument, variables);
};
