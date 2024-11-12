"use client";

import { getSearchCategories, getSearchCities, getSearchGroups } from "@/app/mock/mock-api";
import { SearchCategoryDto, SearchCityDto, SearchGroupDto } from "@/app/mock/mock-api.types";
import { FmdGoodOutlined, InterestsOutlined, TitleRounded } from "@mui/icons-material";
import { Autocomplete, Chip, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import React, { ReactNode, useCallback, useState } from "react";

type SearchItem = SearchCategoryDto | SearchCityDto | SearchGroupDto;
type SearchItemType = SearchItem["type"];

// todo: translation
const searchLabel: Record<SearchItemType, string> = {
  category: "Kategoria",
  city: "Miasto",
  title: "Tytuł",
};

const searchIcon: Record<SearchItemType, ReactNode> = {
  category: <InterestsOutlined />,
  city: <FmdGoodOutlined />,
  title: <TitleRounded />,
};

// todo: mock
const options: SearchItem[] = [
  ...getSearchCategories().slice(0, 25),
  ...getSearchCities().slice(0, 25),
  ...getSearchGroups().slice(0, 25),
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
      setSelected((prevSelected) => prevSelected.filter(({ value }) => value !== toDelete.value));
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
          width: "100%",
          maxWidth: "360px",
        },
      })}
      groupBy={({ type }) => type}
      getOptionLabel={({ label }) => label}
      ListboxComponent={ListboxComponent(selected, handleDelete)}
      renderTags={(value, getTagProps) => {
        const tags = value.slice(0, 2);

        if (tags.length <= 0) {
          return null;
        }

        return (
          <Stack direction="row" maxWidth="40%" width="min-content">
            {tags.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });

              const firstItem = index === 0;
              const label = firstItem ? option.label : "+" + (value.length - 1);
              const onDelete = firstItem ? tagProps.onDelete : undefined;

              return (
                <Chip
                  {...tagProps}
                  key={key}
                  component="div"
                  variant="outlined"
                  size="small"
                  label={label}
                  onDelete={onDelete}
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
          <Typography variant="body1">{searchLabel[params.group as SearchItemType]}</Typography>
          {params.children}
        </Stack>
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <Stack
            {...optionProps}
            key={option.value}
            component="li"
            sx={{ "& > svg": { mr: 2, flexShrink: 0 } }}
            direction="row"
          >
            {searchIcon[option.type as SearchItemType]}
            {option.label}
          </Stack>
        );
      }}
    />
  );
};
