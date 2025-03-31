"use client";

import { createEventDateAndLocationSchema, flattenIssues, ZodFlattenIssue } from "@/app/common/utils/zod";
import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import React, { useCallback, useImperativeHandle, useState, forwardRef, RefObject } from "react";
import { TruncatedFormHelperText } from "../../../truncated-form-helper-text";
import { TruncatedTypography } from "../../../truncated-typography";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCitiesQueryOptions } from "@/app/common/graphql/options/query";
import { City } from "@/app/model/model";
import { env } from "@/app/common/utils/env";

export interface CreateEventDateAndLocationData {
  success: boolean;
  data?: {
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    city: string;
    allDay: boolean;
  };
}

export interface CreateEventDateAndLocationRef {
  next: () => CreateEventDateAndLocationData;
}

interface Props {
  dateFrom?: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  allDay?: boolean;
  ref: RefObject<CreateEventDateAndLocationRef | null>;
}

const dateFromMock = new Date().toISOString().split("T")[0];
const dateToMock = new Date().toISOString().split("T")[0];
const timeFromMock = "10:00:00";
const timeToMock = "12:00:00";

const CreateEventDateAndLocation = ({
  dateFrom: _dateFrom = "",
  dateTo: _dateTo = "",
  timeFrom: _timeFrom = "",
  timeTo: _timeTo = "",
  allDay: _allDay = false,
  ref,
}: Props) => {
  const {
    data: { getCities },
  } = useSuspenseQuery(getCitiesQueryOptions());

  const [dateFrom, setDateFrom] = useState(_dateFrom || env.NODE_ENV === "development" ? dateFromMock : "");
  const [dateTo, setDateTo] = useState(_dateTo || env.NODE_ENV === "development" ? dateToMock : "");
  const [timeFrom, setTimeFrom] = useState(_timeFrom || env.NODE_ENV === "development" ? timeFromMock : "");
  const [timeTo, setTimeTo] = useState(_timeTo || env.NODE_ENV === "development" ? timeToMock : "");
  const [allDay, setAllDay] = useState(_allDay ?? _allDay);
  const [city, setCity] = useState<City | null>();

  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleNext = useCallback((): CreateEventDateAndLocationData => {
    const { data, success, error } = createEventDateAndLocationSchema.safeParse({
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      city: city?.value,
    });

    if (error || !success) {
      setErrors(flattenIssues(error.issues));
      return {
        success: false,
      };
    }

    return {
      success: true,
      data: {
        allDay: false,
        ...data,
      },
    };
  }, [dateFrom, dateTo, timeFrom, timeTo, city]);

  useImperativeHandle(ref, () => ({
    next: handleNext,
  }));

  const handleDateFrom = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  }, []);

  const handleDateTo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  }, []);

  const handleTimeFrom = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeFrom(e.target.value);
  }, []);

  const handleTimeTo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeTo(e.target.value);
  }, []);

  const handleAllDay = useCallback((event: unknown, checked: boolean) => {
    setAllDay(checked);
  }, []);

  const handleCity = useCallback((e: unknown, value: City | null) => {
    setCity(value);
  }, []);

  const dateFromError = errors["dateFrom"];
  const dateToError = errors["dateTo"];
  const timeFromError = errors["timeFrom"];
  const timeToError = errors["timeTo"];

  return (
    <Stack gap={1} width="100%">
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 8 }}>
          <FormControl fullWidth error={!!false}>
            <FormLabel required>Miasto</FormLabel>
            <Autocomplete<City>
              value={city}
              defaultValue={city}
              onChange={handleCity}
              options={getCities ?? []}
              getOptionLabel={({ label }) => label}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 4 }} display="flex" alignItems="flex-end" justifyContent="flex-end">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Checkbox size="medium" value={allDay} onChange={handleAllDay} />}
              label={<FormLabel>All-day</FormLabel>}
            />
          </Stack>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 8 }}>
          <FormControl error={!!dateFromError} fullWidth>
            <FormLabel required>Starts</FormLabel>
            <TextField placeholder="YYYY-MM-DD" size="small" value={dateFrom} onChange={handleDateFrom} />
            <TruncatedFormHelperText>
              {!dateFromError ? <>Data rozpoczęcia</> : dateFromError.message}
            </TruncatedFormHelperText>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 4 }}>
          <FormControl error={!!timeFromError} fullWidth disabled={allDay}>
            <FormLabel required>From</FormLabel>
            <TextField
              placeholder="HH:MM:SS"
              size="small"
              value={timeFrom}
              onChange={handleTimeFrom}
              disabled={allDay}
            />
            <TruncatedFormHelperText>
              {!timeFromError ? <>Godzina rozpoczęcia</> : timeFromError.message}
            </TruncatedFormHelperText>
          </FormControl>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 8 }}>
          <FormControl error={!!dateToError} fullWidth>
            <FormLabel required>Ends</FormLabel>
            <TextField placeholder="YYYY-MM-DD" size="small" value={dateTo} onChange={handleDateTo} />
            <TruncatedFormHelperText>
              {!dateToError ? <>Data rozpoczęcia</> : dateToError.message}
            </TruncatedFormHelperText>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 4 }}>
          <FormControl error={!!timeToError} fullWidth disabled={allDay}>
            <FormLabel required>To</FormLabel>
            <TextField placeholder="HH:MM:SS" size="small" value={timeTo} onChange={handleTimeTo} disabled={allDay} />
            <TruncatedFormHelperText>
              {!timeToError ? <>Godzina zakończenia</> : timeToError.message}
            </TruncatedFormHelperText>
          </FormControl>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default CreateEventDateAndLocation;
