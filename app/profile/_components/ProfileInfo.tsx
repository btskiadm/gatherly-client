import GroupImage4x3 from "@/app/public/assets/group_4x3.webp";
import { PlaceOutlined, VerifiedOutlined } from "@mui/icons-material";
import { Grid2, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";

export const ProfileInfo = () => {
  return (
    <Paper>
      <Stack>
        <Image
          src={GroupImage4x3}
          alt="city map"
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
            objectFit: "cover",
          }}
        />
        <Stack gap={2} px={{ xs: 2, sm: 3 }} py={{ xs: 2, sm: 2 }}>
          <Stack gap={0.5}>
            <Stack gap={0.5} direction="row" alignItems="center">
              <Tooltip title="Verified">
                <VerifiedOutlined color="warning" fontSize="small" />
              </Tooltip>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                Jan Kowalski
              </Typography>
            </Stack>
            <Stack gap={0.5} direction="row" alignItems="center">
              <PlaceOutlined color="action" fontSize="small" />
              <Typography variant="body2">Warszawa</Typography>
            </Stack>
          </Stack>

          <Grid2 container spacing={1}>
            <Grid2 size={4}>
              <Stack py={1} bgcolor="background.light" alignItems="center" justifyContent="center">
                <Typography variant="caption" color="text.secondary">
                  Ukończone
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  120
                </Typography>
              </Stack>
            </Grid2>
            <Grid2 size={4}>
              <Stack py={1} bgcolor="background.light" alignItems="center" justifyContent="center">
                <Typography variant="caption" color="text.secondary">
                  Wszystkie
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  134
                </Typography>
              </Stack>
            </Grid2>
            <Grid2 size={4}>
              <Stack py={1} bgcolor="background.light" alignItems="center" justifyContent="center">
                <Typography variant="caption" color="text.secondary">
                  Ocena
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  4.25/5
                </Typography>
              </Stack>
            </Grid2>
          </Grid2>
          {/* <Divider />
          <Button
            fullWidth
            href={`/group/123-456-789/about`}
            variant="outlined"
            LinkComponent={Link}
            startIcon={<VisibilityOutlined />}
          >
            See group
          </Button> */}
        </Stack>
      </Stack>
    </Paper>
  );
};
