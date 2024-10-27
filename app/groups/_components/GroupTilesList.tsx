import { GroupTile as GroupTileData } from "@/app/mock/mock";
import { Grid2 } from "@mui/material";
import { CommonGroupTile } from "./CommonGroupTile";
import { GroupTileLoadMore } from "./GroupTileLoadMore";
import { GroupTileSkeleton } from "./GroupTileSkeleton";
import { GroupTile } from "./GroupTile";

export const GroupTilesList = ({ tiles }: { tiles: GroupTileData[] }) => {
  return (
    <Grid2 container spacing={2}>
      {tiles.map((tile) => (
        <Grid2 key={tile.id} size={{ xs: 12, sm: 6, md: 3 }}>
          <CommonGroupTile>
            <GroupTile {...tile} />
          </CommonGroupTile>
        </Grid2>
      ))}
      <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
        <CommonGroupTile>
          <GroupTileSkeleton />
        </CommonGroupTile>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
        <CommonGroupTile>
          <GroupTileLoadMore />
        </CommonGroupTile>
      </Grid2>
    </Grid2>
  );
};
