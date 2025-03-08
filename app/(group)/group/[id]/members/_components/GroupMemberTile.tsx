import { Link } from "@/app/common/components/next-link";
import { TruncatedTypography } from "@/app/common/components/truncated-typography";
import { stringToColor } from "@/app/common/utils/string-to-color";
import { GroupUser } from "@/app/model/model";
import { Verified } from "@mui/icons-material";
import { Avatar, Box, Grid2, Paper, Stack, type TypographyOwnProps } from "@mui/material";

const usernameColor = (groupUser: GroupUser): TypographyOwnProps["color"] => {
  if (groupUser.isHost) {
    return "primary";
  }

  if (groupUser.isModerator) {
    return "secondary";
  }

  return "textPrimary";
};

interface Props {
  member: GroupUser;
}

export const GroupMemberTile = ({ member }: Props) => {
  const {
    user: { username, smallPhoto, verifiedAt },
  } = member;

  return (
    <Box position="relative">
      <Link
        href={`/profile/${username}`}
        sx={{
          height: 0,
          width: 0,
          "&:after": {
            zIndex: 1,
            bottom: 0,
            content: "''",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          },
        }}
      />
      <Paper>
        <Stack p={2} gap={1}>
          <Stack alignItems="center" gap={1} py={2} bgcolor="background.default">
            <Avatar
              alt={username}
              sx={{
                bgcolor: stringToColor(username),
                width: "3.6rem",
                height: "3.6rem",
              }}
              src={smallPhoto}
            >
              {username[0]}
            </Avatar>
            <Stack alignItems="center">
              <Stack direction="row" gap={0.5} alignItems="center">
                <TruncatedTypography variant="body1" color={usernameColor(member)}>
                  {username}
                </TruncatedTypography>
                {verifiedAt && <Verified sx={{ fontSize: "1rem", color: "text.secondary" }} />}
              </Stack>
              <TruncatedTypography variant="body2" color="text.secondary">
                Łódź
              </TruncatedTypography>
            </Stack>
          </Stack>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <Stack alignItems="center">
                <TruncatedTypography variant="body2" color="text.secondary">
                  Ukończone
                </TruncatedTypography>
                <TruncatedTypography variant="h6">63</TruncatedTypography>
              </Stack>
            </Grid2>
            <Grid2 size={6}>
              <Stack alignItems="center">
                <TruncatedTypography variant="body2" color="text.secondary">
                  Wszystkie
                </TruncatedTypography>
                <TruncatedTypography variant="h6">99+</TruncatedTypography>
              </Stack>
            </Grid2>
          </Grid2>
        </Stack>
      </Paper>
    </Box>
  );
};
