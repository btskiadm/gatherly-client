import { CheckUserGroupPermissionsDocument } from "@/app/model/docNodes";
import { QueryCheckUserGroupPermissionsArgs } from "@/app/model/model";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const checkUserGroupPermissionsQueryKey = (groupId: string) => ["Me", groupId];

export const checkUserGroupPermissions = (variables: QueryCheckUserGroupPermissionsArgs) =>
  queryOptions({
    queryKey: checkUserGroupPermissionsQueryKey(variables.groupId),
    queryFn: () => graphQLQueryFactory(CheckUserGroupPermissionsDocument, variables),
  });
