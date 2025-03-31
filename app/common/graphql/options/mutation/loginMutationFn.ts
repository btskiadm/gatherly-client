import { LoginDocument } from "@/app/model/docNodes";
import { LoginMutationVariables } from "@/app/model/operations";
import { graphQLQueryFactory } from "../../graphQLClient";

export const loginMutationFn = (variables: LoginMutationVariables) => {
  return graphQLQueryFactory(LoginDocument, variables);
};
