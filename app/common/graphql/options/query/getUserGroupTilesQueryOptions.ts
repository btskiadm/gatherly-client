import { GetUserGroupTilesDocument } from "@/app/model/docNodes";
import { Query } from "@/app/model/model";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const getUserGroupTilesQueryKey = (groupId: string, itemsPerPage: number, search?: string) => [
  "GetUserGroupTiles",
  groupId,
  itemsPerPage,
  search,
];

export const getUserGroupTilesQueryOptions = ({
  groupId,
  search,
  itemsPerPage,
}: {
  groupId: string;
  itemsPerPage: number;
  search?: string;
}) =>
  infiniteQueryOptions({
    queryKey: getUserGroupTilesQueryKey(groupId, itemsPerPage, search),
    queryFn: async ({ pageParam = 0 }) => {
      return await graphQLQueryFactory(GetUserGroupTilesDocument, {
        groupId: groupId,
        skip: pageParam,
        take: itemsPerPage,
      });
    },
    getNextPageParam: (lastPage: Pick<Query, "getUserGroupTiles">, allPages: Pick<Query, "getUserGroupTiles">[]) => {
      const totalLoaded = allPages.reduce((acc, page) => acc + page.getUserGroupTiles.userGroupTiles.length, 0);
      return totalLoaded < lastPage.getUserGroupTiles.count ? totalLoaded : undefined;
    },
    initialPageParam: 0,
  });
