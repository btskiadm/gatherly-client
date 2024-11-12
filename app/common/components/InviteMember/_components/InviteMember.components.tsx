"use client";

import { InviteMemberInput, ZodFlattenIssue, flattenIssues, inviteMemberSchema } from "@/app/common/utils/zod";
import { FormControl, FormHelperText, FormLabel, Stack } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { FindUserAutocomplete } from "./FindUserAutocomplete";
import { SearchUserDto } from "@/app/mock/mock-api.types";
import { FindUserAvatars } from "./FindUserAvatars";

export interface InviteMemberData {
  success: boolean;
  data?: InviteMemberInput;
}

export interface InviteMemberRef {
  invite: () => InviteMemberData;
}

interface Props {}

export const InviteMember = forwardRef<InviteMemberRef, Props>(({}, ref) => {
  const [users, setUsers] = useState<SearchUserDto[]>([]);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleInvite = useCallback((): InviteMemberData => {
    const { data, success, error } = inviteMemberSchema.safeParse({
      inviteIds: users.map((invite) => invite.id),
    });

    if (error) {
      setErrors(flattenIssues(error?.issues));
    }

    return {
      success,
      data,
    };
  }, [users]);

  useImperativeHandle(ref, () => ({
    invite: handleInvite,
  }));

  const handleUsers = useCallback((selectedUsers: SearchUserDto[]) => {
    setUsers(selectedUsers);
  }, []);

  const handleDelete = (toDelete: SearchUserDto) => {
    setUsers((prev) => prev.filter((p) => p.id !== toDelete.id));
  };

  const usersError = errors["inviteIds"];

  return (
    <Stack gap={3} width="100%">
      <Stack gap={2}>
        <FormControl error={!!usersError} fullWidth>
          <FormLabel>Members</FormLabel>
          <FindUserAutocomplete users={users} onChange={handleUsers} />
          <FormHelperText>{!usersError ? <>Zaproś uźytkowników</> : usersError.message}</FormHelperText>
        </FormControl>
        <FindUserAvatars users={users} onDelete={handleDelete} />
      </Stack>
    </Stack>
  );
});
