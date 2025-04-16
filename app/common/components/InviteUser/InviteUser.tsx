"use client";

import { getUsersByUsernameQueryOptions } from "@/app/common/graphql/options/query/getUsersByUsernameQueryOptions";
import { flattenIssues, InviteUserInput, inviteUserSchema, ZodFlattenIssue } from "@/app/common/utils/zod";
import { User } from "@/app/model/model";
import { FormControl, FormHelperText, FormLabel, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { RefObject, useCallback, useImperativeHandle, useState } from "react";
import { useDebounce } from "use-debounce";
import { FindUserAutocomplete } from "./FindUserAutocomplete";
import { FindUserAvatars } from "./FindUserAvatars";

export type InviteUserData =
  | {
      success: false;
    }
  | {
      success: true;
      data: InviteUserInput;
    };

export interface inviteUserRef {
  invite: () => InviteUserData;
}

interface Props {
  ref: RefObject<inviteUserRef | null>;
}

export const InviteUser = ({ ref }: Props) => {
  const [inputText, setInputText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});
  const [debouncedSearch] = useDebounce(inputText, 500);
  const { data, isLoading } = useQuery(getUsersByUsernameQueryOptions({ username: debouncedSearch }));

  const handleInvite = useCallback((): InviteUserData => {
    const { data, success, error } = inviteUserSchema.safeParse({
      inviteIds: selectedUsers.map((invite) => invite.id),
    });

    if (error || !success) {
      setErrors(flattenIssues(error?.issues));
      return {
        success: false,
      };
    }

    return {
      success: true,
      data,
    };
  }, [selectedUsers]);

  useImperativeHandle(ref, () => ({
    invite: handleInvite,
  }));

  const handleSelectedUsers = useCallback((selectedUsers: User[]) => {
    setSelectedUsers(selectedUsers);
  }, []);

  const handleDelete = (toDelete: User) => {
    setSelectedUsers((prev) => prev.filter((p) => p.id !== toDelete.id));
  };

  const handleInputChange = useCallback((value: string) => {
    setInputText(value);
  }, []);

  const usersError = errors["inviteIds"];

  const usersData = data?.getUsersByUsername ?? [];

  return (
    <Stack gap={3} width="100%">
      <FormControl error={!!usersError} fullWidth>
        <FormLabel>Lista użytkowników</FormLabel>
        <FindUserAutocomplete
          loading={isLoading}
          inputValue={inputText}
          selectedUsers={selectedUsers}
          users={usersData}
          onChange={handleSelectedUsers}
          onInputChange={handleInputChange}
        />
        <FormHelperText>
          {!usersError ? <>Wprowadz conajmniej 3 znaki, aby rozpocząć wyszukiwanie.</> : usersError.message}
        </FormHelperText>
      </FormControl>
      {selectedUsers.length > 0 && <FindUserAvatars users={selectedUsers} onDelete={handleDelete} />}
    </Stack>
  );
};
