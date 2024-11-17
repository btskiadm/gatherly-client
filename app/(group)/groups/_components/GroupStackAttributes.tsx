import { StackedGroupAttributesDto } from "@/app/mock/mock-api.types";
import { CloudOutlined, FmdGoodOutlined, InterestsOutlined, VerifiedOutlined } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";

export const GroupStackAttributes = ({ attributes }: { attributes: StackedGroupAttributesDto }) => {
  const { city, category, remote, sponsored, verified } = attributes;
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
      {city.value && <Chip icon={<FmdGoodOutlined fontSize="small" />} label={city.label} />}
      {category.value && <Chip icon={<InterestsOutlined fontSize="small" />} label={category.label} />}
      {remote && <Chip icon={<CloudOutlined fontSize="small" />} label="Remote" />}
      {verified && <Chip icon={<VerifiedOutlined fontSize="small" />} label="Verified" />}
      {sponsored && <Chip icon={<VerifiedOutlined fontSize="small" />} label="Sponsored" />}
    </Stack>
  );
};
