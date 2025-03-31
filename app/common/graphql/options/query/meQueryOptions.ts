import { getCookie } from "@/app/common/utils/cookie";
import { MeDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const meQueryKey = () => ["Me"];

export const meQueryOptions = () => {
  //  make request when document.cookie = loggedIn
  const loggedIn = typeof window !== "undefined" && typeof getCookie("loggedIn") !== "undefined";

  return queryOptions({
    // todo: it does work but idk why..
    enabled: loggedIn,
    queryKey: meQueryKey(),
    queryFn: () => graphQLQueryFactory(MeDocument),
  });
};
