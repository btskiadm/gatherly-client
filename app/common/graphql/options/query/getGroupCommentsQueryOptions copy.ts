import { GetGroupCommentsDocument } from "@/app/model/docNodes";
import { QueryGetGroupCommentsArgs } from "@/app/model/model";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getGroupCommentsQueryKey = (groupId: string, skip: number, take: number) => [
  "GroupComments",
  groupId,
  skip,
  take,
];

export const getGroupCommentsQueryOptions = (variables: QueryGetGroupCommentsArgs) => {
  return queryOptions({
    queryKey: getGroupCommentsQueryKey(variables.groupId, variables.skip ?? 0, variables.take ?? 10),
    queryFn: () => graphQLQueryFactory(GetGroupCommentsDocument, variables),
    placeholderData: (previousData) => previousData,
  });
};
