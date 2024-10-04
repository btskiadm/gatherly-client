"use client";

import { InviteMemberInput, ZodFlattenIssue, flattenIssues, inviteMemberSchema } from "@/app/common/utils/zod";
import { User } from "@/app/group/[id]/events/_components/mock";
import { FormControl, FormHelperText, FormLabel, Stack } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { FindUserAutocomplete } from "../../Event/Create/_components/FindUserAutocomplete";
import { FindUserAvatars } from "../../Event/Create/_components/FindUserAvatars";

export interface InviteMemberData {
  success: boolean;
  data?: InviteMemberInput;
}

export interface InviteMemberRef {
  invite: () => InviteMemberData;
}

interface Props {}

export const InviteMember = forwardRef<InviteMemberRef, Props>(({}, ref) => {
  const [users, setUsers] = useState<User[]>([]);
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

  const handleUsers = useCallback((selectedUsers: User[]) => {
    setUsers(selectedUsers);
  }, []);

  const handleDelete = (toDelete: User) => {
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
