"use client";

import { getAllCategories, getAllCities, getAllGroupTitles } from "@/app/mock/mock";
import { FmdGoodOutlined, InterestsOutlined, TitleRounded } from "@mui/icons-material";
import { Autocomplete, Chip, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import React, { ReactNode, useCallback, useState } from "react";

type SearchCategory = "category" | "name" | "city";

interface SearchItem {
  category: SearchCategory;
  label: string;
  value: string;
}

const searchLabel: Record<SearchCategory, string> = {
  category: "Category",
  name: "Name",
  city: "City",
};

const searchIcon: Record<SearchCategory, ReactNode> = {
  category: <InterestsOutlined />,
  city: <FmdGoodOutlined />,
  name: <TitleRounded />,
};

const options: SearchItem[] = [
  ...getAllCategories().slice(0, 25),
  ...getAllGroupTitles().slice(0, 25),
  ...getAllCities().slice(0, 25),
];

const ListboxComponent = (selected: SearchItem[], onDelete: (searchAttribute: SearchItem) => void) =>
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
  const [selected, setSelected] = useState<SearchItem[]>([]);

  const handleDelete = useCallback(
    (toDelete: SearchItem) => {
      setSelected((prev) => prev.filter((p) => p.value !== toDelete.value));
    },
    [setSelected]
  );

  const handleChange = useCallback(
    (e: unknown, value: SearchItem[]) => {
      setSelected(value);
    },
    [setSelected]
  );

  return (
    <Autocomplete<SearchItem, true>
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
      groupBy={({ category }) => category}
      ListboxComponent={ListboxComponent(selected, handleDelete)}
      getOptionLabel={({ label }) => label}
      renderTags={(value, getTagProps) => {
        const tags = value.slice(0, 2);

        if (tags.length <= 0) {
          return null;
        }

        return (
          <Stack direction="row" maxWidth="40%" width="min-content">
            {tags.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });

              if (index === 1) {
                return (
                  <Chip
                    {...tagProps}
                    key={key}
                    component="div"
                    variant="outlined"
                    size="small"
                    label={"+" + (value.length - 1)}
                    onDelete={undefined}
                  />
                );
              }

              return (
                <Chip
                  {...tagProps}
                  key={key}
                  component="div"
                  variant="outlined"
                  size="small"
                  label={option.label}
                  {...tagProps}
                />
              );
            })}
          </Stack>
        );
      }}
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
          <Typography variant="body1">{searchLabel[params.group as SearchCategory]}</Typography>
          {params.children}
        </Stack>
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Stack key={key} component="li" sx={{ "& > svg": { mr: 2, flexShrink: 0 } }} direction="row" {...optionProps}>
            {searchIcon[option.category]}
            {option.label}
          </Stack>
        );
      }}
    />
  );
};
