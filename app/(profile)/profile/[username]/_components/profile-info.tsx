import { ClampTypography } from "@/app/common/components/clamp-typography";
import { UserDto } from "@/app/mock/mock-api.types";
import { PlaceOutlined, VerifiedOutlined } from "@mui/icons-material";
import { Grid2, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  user: UserDto;
}

export const ProfileInfo = ({
  user: {
    username,
    userDetails: { city },
    thumbnails: { thumb },
  },
}: Props) => {
  return (
    <Paper>
      <Stack>
        <Image
          src={thumb}
          alt="user avatar"
          sizes="100vw"
          width={0}
          height={0}
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
              <ClampTypography variant="body1" fontWeight={600}>
                {username}
              </ClampTypography>
            </Stack>
            <Stack gap={0.5} direction="row" alignItems="center">
              <PlaceOutlined color="action" fontSize="small" />
              <Typography variant="body2">{city.label}</Typography>
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
        </Stack>
      </Stack>
    </Paper>
  );
};
