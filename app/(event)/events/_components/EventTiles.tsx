import { EventTileDto } from "@/app/mock/mock-api.types";
import { Grid2 } from "@mui/material";
import { CommonEventTile } from "./CommonEventTile";
import { EventTile } from "./EventTile";

interface Props {
  tiles: EventTileDto[];
}

export const EventTiles = ({ tiles }: Props) => {
  return (
    <Grid2 container spacing={2}>
      {tiles.map((tile) => (
        <Grid2 key={tile.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <CommonEventTile>
            <EventTile tile={tile} />
          </CommonEventTile>
        </Grid2>
      ))}
    </Grid2>
  );
};
