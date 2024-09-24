import {
  CloudOutlined,
  FmdGoodOutlined,
  InterestsOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { GroupsStackData } from "../mock";
import { GroupTile } from "./GroupTile";
import { GroupTileLoadMore } from "./GroupTileLoadMore";
import { GroupTileSkeleton } from "./GroupTileSkeleton";

export const GroupsStack = ({ tags, tiles }: PropsWithChildren<GroupsStackData>) => {
  return (
    <Stack gap={2} width="100%">
      <Stack width="min-content" direction="row" gap={1}>
        {tags.map((tag) => {
          if (tag.key === "category" && tag.label && tag.value) {
            return <Chip key={tag.value} icon={<InterestsOutlined fontSize="small" />} label={tag.label} />;
          }
          if (tag.key === "city" && tag.label && tag.value) {
            return <Chip key={tag.value} icon={<FmdGoodOutlined fontSize="small" />} label={tag.label} />;
          }
          if (tag.key === "remote" && tag.value) {
            return <Chip icon={<CloudOutlined fontSize="small" />} label="Remote" />;
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
      <Stack gap={2} direction="row" flexWrap="wrap" justifyContent="flex-start">
        {tiles.map((d) => (
          <GroupTile key={d.id} {...d} />
        ))}
        <GroupTileSkeleton />
        <GroupTileLoadMore />
      </Stack>
    </Stack>
  );
};
