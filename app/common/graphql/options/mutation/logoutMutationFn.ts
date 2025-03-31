import { LogoutDocument } from "@/app/model/docNodes";
import { graphQLQueryFactory } from "../../graphQLClient";

export const logoutMutationFn = () => {
  return graphQLQueryFactory(LogoutDocument);
};
