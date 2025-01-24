"use client";

import { flattenIssues, InviteMemberInput, inviteMemberSchema, ZodFlattenIssue } from "@/app/common/utils/zod";
import { SearchUserDto } from "@/app/mock/mock-api.types";
import { FormControl, FormHelperText, FormLabel, Stack } from "@mui/material";
import { RefObject, useCallback, useImperativeHandle, useState } from "react";
import { FindUserAutocomplete } from "./find-user-autocomplete";
import { FindUserAvatars } from "./find-user-avatars";

export interface InviteMemberData {
  success: boolean;
  data?: InviteMemberInput;
}

export interface InviteMemberRef {
  invite: () => InviteMemberData;
}

interface Props {
  ref: RefObject<InviteMemberRef | null>;
}

export const InviteMember = ({ ref }: Props) => {
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
};
