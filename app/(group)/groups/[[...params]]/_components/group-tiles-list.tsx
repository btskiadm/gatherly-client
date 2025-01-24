import { GroupTileDto } from "@/app/mock/mock-api.types";
import { Grid2 } from "@mui/material";
import { CommonGroupTile } from "./common-group-tile";
import { GroupTile } from "./group-tile";
import { GroupTileLoadMore } from "./group-tile-load-more";
import { GroupTileSkeleton } from "./group-tile-skeleton";

export const GroupTilesList = ({ tiles }: { tiles: GroupTileDto[] }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <CommonGroupTile>
          <GroupTileSkeleton />
        </CommonGroupTile>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <CommonGroupTile>
          <GroupTileLoadMore />
        </CommonGroupTile>
      </Grid2>
      {tiles.map((tile) => (
        <Grid2 key={tile.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <CommonGroupTile>
            <GroupTile tile={tile} />
          </CommonGroupTile>
        </Grid2>
      ))}
    </Grid2>
  );
};
