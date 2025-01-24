import { stringToColor } from "@/app/common/utils/string-to-color";
import { Avatar, Stack } from "@mui/material";
import { TruncatedTypography } from "../../../truncated-typography";
import { EventMember } from "../event-info-mock";

interface Props {
  member: EventMember;
}

export const EventInfoMember = ({ member }: Props) => {
  const { id, username, role } = member;
  const isHost = role === "host";
  const isMember = role === "member";
  const isModerator = role === "moderator";

  return (
    <Stack direction="column" alignItems="center" bgcolor="background.paper" py={1} gap={1}>
      <Avatar alt={username} sx={{ width: "2.5rem", height: "2.5rem", bgcolor: stringToColor(username) }}>
        {username.slice(0, 2)}
      </Avatar>
      <Stack gap={0} alignItems="center">
        <TruncatedTypography variant="body2">{username}</TruncatedTypography>
        {isHost && (
          <TruncatedTypography variant="caption" color="primary">
            Host
          </TruncatedTypography>
        )}
        {isModerator && (
          <TruncatedTypography variant="caption" color="secondary">
            Moderator
          </TruncatedTypography>
        )}
        {isMember && (
          <TruncatedTypography variant="caption" color="text.secondary">
            Member
          </TruncatedTypography>
        )}
      </Stack>
    </Stack>
  );
};
