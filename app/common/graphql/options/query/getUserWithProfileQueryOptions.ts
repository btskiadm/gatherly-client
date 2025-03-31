import { GetUserWithProfileDocument } from "@/app/model/docNodes";
import { QueryGetUserWithProfileArgs } from "@/app/model/model";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getUserWithProfileQueryKey = (userId: string) => ["UserWithProfileQueryKey", userId];

export const getUserWithProfileQueryOptions = (variables: QueryGetUserWithProfileArgs) =>
  queryOptions({
    queryKey: getUserWithProfileQueryKey(variables.userId),
    queryFn: () => graphQLQueryFactory(GetUserWithProfileDocument, variables),
  });
