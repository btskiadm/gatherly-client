"use client";

import { Category, City, Title } from "@/app/model/model";
import { FmdGoodOutlined, InterestsOutlined, TitleRounded } from "@mui/icons-material";
import { Autocomplete, Chip, Stack, TextField, Typography } from "@mui/material";
import React, { ReactNode, useCallback } from "react";

export type SearchItem = Category | City | Title;
export type SearchItemType = Exclude<SearchItem["__typename"], undefined>;

// todo: translation
const searchLabel: Record<SearchItemType, string> = {
  Category: "Kategoria",
  City: "Miasto",
  Title: "Tytuł",
};

const searchIcon: Record<SearchItemType, ReactNode> = {
  Category: <InterestsOutlined />,
  City: <FmdGoodOutlined />,
  Title: <TitleRounded />,
};

const ListboxComponent =
  (selected: SearchItem[], onDelete: (item: SearchItem) => void) =>
  (props: React.HTMLAttributes<HTMLElement> & { ref?: React.RefObject<HTMLDivElement> }) => {
    const { children, ref, ...other } = props;

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
  };

interface Props {
  selected: SearchItem[];
  cities: City[];
  categories: Category[];
  titles: Title[];
  onChange(items: SearchItem[]): void;
  onDelete(items: SearchItem): void;
}

export const GroupAndEventAutocomplete = ({ selected, cities, categories, titles, onChange, onDelete }: Props) => {
  const handleDelete = useCallback(
    (toDelete: SearchItem) => {
      onDelete(toDelete);
    },
    [onDelete]
  );

  const handleChange = useCallback(
    (e: unknown, value: SearchItem[]) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <Autocomplete<SearchItem, true>
      multiple
      value={selected}
      onChange={handleChange}
      options={[...categories, ...cities, ...titles]}
      groupBy={({ __typename }) => __typename as SearchItemType}
      getOptionLabel={({ label }) => label}
      slotProps={{
        listbox: {
          component: ListboxComponent(selected, handleDelete),
        },
      }}
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
      renderTags={(value, getTagProps) => {
        const tags = value.slice(0, 2);

        if (tags.length <= 0) {
          return null;
        }

        return (
          <Stack direction="row" width="min-content" maxWidth="60%">
            {tags.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });

              const firstItem = index === 0;
              const label = firstItem ? option.label : "+" + (value.length - 1);
              const onDelete = firstItem ? tagProps.onDelete : undefined;

              return (
                <Chip
                  {...tagProps}
                  sx={{
                    width: "100%%",
                  }}
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
      renderInput={(params) => <TextField {...params} variant="outlined" size="small" label="Szukaj" />}
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
            {searchIcon[option.__typename as SearchItemType]}
            {option.label}
          </Stack>
        );
      }}
    />
  );
};
