import { NotificationsDocument } from "@/app/model/docNodes";
import { NotificationsQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const notificationsQueryKey = (skip: number, take: number) => ["Notifications", skip, take];

export const notificationsQueryOptions = (variables: NotificationsQueryVariables) =>
  queryOptions({
    queryKey: notificationsQueryKey(variables.skip, variables.take),
    queryFn: () => graphQLQueryFactory(NotificationsDocument, variables),
  });
