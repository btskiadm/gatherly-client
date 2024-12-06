import { GroupTileDto } from "@/app/mock/mock-api.types";
import { Grid2 } from "@mui/material";
import { CommonGroupTile } from "./CommonGroupTile";
import { GroupTile } from "./GroupTile";
import { GroupTileLoadMore } from "./GroupTileLoadMore";
import { GroupTileSkeleton } from "./GroupTileSkeleton";

export const GroupTilesList = ({ tiles }: { tiles: GroupTileDto[] }) => {
  return (
    <Grid2 container spacing={2}>
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
      {tiles.map((tile) => (
        <Grid2 key={tile.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <CommonGroupTile>
            <GroupTile tile={tile} />
          </CommonGroupTile>
        </Grid2>
      ))}
    </Grid2>
  );
};
