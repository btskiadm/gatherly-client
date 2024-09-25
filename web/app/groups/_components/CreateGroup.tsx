"use client";

import { Textarea } from "@/app/common/components/Textarea";
import {
  Autocomplete,
  AutocompleteChangeReason,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { CategorySearch, CitySearch, allCategories, allCities } from "../mock";

const loading = false;

const maxName = 50;
const maxDescription = 250;
const maxCategories = 5;

export interface CreateGroupRef {
  name: string;
  description: string;
  categories: string[];
  city?: string; // if not set, then remote
  reset: () => void;
}

export const CreateGroup = forwardRef<CreateGroupRef>((_, ref) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState<CitySearch | null>(null);
  const [categories, setCategories] = useState<CategorySearch[]>([]);

  useImperativeHandle(ref, () => ({
    name,
    description,
    city: city?.value,
    categories: categories.map(({ value }) => value),
    reset: () => {
      setName("");
      setDescription("");
      setCity(null);
      setCategories([]);
    },
  }));

  const handleCategories = useCallback((e: unknown, categories: CategorySearch[], reason: AutocompleteChangeReason) => {
    if (categories.length > maxCategories && reason === "selectOption") {
      return;
    }
    setCategories(categories);
  }, []);

  const handleCity = useCallback((e: unknown, value: CitySearch | null) => {
    setCity(value);
  }, []);

  const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxName) {
      return;
    }

    setName(e.target.value);
  }, []);

  const handleDescription = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxDescription) {
      return;
    }

    setDescription(e.target.value);
  }, []);

  return (
    <Stack gap={3} minWidth="320px" width="clamp(320px, 60vh, 560px)" maxWidth="600px">
      <FormControl>
        <FormLabel required>Nazwa</FormLabel>
        <TextField placeholder="Nazwa grupy" size="small" value={name} onChange={handleName} />
        <FormHelperText>
          Dostępne znaki: {name.length}/{maxName}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel required>Kategorie</FormLabel>
        <Autocomplete<CategorySearch, true>
          multiple
          value={categories}
          defaultValue={categories}
          onChange={handleCategories}
          options={allCategories}
          sx={{
            ".MuiAutocomplete-tag": {
              my: 0, // fix problem with chip inside autocomplete
            },
            ".MuiChip-label": {
              my: 0, // fix problem with chip inside autocomplete
            },
          }}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              slotProps={{
                input: {
                  ...params.InputProps,
                  placeholder: "Kategorie",
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
          renderTags={(value, getTagProps) => {
            return (
              <Stack direction="row" maxWidth="80%" width="min-content">
                {value.slice(0, 1).map((option, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
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
                    component="div"
                    variant="outlined"
                    size="small"
                    label={"+" + (value.length - 1)}
                    onDelete={undefined}
                  />
                )}
              </Stack>
            );
          }}
        />
        <FormHelperText>
          Dostępne kategorie: {categories.length}/{maxCategories}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel required>Description</FormLabel>
        <Textarea placeholder="Opis" minRows={6} value={description} onChange={handleDescription} />
        <FormHelperText>
          Dostępne znaki: {description.length}/{maxDescription}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Miasto</FormLabel>
        <Autocomplete<CitySearch>
          value={city}
          defaultValue={city}
          onChange={handleCity}
          options={allCities}
          getOptionLabel={({ label }) => label}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              slotProps={{
                input: {
                  ...params.InputProps,
                  placeholder: "Miasto",
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
      </FormControl>
    </Stack>
  );
});
