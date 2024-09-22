import { Box, Chip, Skeleton, Stack } from "@mui/material";
import { GroupTile } from "./_components/GroupTile";
import { data } from "./mock";

const GroupTileSkeleton = () => {
  return (
    <Box
      sx={{
        width: "16rem",
        height: "16rem",
        overflow: "hidden",
        borderRadius: 1, // paper border-radius, keep sync
      }}
    >
      <Skeleton animation="wave" variant="rectangular" height="100%" width="100%" />
    </Box>
  );
};

export default async function GroupsPage() {
  return (
    <Stack justifyContent="center" gap={4} direction="row" flexWrap="wrap">
      <Stack gap={2}>
        <Box width="min-content">
          <Chip label="Koszykówka - Łódź" />
        </Box>
        <Stack gap={2} direction="row" flexWrap="wrap" justifyContent="center">
          {data.map((d) => (
            <GroupTile key={d.id} {...d} />
          ))}
          <GroupTileSkeleton />
        </Stack>
      </Stack>
    </Stack>
  );
}
