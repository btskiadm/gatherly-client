"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Stack, Button, Grid2 } from "@mui/material";
import { GetUserGroupTilesDocument } from "@/app/model/docNodes";
import { graphQLQueryFactory } from "@/app/common/graphql/graphQLClient";
import { Query } from "@/app/model/model";
import { getUserGroupTilesQueryOptions } from "@/app/common/graphql/options/query/getUserGroupTilesQueryOptions";
import { itemsPerPage } from "../config";
import { GroupSettingsMembersTab } from "../../settings/_components/GroupSettingsMembersTab";
import { GroupMemberTile } from "./GroupMemberTile";

const ITEMS_PER_PAGE = 2;

interface Props {
  groupId: string;
}

export const GroupMembersList = ({ groupId }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    getUserGroupTilesQueryOptions({
      groupId: groupId,
      itemsPerPage: itemsPerPage,
    })
  );

  if (status === "error") {
    return <div>Wystąpił błąd podczas ładowania danych.</div>;
  }

  return (
    <Stack direction="column" gap={3}>
      <Grid2 container spacing={3}>
        {data?.pages.map((page, pageIndex) =>
          page.getUserGroupTiles.userGroupTiles.map((userGroupTile) => (
            <Grid2
              key={userGroupTile.userTile.id}
              size={{
                xs: 12,
                sm: 6,
                lg: 4,
                xl: 3,
              }}
            >
              <GroupMemberTile userGroupTile={userGroupTile} />
            </Grid2>
          ))
        )}
      </Grid2>

      {/* Przycisk do ładowania kolejnych elementów */}
      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? "Ładowanie kolejnych..." : hasNextPage ? "Załaduj więcej" : "Brak kolejnych elementów"}
      </Button>
    </Stack>
  );
};
