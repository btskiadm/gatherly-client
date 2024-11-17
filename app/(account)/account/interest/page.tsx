"use client";

import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";

import { getSearchCategories } from "@/app/mock/mock-api";
import { SearchCategoryDto } from "@/app/mock/mock-api.types";
import { Button, FormControl, FormLabel, Paper, Stack, Typography } from "@mui/material";

const loading = true;

export default function Page() {
  const [selected, setSelected] = useState<SearchCategoryDto[]>([]);

  const handleDelete = useCallback(
    (toDelete: SearchCategoryDto) => {
      setSelected((prev) => prev.filter((p) => p.value !== toDelete.value));
    },
    [setSelected]
  );

  const handleChange = useCallback(
    (e: unknown, value: SearchCategoryDto[]) => {
      setSelected(value);
    },
    [setSelected]
  );

  return (
    <Paper>
      <Stack p={{ xs: 2, sm: 3 }} gap={{ xs: 2, sm: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Interest
        </Typography>
        <FormControl>
          <FormLabel>Categories</FormLabel>
          <Autocomplete<SearchCategoryDto, true>
            multiple
            value={selected}
            onChange={handleChange}
            options={getSearchCategories()}
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
            getOptionLabel={(option) => option.label}
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
                placeholder="Search"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    notched: false,
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
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Stack
                  key={key}
                  component="li"
                  sx={{ "& > svg": { mr: 2, flexShrink: 0 } }}
                  direction="row"
                  {...optionProps}
                >
                  {/* {searchIcon[option.key as SearchCategory]} */}
                  {option.label}
                </Stack>
              );
            }}
          />
        </FormControl>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {selected.map((selection) => (
            <Chip
              key={selection.value}
              variant="outlined"
              size="small"
              label={selection.label}
              onDelete={() => handleDelete(selection)}
            />
          ))}
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained">Save</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
