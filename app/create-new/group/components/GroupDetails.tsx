import { getCategoriesQueryOptions, getCitiesQueryOptions } from "@/app/common/graphql/options/query";
import { flattenIssues, ZodFlattenIssue } from "@/app/common/utils/zod";
import { Category, City } from "@/app/model/model";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid2,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSuspenseQuery } from "@tanstack/react-query";
import * as React from "react";
import { z } from "zod";

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

const FormGrid = styled(Grid2)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const CreateGroupValidation = (() => {
  const minName = 5;
  const maxName = 50;
  const minDescription = 5;
  const maxDescription = 250;
  const minCategories = 1;
  const maxCategories = 5;

  const nameSchema = z.string().min(minName).max(maxName);
  const descriptionScheme = z.string().min(minDescription).max(maxDescription);
  const cityScheme = z.string().min(1);
  const categoriesScheme = z.array(z.string().min(1)).min(minCategories).max(maxCategories);

  const createGroupSchema = z.object({
    name: nameSchema,
    description: descriptionScheme,
    city: cityScheme,
    categories: categoriesScheme,
  });

  return {
    vars: {
      minName,
      maxName,
      minDescription,
      maxDescription,
      minCategories,
      maxCategories,
    },
    createGroupSchema,
  };
})();

export type CreateGroupScheme = z.infer<typeof CreateGroupValidation.createGroupSchema>;

export type GroupDetailsData =
  | {
      success: false;
    }
  | { success: true; data: CreateGroupScheme };

export interface GroupDetailsRef {
  save: () => GroupDetailsData;
}

export const GroupDetails = ({ ref }: { ref: React.RefObject<GroupDetailsRef | null> }) => {
  const {
    data: { getCategories },
    isLoading: getCategoriesLoading,
  } = useSuspenseQuery(getCategoriesQueryOptions());

  const {
    data: { getCities },
    isLoading: getCitiesLoading,
  } = useSuspenseQuery(getCitiesQueryOptions());

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [city, setCity] = React.useState<City | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [errors, setErrors] = React.useState<ZodFlattenIssue>({});

  const handleName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleCategories = React.useCallback((e: unknown, categories: Category[]) => {
    setCategories(categories);
  }, []);

  const handleDeleteCategories = React.useCallback(
    (toDelete: Category) => {
      setCategories((prevCategories) => prevCategories.filter((p) => p.value !== toDelete.value));
    },
    [setCategories]
  );

  const handleCity = React.useCallback((e: unknown, value: City | null) => {
    setCity(value);
  }, []);

  const handleDescription = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  const handleSave = React.useCallback((): GroupDetailsData => {
    const { data, success, error } = CreateGroupValidation.createGroupSchema.safeParse({
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

  React.useImperativeHandle(ref, () => ({
    save: handleSave,
  }));

  const nameError = errors["name"];
  const descriptionError = errors["description"];
  const categoriesError = errors["categories"];
  const cityError = errors["city"];

  return (
    <Grid2 container spacing={3}>
      <FormGrid size={{ xs: 12 }}>
        <FormControl error={!!nameError} required>
          <FormLabel>Nazwa grupy</FormLabel>
          <OutlinedInput required placeholder="Nazwa grupy" size="small" name={name} onChange={handleName} />
          <FormHelperText>
            {!nameError ? (
              <>
                Dostępne znaki: {name.length}/{CreateGroupValidation.vars.maxName}
              </>
            ) : (
              nameError.message
            )}
          </FormHelperText>
        </FormControl>
      </FormGrid>
      <FormGrid size={{ xs: 12, sm: 6 }}>
        <FormControl error={!!categoriesError} required>
          <FormLabel>Kategorie</FormLabel>
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
                        {getCategoriesLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
                Dostępne kategorie: {categories.length}/{CreateGroupValidation.vars.maxCategories}
              </>
            ) : (
              categoriesError.message
            )}
          </FormHelperText>
        </FormControl>
      </FormGrid>
      <FormGrid size={{ xs: 12, sm: 6 }}>
        <FormControl error={!!cityError} required>
          <FormLabel htmlFor="city">Miasto</FormLabel>
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
                        {getCitiesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  },
                }}
              />
            )}
          />
          <FormHelperText>{!cityError ? <>Główna lokalizacja grupy</> : cityError.message}</FormHelperText>
        </FormControl>
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControl error={!!descriptionError} required>
          <FormLabel>Opis</FormLabel>
          <OutlinedInput
            placeholder="Opis"
            multiline
            minRows={6}
            required
            size="small"
            value={description}
            onChange={handleDescription}
          />
          <FormHelperText>
            {!descriptionError ? (
              <>
                Dostępne znaki: {description.length}/{CreateGroupValidation.vars.maxDescription}
              </>
            ) : (
              descriptionError.message
            )}
          </FormHelperText>
        </FormControl>
      </FormGrid>
    </Grid2>
  );
};
