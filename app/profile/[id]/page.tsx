import { ShortCommonGroupTile } from "@/app/common/components/Group/Tile/ShortCommonGroupTile";
import { ShortGroupTile } from "@/app/common/components/Group/Tile/ShortGroupTile";
import { stack } from "@/app/groups/mock";
import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";

export default function Page() {
  return (
    <Stack gap={3}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight={600}>
          About
        </Typography>
        <Paper>
          <Box p={{ xs: 2, sm: 3 }}>
            <Typography variant="body1">
              Laborum irure non occaecat anim occaecat minim in consequat. Excepteur ut labore est mollit aliquip
              incididunt mollit in magna officia in exercitation excepteur tempor. Aliqua do sint qui excepteur in
              cupidatat qui et fugiat minim ad amet. Ad anim laborum et id do occaecat pariatur eiusmod fugiat irure
              aute excepteur elit. Consequat labore commodo tempor consequat dolor elit consequat qui dolore ex sit
              mollit. Sunt nostrud consectetur pariatur dolor laborum aliquip.
            </Typography>
          </Box>
        </Paper>
      </Stack>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight={600}>
          Group member
        </Typography>
        {stack.map(({ tags, tiles }, idx) => {
          return (
            <Grid2 key={idx} container spacing={2}>
              {tiles.map((tile) => (
                <Grid2 key={tile.id} size={{ xs: 6, md: 4 }}>
                  <ShortCommonGroupTile>
                    <ShortGroupTile {...tile} />
                  </ShortCommonGroupTile>
                </Grid2>
              ))}
            </Grid2>
          );
        })}
      </Stack>
    </Stack>
  );
}
