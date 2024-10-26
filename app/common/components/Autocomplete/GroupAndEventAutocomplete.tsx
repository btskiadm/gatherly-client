"use client";

import { Autocomplete, Chip, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  SearchAttribute,
  SearchAttributeKeys,
  allCategories,
  allCities,
  allGroups,
  searchIcon,
  searchLabel,
} from "@/app/groups/mock";

const options: SearchAttribute[] = [...allCategories, ...allCities, ...allGroups];

const ListboxComponent = (selected: SearchAttribute[], onDelete: (searchAttribute: SearchAttribute) => void) =>
  React.forwardRef(function ListboxComponent(
    props: React.HTMLAttributes<HTMLElement>,
    ref: React.LegacyRef<HTMLDivElement>
  ) {
    const { children, ...other } = props;

    return (
      <div {...other} ref={ref}>
        {selected.length > 0 && (
          <Stack gap={0.5} p={1} flexWrap="wrap" direction="row">
            {selected.map((selection) => (
              <Chip
                variant="outlined"
                key={selection.value}
                label={selection.label}
                onDelete={() => onDelete(selection)}
              />
            ))}
          </Stack>
        )}
        {children}
      </div>
    );
  });

export const GroupAndEventAutocomplete = () => {
  const [selected, setSelected] = useState<SearchAttribute[]>([]);

  const handleDelete = useCallback(
    (toDelete: SearchAttribute) => {
      setSelected((prev) => prev.filter((p) => p.value !== toDelete.value));
    },
    [setSelected]
  );

  const handleChange = useCallback(
    (e: unknown, value: SearchAttribute[]) => {
      setSelected(value);
    },
    [setSelected]
  );

  return (
    <Autocomplete<SearchAttribute, true>
      multiple
      value={selected}
      onChange={handleChange}
      options={options}
      sx={(theme) => ({
        width: "100%",
        ".MuiAutocomplete-tag": {
          my: 0, // fix problem with chip inside autocomplete
        },
        ".MuiChip-label": {
          my: 0, // fix problem with chip inside autocomplete
        },
        [theme.breakpoints.up("sm")]: {
          width: "360px",
        },
      })}
      groupBy={({ key }) => key}
      ListboxComponent={ListboxComponent(selected, handleDelete)}
      getOptionLabel={({ label }) => label}
      renderTags={(value, getTagProps) => (
        <Stack direction="row" maxWidth="40%" width="min-content">
          {value.slice(0, 1).map((option, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                {...getTagProps({ index })}
                key={option.value}
                component="div"
                variant="outlined"
                size="small"
                label={option.label}
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
          label="Search"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  <CircularProgress color="inherit" size={20} />
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
      renderGroup={(params) => (
        <Stack key={params.key} px={2} gap={0.5}>
          <Typography variant="body1">{searchLabel[params.group as SearchAttributeKeys]}</Typography>
          {params.children}
        </Stack>
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Stack key={key} component="li" sx={{ "& > svg": { mr: 2, flexShrink: 0 } }} direction="row" {...optionProps}>
            {searchIcon[option.key]}
            {option.label}
          </Stack>
        );
      }}
    />
  );
};
