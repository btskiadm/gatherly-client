"use client";

import { UserDto } from "@/app/common/graphql/dto";
import { Autocomplete, AutocompleteInputChangeReason, Chip, CircularProgress, Stack, TextField } from "@mui/material";
import React, { useCallback } from "react";

interface Props {
  loading: boolean;
  users: UserDto[];
  selectedUsers: UserDto[];
  onChange: (users: UserDto[]) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}

export const FindUserAutocomplete = ({ loading, users, selectedUsers, onChange, inputValue, onInputChange }: Props) => {
  const handleUsers = useCallback((e: unknown, users: UserDto[]) => {
    onChange(users);
  }, []);

  const handleInputChange = useCallback(
    (event: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      if (reason == "input") {
        onInputChange(value);
      }
    },
    [onInputChange]
  );

  return (
    <Autocomplete<UserDto, true, false, false>
      multiple
      loading={loading}
      value={selectedUsers}
      onChange={handleUsers}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={users}
      disableCloseOnSelect={true}
      noOptionsText="No results found."
      limitTags={1}
      getOptionLabel={(option) => option.username}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          slotProps={{
            input: {
              ...params.InputProps,
              value: inputValue,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
};
