import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { ProfileParams, getUsernameParam } from "./ProfileParams";
import { getShortGroupsByUsername, getUserApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { ShortCommonGroupTile } from "@/app/common/components/Group/Tile/ShortCommonGroupTile";
import { ShortGroupTile } from "@/app/common/components/Group/Tile/ShortGroupTile";

export default function Page(params: ProfileParams) {
  const username = getUsernameParam(params);
  const user = getUserApi(username);
  const shortGroups = getShortGroupsByUsername(username);

  if (!user) {
    return notFound();
  }

  return (
    <Stack gap={3}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight={600}>
          About
        </Typography>
        <Paper>
          <Box p={{ xs: 2, sm: 3 }}>
            <Typography variant="body1">{user.userDetails.description}</Typography>
          </Box>
        </Paper>
      </Stack>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight={600}>
          Group member
        </Typography>
        <Grid2 container spacing={2}>
          {shortGroups.map((shortGroup) => {
            return (
              <Grid2 key={shortGroup.id} size={{ xs: 6, md: 4 }}>
                <ShortCommonGroupTile>
                  <ShortGroupTile shortGroup={shortGroup} />
                </ShortCommonGroupTile>
              </Grid2>
            );
          })}
        </Grid2>
      </Stack>
    </Stack>
  );
}
