"use client";

import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { GroupUser } from "@/app/model/model";
import { Stack } from "@mui/material";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupMembersList } from "./GroupMembersList";
import { getUserGroupTilesQueryOptions } from "@/app/common/graphql/options/query/getUserGroupTilesQueryOptions";
import { itemsPerPage } from "../config";

interface Props {
  groupId: string;
}

const formatLabel = (userLength: number) => `${userLength > 99 ? "99+" : userLength}`;

export const GroupMembersPage = ({ groupId }: Props) => {
  const { data } = useInfiniteQuery(
    getUserGroupTilesQueryOptions({
      groupId: groupId,
      itemsPerPage: itemsPerPage,
    })
  );

  return (
    <Stack gap={{ xs: 2, sm: 3 }} width="100%">
      <GroupHeader
        primary="Członkowie"
        subPrimary={formatLabel(data?.pages[data?.pages.length - 1 || 0].getUserGroupTiles.count ?? 0)}
        secondary="Zobacz członków grupy"
      />
      <GroupMembersList groupId={groupId} />
    </Stack>
  );
};
