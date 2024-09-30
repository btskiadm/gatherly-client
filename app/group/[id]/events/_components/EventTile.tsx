import { Group, Place } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Chip, Grid2, Paper, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface Props {}

export const EventTile = (props: Props) => {
  return (
    <Paper>
      <Box p={2}>
        <Grid2 container spacing={3}>
          <Grid2 size={2}>
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                WED
              </Typography>
              <Typography variant="h5" color="text.secondary" fontWeight="600">
                31
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 size={4}>
            <Stack gap={1}>
              <Stack direction="row" gap={0.5} alignItems="center">
                <AccessTimeIcon
                  fontSize="small"
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  09:00 - 10:30
                </Typography>
              </Stack>
              <Stack direction="row" gap={0.5} alignItems="center">
                <Place
                  fontSize="small"
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Warszawa
                </Typography>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={6}>
            <Stack alignContent="flex-start" alignItems="flex-start" gap={0.5}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  color: "text.secondary",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu dui, laoreet ultricies egestas
                eget,
              </Typography>
              <Chip size="small" label={"99+"} icon={<Group />} />
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};
