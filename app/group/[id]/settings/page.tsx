"use client";
import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { QueryClient } from "@tanstack/react-query";
import { GroupParams } from "../groupParams";
import { GroupSettingsTabs } from "./_components/GroupSettingsTabs";
import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid2,
  IconButton,
  OutlinedInput,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { EditOutlined, MapOutlined } from "@mui/icons-material";
import { Category, City } from "@/app/model/model";
import { TruncatedFormHelperText } from "@/app/common/components/truncated-form-helper-text";
import { GroupSettingsLogo } from "./_components/GroupSettingsLogo";
import { GroupSettingsManage } from "./_components/GroupSettingsManage";
import React from "react";
const FormGrid = styled(Grid2)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default async function Page({ params: promiseParams }: { params: GroupParams }) {
  const queryClient = new QueryClient();
  const { id } = await promiseParams;

  await queryClient.prefetchQuery(
    getGroupDetailsQueryOptions({
      groupId: id,
    })
  );

  return (
    <Stack direction="column" gap={4}>
      <GroupSettingsLogo />
      <Card
        elevation={1}
        sx={{
          width: "100%",
        }}
      >
        <CardHeader
          sx={{
            padding: "18px 24px",
          }}
          title={<Typography variant="h5">Informacje</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Podstawowe informacje o grupie
            </Typography>
          }
          action={
            <IconButton
              color="secondary"
              size="small"
              sx={{
                borderWidth: 1,
                borderStyle: "solid",
              }}
              onClick={() => alert("Not implemented.")}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            p: "0 24px 24px",
          }}
        >
          <Grid2 container spacing={3}>
            <FormGrid size={{ xs: 12 }}>
              <FormControl required>
                <FormLabel>Nazwa grupy</FormLabel>
                <OutlinedInput required placeholder="Nazwa grupy" size="small" />
                {/* <FormHelperText>
            {!nameError ? (
              <>
                Dostępne znaki: {name.length}/{CreateGroupValidation.vars.maxName}
              </>
            ) : (
              nameError.message
            )}
          </FormHelperText> */}
              </FormControl>
            </FormGrid>
            <FormGrid size={{ xs: 12, sm: 6 }}>
              <FormControl required>
                <FormLabel>Kategorie</FormLabel>
                <Autocomplete<Category, true>
                  multiple
                  value={[]}
                  options={[]}
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
                      // component: ListboxComponent(categories, handleDeleteCategories),
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
                          // endAdornment: (
                          //   <React.Fragment>
                          //     {getCategoriesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                          //     {params.InputProps.endAdornment}
                          //   </React.Fragment>
                          // ),
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
                {/* <FormHelperText>
            {!categoriesError ? (
              <>
                Dostępne kategorie: {categories.length}/{CreateGroupValidation.vars.maxCategories}
              </>
            ) : (
              categoriesError.message
            )}
          </FormHelperText> */}
              </FormControl>
            </FormGrid>
            <FormGrid size={{ xs: 12, sm: 6 }}>
              <FormControl required>
                <FormLabel htmlFor="city">Miasto</FormLabel>
                <Autocomplete<City>
                  options={[]}
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
                              {true ? <CircularProgress color="inherit" size={20} /> : null}
                            </React.Fragment>
                          ),
                        },
                      }}
                    />
                  )}
                />
                {/* <FormHelperText>{!cityError ? <>Główna lokalizacja grupy</> : cityError.message}</FormHelperText> */}
              </FormControl>
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
              <FormControl required>
                <FormLabel>Opis</FormLabel>
                <TextField placeholder="Opis" multiline minRows={4} required size="small" />
                {/* <FormHelperText>
            {!descriptionError ? (
              <>
                Dostępne znaki: {description.length}/{CreateGroupValidation.vars.maxDescription}
              </>
            ) : (
              descriptionError.message
            )}
          </FormHelperText> */}
              </FormControl>
            </FormGrid>
          </Grid2>
        </CardContent>
      </Card>

      <Card
        elevation={1}
        sx={{
          width: "100%",
        }}
      >
        <CardHeader
          sx={{
            padding: "18px 24px",
          }}
          title={<Typography variant="h5">Dostęp</Typography>}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Zarządzaj dostępem do grupy
            </Typography>
          }
          action={
            <IconButton
              color="secondary"
              size="small"
              sx={{
                borderWidth: 1,
                borderStyle: "solid",
              }}
              onClick={() => alert("Not implemented.")}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          }
        />
        <CardContent
          sx={{
            p: "0 24px 24px",
          }}
        >
          <Stack direction="column" gap={4} width="100%">
            <FormControl>
              <FormControlLabel
                sx={{
                  m: 0,
                  flexDirection: "row",
                }}
                control={<Switch />}
                // label="Wyświetl na profilu"
                label={
                  <Stack direction="column" position="relative">
                    <Typography variant="body2">Grupa prywatna</Typography>

                    <TruncatedFormHelperText
                      sx={{
                        position: "absolute",
                        top: "1.5rem",
                        m: 0,
                      }}
                    >
                      Only members can see who's in the group and what they post.
                    </TruncatedFormHelperText>
                  </Stack>
                }
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                sx={{
                  m: 0,
                  flexDirection: "row",
                }}
                control={<Switch />}
                // label="Wyświetl na profilu"
                label={
                  <Stack direction="column" position="relative">
                    <Typography variant="body2">Ukryta</Typography>

                    <TruncatedFormHelperText
                      sx={{
                        position: "absolute",
                        top: "1.5rem",
                        m: 0,
                      }}
                    >
                      Only members can find this group.
                    </TruncatedFormHelperText>
                  </Stack>
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Kto akceptuje prośby o dołączenie</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="gilad1" />}
                  label={<Typography variant="body2">Administator i moderator</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox name="jason2" />}
                  label={<Typography variant="body2">Każdy członek grupy</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox name="eric3" />}
                  label={<Typography variant="body2">Nie wymaga akceptacji</Typography>}
                />
              </FormGroup>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <GroupSettingsManage />
    </Stack>
  );
}
