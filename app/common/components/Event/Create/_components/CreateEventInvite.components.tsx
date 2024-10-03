"use client";

import {
  CreateEventInviteInput,
  ZodFlattenIssue,
  createEventInviteSchema,
  flattenIssues,
} from "@/app/common/utils/zod";
import { User } from "@/app/group/[id]/events/_components/mock";
import { Close } from "@mui/icons-material";
import { Avatar, Badge, FormControl, FormHelperText, FormLabel, IconButton, Stack, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { FindUserAutocomplete } from "./FindUserAutocomplete";
import { stringToColor } from "@/app/common/utils/stringToColor";

const avatarCounts = 6;

export interface CreateEventInviteData {
  success: boolean;
  data?: CreateEventInviteInput;
}

export interface CreateEventInviteRef {
  next: () => CreateEventInviteData;
}

interface Props {}

export const CreateEventInvite = forwardRef<CreateEventInviteRef, Props>(({}, ref) => {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleNext = useCallback((): CreateEventInviteData => {
    const { data, success, error } = createEventInviteSchema.safeParse({
      inviteIds: users.map((invite) => invite.id),
    });

    if (error) {
      setErrors(flattenIssues(error?.issues));
    }

    return {
      success,
      data,
    };
  }, []);

  useImperativeHandle(ref, () => ({
    next: handleNext,
  }));

  const handleUsers = useCallback((selectedUsers: User[]) => {
    setUsers(selectedUsers);
  }, []);

  const handleDelete = (toDelete: User) => {
    setUsers((prev) => prev.filter((p) => p.id !== toDelete.id));
  };

  const usersError = errors["users"];
  const userCountRest = users.length - avatarCounts - 1;

  return (
    <Stack gap={3} width="100%">
      <Stack gap={2}>
        <FormControl error={!!usersError} fullWidth>
          <FormLabel>Members</FormLabel>
          <FindUserAutocomplete users={users} onChange={handleUsers} />
          <FormHelperText>{!usersError ? <>Zaproś uźytkowników</> : usersError.message}</FormHelperText>
        </FormControl>
        <Stack direction="row" gap={1}>
          {users.slice(0, avatarCounts).map((user) => (
            <Tooltip key={user.id} title={user.name}>
              <IconButton
                onClick={() => handleDelete(user)}
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
      </Stack>
    </Stack>
  );
});
