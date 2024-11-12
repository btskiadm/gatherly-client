"use client";

import { getSeachUsers } from "@/app/mock/mock-api";
import { SearchUserDto } from "@/app/mock/mock-api.types";
import { Autocomplete, Chip, CircularProgress, Stack, TextField } from "@mui/material";
import React, { useCallback } from "react";

const loading = true;

const ListboxComponent = (selected: SearchUserDto[], onDelete: (searchAttribute: SearchUserDto) => void) =>
  React.forwardRef(function ListboxComponent(
    props: React.HTMLAttributes<HTMLElement>,
    ref: React.LegacyRef<HTMLDivElement>
  ) {
    const { children, ...other } = props;

    return (
      <div {...other} ref={ref}>
        {selected.length > 0 && (
          <Stack direction="row" gap={0.5} flexWrap="wrap" p={1} zIndex={100}>
            {selected.map((selection) => (
              <Chip
                key={selection.id}
                variant="outlined"
                label={selection.username}
                onDelete={() => onDelete(selection)}
              />
            ))}
          </Stack>
        )}

        {children}
      </div>
    );
  });

interface Props {
  users: SearchUserDto[];
  onChange: (users: SearchUserDto[]) => void;
}

export const FindUserAutocomplete = ({ users, onChange }: Props) => {
  const handleDelete = useCallback(
    (toDelete: SearchUserDto) => {
      onChange(users.filter((p) => p.id !== toDelete.id));
    },
    [users, onChange]
  );

  const handleUsers = useCallback(
    (e: unknown, users: SearchUserDto[]) => {
      onChange(users);
    },
    [onChange]
  );

  return (
    <Autocomplete<SearchUserDto, true>
      multiple
      value={users}
      onChange={handleUsers}
      options={getSeachUsers()}
      sx={(theme) => ({
        width: "100%",
        ".MuiAutocomplete-tag": {
          my: 0, // fix problem with chip inside autocomplete
        },
        ".MuiChip-label": {
          my: 0, // fix problem with chip inside autocomplete
        },
      })}
      ListboxComponent={ListboxComponent(users, handleDelete)}
      getOptionLabel={(option) => option.username}
      renderTags={(value, getTagProps) => (
        <Stack direction="row" maxWidth="80%" width="min-content">
          {value.slice(0, 1).map((option, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={option.id}
                component="div"
                variant="outlined"
                size="small"
                label={option.username}
                {...tagProps}
              />
            );
          })}
          {value?.length > 1 && (
            <Chip
              {...getTagProps({ index: 1 })}
              key={getTagProps({ index: 1 }).key}
              component="div"
              variant="outlined"
              size="small"
              label={"+" + (value.length - 1)}
              onDelete={undefined}
            />
          )}
        </Stack>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          slotProps={{
            input: {
              ...params.InputProps,
              placeholder: "Name or email",
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
