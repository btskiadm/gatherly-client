import { Link } from "@/app/common/components/NextLink";
import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { Group, Place } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Chip, Grid2, Paper, Stack, Typography } from "@mui/material";
import { GroupEventItem } from "../events.mock";
import { EventTileMenu } from "./EventTileMenu";

interface Props {
  item: GroupEventItem;
}

const shortMonth = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    month: "short",
  }).format(new Date(iso));

const shortDay = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
  }).format(new Date(iso));

const time = (isoStart: string, isoEnd: string) =>
  `${new Intl.DateTimeFormat("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(isoStart))} - ${new Intl.DateTimeFormat("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(isoEnd))}`;

export const EventTile = ({ item }: Props) => {
  const { title, startAt, endAt, city, street, members } = item;

  const _members = members > 99 ? "99+" : members;

  return (
    <Paper
      sx={(theme) => ({
        width: "100%",
        position: "relative",
        [theme.breakpoints.up("sm")]: {
          transition: "all 0.2s",
          "&:hover": {
            boxShadow: 3,
          },
        },
      })}
    >
      <Link
        href="123-456-789"
        sx={{
          height: 0,
          width: 0,
          "&:after": {
            bottom: 0,
            content: "''",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          },
        }}
      />
      <Box p={2}>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3 }}>
          <Grid2 size={{ xs: 3, sm: 2 }}>
            <Stack justifyContent="center" alignItems="center">
              <Typography textTransform="uppercase" variant="body2" color="text.secondary">
                {shortMonth(startAt)}
              </Typography>
              <Typography variant="h4" color="text.secondary" fontWeight="600">
                {shortDay(startAt)}
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 9, sm: 4 }}>
            <Stack gap={1}>
              <Stack direction="row" gap={0.5} alignItems="center">
                <AccessTimeIcon
                  fontSize="small"
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {time(startAt, endAt)}
                </Typography>
              </Stack>
              <Stack direction="row" gap={0.5} alignItems="center">
                <Place
                  fontSize="small"
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <TruncatedTypography variant="body2" color="text.secondary">
                  {city}
                  {street ? `, ${street}` : ""}
                </TruncatedTypography>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack alignContent="flex-start" alignItems="flex-start" gap={{ xs: 1, sm: 0.5 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: {
                    xs: 3,
                    sm: 1,
                  },
                  WebkitBoxOrient: "vertical",
                  color: "text.secondary",
                }}
              >
                {title}
              </Typography>
              <Box display={{ xs: "none", sm: "block" }}>
                <Chip size="small" label={_members} icon={<Group />} />
              </Box>
              <Stack
                display={{ sx: "flex", sm: "none" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Chip size="small" label={_members} icon={<Group />} />
                <EventTileMenu />
              </Stack>
            </Stack>
          </Grid2>
          <Grid2
            display={{
              xs: "none",
              sm: "block",
            }}
            size={{ sm: 2 }}
            alignContent="center"
          >
            <Stack alignItems="flex-end">
              <EventTileMenu />
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};
