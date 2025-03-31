import { UsersDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../../graphQLClient";

export const usersQueryKey = () => ["Users"];

export const usersQueryOptions = () => {
  return queryOptions({
    queryKey: usersQueryKey(),
    queryFn: () => graphQLQueryFactory(UsersDocument),
  });
};
