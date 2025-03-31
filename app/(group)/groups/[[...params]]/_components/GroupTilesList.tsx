"use client";

import { DateOfAdding, NumberOfMembers } from "@/app/common/components/Sort/GroupAndEventSort";
import { getGroupTilesQueryOptions } from "@/app/common/graphql/options/query";
import { Grid2 } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CommonGroupTile } from "./GroupCommonTile";
import { GroupTile } from "./GroupTile";
import { GroupTileLoadMore } from "./GroupTileLoadMore";
import { GroupTileSkeleton } from "./GroupTileSkeleton";

interface Props {
  cities: string[];
  categories: string[];
  titles: string[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
  numberOfMembers: NumberOfMembers;
  dateOfAdding: DateOfAdding;
}

export const GroupTilesList = ({
  cities,
  categories,
  titles,
  remote,
  sponsored,
  verified,
  minMembers,
  maxMembers,
  numberOfMembers,
  dateOfAdding,
}: Props) => {
  const {
    data: { getGroupTiles = [] },
  } = useSuspenseQuery(
    getGroupTilesQueryOptions({
      categories: categories,
      cities: cities,
      titles: titles,
      minMembers: minMembers,
      maxMembers: maxMembers,
      // remote: remote,
      // sponsored: sponsored,
      // verified: verified,
      numberOfMembers: numberOfMembers,
      dateOfAdding: dateOfAdding,
    })
  );

  return (
    <Grid2 container spacing={2}>
      {getGroupTiles.map((tile) => (
        <Grid2 key={tile.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <CommonGroupTile>
            <GroupTile tile={tile} />
          </CommonGroupTile>
        </Grid2>
      ))}
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <CommonGroupTile>
          <GroupTileSkeleton />
        </CommonGroupTile>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <CommonGroupTile>
          <GroupTileLoadMore />
        </CommonGroupTile>
      </Grid2>
    </Grid2>
  );
};
