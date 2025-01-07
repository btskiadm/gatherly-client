"use client";

import { Textarea } from "@/app/common/components/Textarea";
import {
  createEventDetailsSchema,
  flattenIssues,
  maxEventCategories,
  maxEventDescription,
  maxEventName,
  ZodFlattenIssue,
} from "@/app/common/utils/zod";
import { getSearchCategories } from "@/app/mock/mock-api";
import { SearchCategoryDto } from "@/app/mock/mock-api.types";
import { Autocomplete, Chip, CircularProgress, FormControl, FormLabel, Stack, TextField } from "@mui/material";
import React, { RefObject, useCallback, useImperativeHandle, useState } from "react";
import { TruncatedFormHelperText } from "../../../TruncatedFormHelperText";

const loading = false;

export interface CreateEventDetailsData {
  success: boolean;
  data?: {
    name: string;
    description: string;
    categories: string[];
  };
}

export interface CreateEventDetailsRef {
  next: () => CreateEventDetailsData;
}

interface Props {
  name?: string;
  description?: string;
  categories?: SearchCategoryDto[];
  ref: RefObject<CreateEventDetailsRef | null>;
}

export const CreateEventDetails = ({
  name: _name = "",
  description: _description = "",
  categories: _categories = [],
  ref,
}: Props) => {
  const [name, setName] = useState(_name);
  const [description, setDescription] = useState(_description);
  const [categories, setCategories] = useState<SearchCategoryDto[]>(_categories);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleNext = useCallback((): CreateEventDetailsData => {
    const { data, success, error } = createEventDetailsSchema.safeParse({
      name,
      description,
      categories: categories.map((c) => c.value),
    });

    if (error) {
      setErrors(flattenIssues(error?.issues));
    }

    return {
      success,
      data,
    };
  }, [name, description, categories]);

  useImperativeHandle(ref, () => ({
    next: handleNext,
  }));

  const handleCategories = useCallback((e: unknown, categories: SearchCategoryDto[]) => {
    setCategories(categories);
  }, []);

  const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleDescription = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  const nameError = errors["name"];
  const descriptionError = errors["description"];
  const categoriesError = errors["categories"];

  return (
    <Stack gap={3} width="100%">
      <FormControl error={!!nameError} fullWidth>
        <FormLabel required>Nazwa</FormLabel>
        <TextField placeholder="Nazwa grupy" size="small" value={name} onChange={handleName} />
        <TruncatedFormHelperText>
          {!nameError ? (
            <>
              Dostępne znaki: {name.length}/{maxEventName}
            </>
          ) : (
            nameError.message
          )}
        </TruncatedFormHelperText>
      </FormControl>
      <FormControl error={!!categoriesError} fullWidth>
        <FormLabel required>Kategorie</FormLabel>
        <Autocomplete<SearchCategoryDto, true>
          multiple
          value={categories}
          defaultValue={categories}
          onChange={handleCategories}
          options={getSearchCategories()}
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
                    key={getTagProps({ index: 1 }).key}
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
        <TruncatedFormHelperText>
          {!categoriesError ? (
            <>
              Dostępne kategorie: {categories.length}/{maxEventCategories}
            </>
          ) : (
            categoriesError.message
          )}
        </TruncatedFormHelperText>
      </FormControl>
      <FormControl error={!!descriptionError} fullWidth>
        <FormLabel required>Description</FormLabel>
        <Textarea placeholder="Opis" minRows={6} value={description} onChange={handleDescription} />
        <TruncatedFormHelperText>
          {!descriptionError ? (
            <>
              Dostępne znaki: {description.length}/{maxEventDescription}
            </>
          ) : (
            descriptionError.message
          )}
        </TruncatedFormHelperText>
      </FormControl>
    </Stack>
  );
};
