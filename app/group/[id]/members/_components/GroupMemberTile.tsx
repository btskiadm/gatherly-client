import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { stringToColor } from "@/app/common/utils/string-to-color";
import { Role, UserGroupTile } from "@/app/model/model";
import { MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  IconButton,
  Stack,
  type TypographyOwnProps,
} from "@mui/material";

const usernameColor = (userGroupTile: UserGroupTile): TypographyOwnProps["color"] => {
  if (userGroupTile.role === Role.Host) {
    return "primary";
  }

  if (userGroupTile.role === Role.Moderator) {
    return "secondary";
  }

  return "text.primary";
};

interface Props {
  userGroupTile: UserGroupTile;
}

export const GroupMemberTile = ({ userGroupTile }: Props) => {
  const {
    role: groupRole,
    userTile: {
      createdAt,
      email,
      eventsCount,
      friendsCount,
      groupsCount,
      id,
      largePhoto,
      mediumPhoto,
      role,
      smallPhoto,
      status,
      username,
    },
  } = userGroupTile;

  return (
    <Card>
      <CardHeader
        sx={{
          padding: "18px 24px",
        }}
        action={
          <IconButton size="small">
            <MoreHoriz />
          </IconButton>
        }
      />
      <CardContent
        sx={{
          p: "0 24px 24px",
        }}
      >
        <Stack alignItems="center" gap={1}>
          <Avatar
            alt={username}
            sx={{
              bgcolor: stringToColor(username),
              width: "90px",
              height: "90px",
              mb: 1,
            }}
            src={smallPhoto}
          >
            {username[0]}
          </Avatar>
          <Stack alignItems="center">
            <Link
              component={Link}
              href={`/profile/${id}`}
              sx={{
                textDecoration: "none",
              }}
            >
              <TruncatedTypography variant="h5" fontSize="1rem" color={usernameColor(userGroupTile)}>
                {username}
              </TruncatedTypography>
            </Link>
            <TruncatedTypography variant="body2" color="text.secondary">
              Łódź
            </TruncatedTypography>
          </Stack>
        </Stack>
      </CardContent>
      <CardContent
        sx={{
          p: "18px 24px",
          bgcolor: "background.default",
        }}
      >
        <Grid2 container spacing={2} bgcolor="background.default">
          <Grid2 size={4} alignItems="center">
            <Stack alignItems="center">
              <TruncatedTypography variant="h6">{eventsCount}</TruncatedTypography>
              <TruncatedTypography variant="body3" color="text.secondary">
                Wydarzenia
              </TruncatedTypography>
            </Stack>
          </Grid2>
          <Grid2 size={4}>
            <Stack alignItems="center">
              <TruncatedTypography variant="h6">{groupsCount}</TruncatedTypography>
              <TruncatedTypography variant="body3" color="text.secondary">
                Grupy
              </TruncatedTypography>
            </Stack>
          </Grid2>
          <Grid2 size={4}>
            <Stack alignItems="center">
              <TruncatedTypography variant="h6">{friendsCount}</TruncatedTypography>
              <TruncatedTypography variant="body3" color="text.secondary">
                Znajomi
              </TruncatedTypography>
            </Stack>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
