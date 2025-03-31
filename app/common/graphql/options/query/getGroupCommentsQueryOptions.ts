import { GetGroupCommentsDocument } from "@/app/model/docNodes";
import { QueryGetGroupCommentsArgs } from "@/app/model/model";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getGroupCommentsQueryKey = (groupId: string) => ["GroupComments", groupId];

export const getGroupCommentsQueryOptions = (variables: QueryGetGroupCommentsArgs) =>
  queryOptions({
    queryKey: getGroupCommentsQueryKey(variables.groupId),
    queryFn: () => graphQLQueryFactory(GetGroupCommentsDocument, variables),
  });
