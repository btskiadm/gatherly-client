import {
  CloudOutlined,
  FmdGoodOutlined,
  InterestsOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Chip, Grid2, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { GroupsStackData } from "../mock";
import { GroupTile } from "./GroupTile";
import { GroupTileLoadMore } from "./GroupTileLoadMore";
import { GroupTileSkeleton } from "./GroupTileSkeleton";
import { CommonGroupTile } from "./CommonGroupTile";

export const GroupsStack = ({ tags, tiles }: PropsWithChildren<GroupsStackData>) => {
  return (
    <Stack gap={2} width="100%">
      <Stack
        width="min-content"
        direction="row"
        gap={1}
        flexShrink={0}
        sx={{
          overflowY: "hidden",
          overflowX: "auto",
          width: "100%",
          padding: 0,
          "::-webkit-scrollbar": {
            background: "transparent",
            width: 0,
            height: 0,
          },
        }}
      >
        {tags.map((tag) => {
          if (tag.key === "category" && tag.label && tag.value) {
            return <Chip key={tag.value} icon={<InterestsOutlined fontSize="small" />} label={tag.label} />;
          }
          if (tag.key === "city" && tag.label && tag.value) {
            return <Chip key={tag.value} icon={<FmdGoodOutlined fontSize="small" />} label={tag.label} />;
          }
          if (tag.key === "remote" && tag.value) {
            return <Chip key="remote" icon={<CloudOutlined fontSize="small" />} label="Remote" />;
          }
          if (tag.key === "verified" && tag.value) {
            return <Chip key="verified" icon={<VerifiedOutlined fontSize="small" />} label="Verified" />;
          }
          if (tag.key === "sponsored" && tag.value) {
            return <Chip key="sponsored" icon={<StarBorderRounded fontSize="small" />} label="Sponsored" />;
          }
          if (tag.key === "verified" && tag.value) {
            return <Chip key="verified" icon={<VerifiedOutlined fontSize="small" />} label="Verified" />;
          }

          return null;
        })}
      </Stack>

      <Grid2 container spacing={2}>
        {tiles.map((d) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={d.id}>
            <CommonGroupTile>
              <GroupTile {...d} />
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
    </Stack>
  );
};
