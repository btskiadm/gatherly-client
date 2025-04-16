import { NotificationsDocument } from "@/app/model/docNodes";
import { Query } from "@/app/model/model";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const notificationsQueryKey = (take: number) => ["Notifications", take];

export const notificationsQueryOptions = ({ itemsPerPage }: { itemsPerPage: number }) =>
  infiniteQueryOptions({
    queryKey: notificationsQueryKey(itemsPerPage),
    queryFn: async ({ pageParam = 0 }) => {
      return await graphQLQueryFactory(NotificationsDocument, {
        skip: pageParam,
        take: itemsPerPage,
      });
    },
    getNextPageParam: (lastPage: Pick<Query, "notifications">, allPages: Pick<Query, "notifications">[]) => {
      const totalLoaded = allPages.reduce((acc, page) => acc + page.notifications.notifications.length, 0);
      return totalLoaded < lastPage.notifications.count ? totalLoaded : undefined;
    },
    initialPageParam: 0,
  });
