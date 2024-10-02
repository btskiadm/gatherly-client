import { Link } from "@/app/common/components/NextLink";
import { TruncatedTypography } from "@/app/common/components/TruncatedTypography";
import { Group, Place } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Chip, Grid2, Paper, Stack, Typography } from "@mui/material";
import { EventGroupItem } from "./mock";

interface Props {
  item: EventGroupItem;
}

export const EventTile = ({ item }: Props) => {
  const { id, title, startAt, endAt, city, street, members } = item;

  const _members = members > 99 ? "99+" : members;
  const shortMonth = new Intl.DateTimeFormat("pl-PL", {
    month: "short",
  }).format(new Date(startAt));
  const shortDay = new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
  }).format(new Date(startAt));
  const time = `${new Intl.DateTimeFormat("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(startAt))} - ${new Intl.DateTimeFormat("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(endAt))}`;

  return (
    <Paper
      sx={(theme) => ({
        width: "100%",
        boxShadow: 1,
        position: "relative",
        [theme.breakpoints.up("sm")]: {
          transition: "all 0.2s",
          "&:hover": {
            boxShadow: 6,
          },
        },
      })}
    >
      <Link
        href="#"
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
                {shortMonth}
              </Typography>
              <Typography variant="h4" color="text.secondary" fontWeight="600">
                {shortDay}
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
                  {time}
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
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Stack alignContent="flex-start" alignItems="flex-start" gap={{ xs: 2, sm: 0.5 }}>
              <Typography
                variant="body2"
                color="text.secondary"
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
              <Chip size="small" label={_members} icon={<Group />} />
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};
