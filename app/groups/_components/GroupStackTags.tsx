import {
  CloudOutlined,
  FmdGoodOutlined,
  InterestsOutlined,
  StarBorderRounded,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import { GroupTagData } from "../mock";

export const GroupStackTags = ({ tags }: { tags: GroupTagData[] }) => {
  return (
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
  );
};
