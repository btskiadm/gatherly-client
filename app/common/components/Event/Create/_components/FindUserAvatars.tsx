"use client";

import { stringToColor } from "@/app/common/utils/stringToColor";
import { User } from "@/app/group/[id]/events/_components/mock";
import { Close } from "@mui/icons-material";
import { Avatar, Badge, IconButton, Stack, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useCallback } from "react";

const avatarCounts = 6;

interface Props {
  users: User[];
  onDelete: (user: User) => void;
}

const DeletableUserAvatar = ({ user, onDelete }: { user: User; onDelete: (user: User) => void }) => {
  const handleDelete = useCallback(() => {
    onDelete(user);
  }, [onDelete, user]);

  return (
    <Tooltip key={user.id} title={user.name}>
      <IconButton
        onClick={handleDelete}
        sx={{
          p: 0,
        }}
      >
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          badgeContent={
            <Close
              sx={{
                bgcolor: grey[500],
                border: "2px solid white",
                color: "white",
                borderRadius: "100%",
                height: "18px",
                width: "18px",
              }}
            />
          }
        >
          <Avatar
            alt={user.name}
            sx={{
              bgcolor: stringToColor(user.name),
              height: "30px",
              width: "30px",
            }}
          >
            {user.name[0]}
          </Avatar>
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export const FindUserAvatars = ({ users, onDelete }: Props) => {
  const userCountRest = users.length - avatarCounts - 1;

  return (
    <Stack direction="row" gap={1}>
      {users.slice(0, avatarCounts).map((user) => (
        <DeletableUserAvatar key={user.id} user={user} onDelete={onDelete} />
      ))}
      {userCountRest > 0 && (
        <Tooltip title={`${userCountRest} more members`}>
          <Avatar
            alt={`${userCountRest} more members`}
            sx={{
              height: "30px",
              width: "30px",
              fontSize: "1rem",
            }}
          >
            +{userCountRest}
          </Avatar>
        </Tooltip>
      )}
    </Stack>
  );
};
