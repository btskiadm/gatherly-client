"use client";

import { getCategoriesQueryOptions, getCitiesQueryOptions } from "@/app/common/graphql/options/query";
import { categoryDtoToSearchCategoryDto, cityDtoToSearchCityDto } from "@/app/common/utils/dto-helpers";
import {
  CreateGroupInput,
  createGroupSchema,
  flattenIssues,
  maxGroupCategories,
  maxGroupDescription,
  maxGroupName,
  ZodFlattenIssue,
} from "@/app/common/utils/zod";
import { Category, City } from "@/app/model/model";
import {
  Autocomplete,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useCallback, useImperativeHandle, useState } from "react";

const loading = false;

export type CreateGroupData =
  | {
      success: false;
    }
  | { success: true; data: CreateGroupInput };

export interface CreateGroupRef {
  reset: () => void;
  save: () => CreateGroupData;
}

interface Props {
  name?: string;
  description?: string;
  city?: City | null;
  categories?: Category[];
  ref: React.RefObject<CreateGroupRef | null>;
}

const ListboxComponent =
  (selected: Category[], onDelete: (toDelete: Category) => void) =>
  (props: React.HTMLAttributes<HTMLElement> & { ref?: React.RefObject<HTMLDivElement> }) => {
    const { children, ref, ...other } = props;

    return (
      <div {...other} ref={ref}>
        {selected.length > 0 && (
          <Stack direction="row" gap={0.5} flexWrap="wrap" p={1} zIndex={100}>
            {selected.map((selection) => (
              <Chip
                key={selection.value}
                variant="outlined"
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

export const CreateGroup = ({
  name: _name = "",
  description: _description = "",
  city: _city = null,
  categories: _categories = [],
  ref,
}: Props) => {
  const {
    data: { getCategories },
  } = useSuspenseQuery(getCategoriesQueryOptions());

  const {
    data: { getCities },
  } = useSuspenseQuery(getCitiesQueryOptions());

  const [name, setName] = useState(_name);
  const [description, setDescription] = useState(_description);
  const [city, setCity] = useState<City | null>(_city ? cityDtoToSearchCityDto(_city) : null);
  const [categories, setCategories] = useState<Category[]>(_categories.map(categoryDtoToSearchCategoryDto));
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleReset = useCallback(() => {
    setName("");
    setDescription("");
    setCity(null);
    setCategories([]);
  }, []);

  const handleSave = useCallback((): CreateGroupData => {
    const { data, success, error } = createGroupSchema.safeParse({
      name,
      description,
      city: city?.value,
      categories: categories.map(({ value }) => value),
    });

    if (error || !success) {
      setErrors(flattenIssues(error?.issues));
      return {
        success: false,
      };
    }

    return {
      success: true,
      data,
    };
  }, [name, description, city, categories]);

  useImperativeHandle(ref, () => ({
    save: handleSave,
    reset: handleReset,
  }));

  const handleCategories = useCallback((e: unknown, categories: Category[]) => {
    setCategories(categories);
  }, []);

  const handleDeleteCategories = useCallback(
    (toDelete: Category) => {
      setCategories((prevCategories) => prevCategories.filter((p) => p.value !== toDelete.value));
    },
    [setCategories]
  );

  const handleCity = useCallback((e: unknown, value: City | null) => {
    setCity(value);
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
  const cityError = errors["city"];

  return (
    <Stack gap={2} width="100%">
      <FormControl error={!!nameError}>
        <FormLabel required>Nazwa</FormLabel>
        <TextField placeholder="Nazwa grupy" size="small" value={name} onChange={handleName} />
        <FormHelperText>
          {!nameError ? (
            <>
              Dostępne znaki: {name.length}/{maxGroupName}
            </>
          ) : (
            nameError.message
          )}
        </FormHelperText>
      </FormControl>
      <FormControl error={!!categoriesError}>
        <FormLabel required>Kategorie</FormLabel>
        <Autocomplete<Category, true>
          multiple
          value={categories}
          onChange={handleCategories}
          options={getCategories ?? []}
          sx={{
            ".MuiAutocomplete-tag": {
              my: 0, // fix problem with chip inside autocomplete
            },
            ".MuiChip-label": {
              my: 0, // fix problem with chip inside autocomplete
            },
          }}
          slotProps={{
            listbox: {
              component: ListboxComponent(categories, handleDeleteCategories),
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
        <FormHelperText>
          {!categoriesError ? (
            <>
              Dostępne kategorie: {categories.length}/{maxGroupCategories}
            </>
          ) : (
            categoriesError.message
          )}
        </FormHelperText>
      </FormControl>
      <Grid2 size={{ xs: 12, sm: 8 }}>
        <FormControl error={!!cityError} fullWidth>
          <FormLabel required>Miasto</FormLabel>
          <Autocomplete<City>
            value={city}
            defaultValue={city}
            onChange={handleCity}
            options={getCities ?? []}
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
      </Grid2>
      <FormControl error={!!descriptionError}>
        <FormLabel required>Description</FormLabel>
        <TextField placeholder="Opis" multiline minRows={6} value={description} onChange={handleDescription} />
        <FormHelperText>
          {!descriptionError ? (
            <>
              Dostępne znaki: {description.length}/{maxGroupDescription}
            </>
          ) : (
            descriptionError.message
          )}
        </FormHelperText>
      </FormControl>
      <Divider />
    </Stack>
  );
};
