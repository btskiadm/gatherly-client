"use client";

import React, { useCallback, useImperativeHandle, useState, forwardRef } from "react";
import { getCategoriesQueryOptions } from "@/app/common/graphql/options/query";
import {
  createEventDetailsSchema,
  flattenIssues,
  maxEventCategories,
  maxEventDescription,
  maxEventName,
  ZodFlattenIssue,
} from "@/app/common/utils/zod";
import { Category } from "@/app/model/model";
import { Autocomplete, Chip, CircularProgress, FormControl, FormLabel, Stack, TextField } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TruncatedFormHelperText } from "../../../truncated-form-helper-text";

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

interface CreateEventDetailsProps {
  name?: string;
  description?: string;
  categories?: Category[];
}

const CreateEventDetails = forwardRef<CreateEventDetailsRef, CreateEventDetailsProps>(
  ({ name: _name = "", description: _description = "", categories: _categories = [] }, ref) => {
    const {
      data: { getCategories = [] },
    } = useSuspenseQuery(getCategoriesQueryOptions());

    const [name, setName] = useState(_name);
    const [description, setDescription] = useState(_description);
    const [categories, setCategories] = useState<Category[]>(_categories);
    const [errors, setErrors] = useState<ZodFlattenIssue>({});

    const handleNext = useCallback((): CreateEventDetailsData => {
      const { data, success, error } = createEventDetailsSchema.safeParse({
        name,
        description,
        categories: categories.map((c) => c.value),
      });

      if (error) {
        setErrors(flattenIssues(error.issues));
      }

      return {
        success,
        data,
      };
    }, [name, description, categories]);

    useImperativeHandle(ref, () => ({
      next: handleNext,
    }));

    const handleCategories = useCallback((e: unknown, newCategories: Category[]) => {
      setCategories(newCategories);
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
          <Autocomplete<Category, true>
            multiple
            value={categories}
            onChange={handleCategories}
            options={getCategories ?? []}
            sx={{
              ".MuiAutocomplete-tag": { my: 0 },
              ".MuiChip-label": { my: 0 },
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                InputProps={{
                  ...params.InputProps,
                  placeholder: "Kategorie",
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderTags={(value, getTagProps) => {
              const displayed = value.slice(0, 1);
              const extra = value.length - 1;
              return (
                <Stack direction="row" maxWidth="80%" width="min-content">
                  {displayed.map((option, index) => {
                    const tagProps = getTagProps({ index });
                    return (
                      <Chip
                        component="div"
                        variant="outlined"
                        size="small"
                        label={option.label}
                        {...tagProps}
                        key={option.value}
                      />
                    );
                  })}
                  {extra > 0 && (
                    <Chip
                      {...getTagProps({ index: 1 })}
                      key="extra"
                      component="div"
                      variant="outlined"
                      size="small"
                      label={`+${extra}`}
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
          <TextField placeholder="Opis" multiline minRows={6} value={description} onChange={handleDescription} />
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
  }
);

CreateEventDetails.displayName = "CreateEventDetails";

export default CreateEventDetails;
