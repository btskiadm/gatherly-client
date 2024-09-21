import { Box, Chip, Stack } from "@mui/material";
import { GroupTile } from "./_components/GroupTile";

export default async function GroupsPage() {
  return (
    <Stack justifyContent="center" gap={4} direction="row" flexWrap="wrap">
      <Stack gap={2}>
        <Box width="min-content">
          <Chip label="Koszykówka - Łódź" />
        </Box>
        <Stack gap={2} direction="row" flexWrap="wrap" justifyContent="center">
          <GroupTile />
          <GroupTile />
          <GroupTile />
          <GroupTile />
          <GroupTile />
          <GroupTile />
          <GroupTile />
        </Stack>
      </Stack>
    </Stack>
  );
}
