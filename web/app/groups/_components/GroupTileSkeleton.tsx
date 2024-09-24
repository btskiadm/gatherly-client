import { Paper, Skeleton } from "@mui/material";
import { CommonGroupTile } from "./CommonGroupTile";

export const GroupTileSkeleton = () => {
  return (
    <CommonGroupTile>
      <Skeleton animation="wave" variant="rectangular" height="100%" width="100%" />
    </CommonGroupTile>
  );
};
