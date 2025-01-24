"use client";

import { createEventDateAndLocationSchema, flattenIssues, ZodFlattenIssue } from "@/app/common/utils/zod";
import { RefObject } from "@fullcalendar/core/preact";
import { FormControl, FormLabel, Grid2, Stack, TextField } from "@mui/material";
import React, { useCallback, useImperativeHandle, useState } from "react";
import { TruncatedFormHelperText } from "../../../truncated-form-helper-text";

export interface CreateEventDateAndLocationData {
  success: boolean;
  data?: {
    date: string;
    from: string;
    to: string;
  };
}

export interface CreateEventDateAndLocationRef {
  next: () => CreateEventDateAndLocationData;
}

interface Props {
  date?: string;
  from?: string;
  to?: string;
  ref: RefObject<CreateEventDateAndLocationRef | null>;
}

export const CreateEventDateAndLocation = ({ date: _date = "", from: _from = "", to: _to = "", ref }: Props) => {
  const [date, setDate] = useState(_date);
  const [from, setFrom] = useState(_from);
  const [to, setTo] = useState(_to);
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleNext = useCallback((): CreateEventDateAndLocationData => {
    const { data, success, error } = createEventDateAndLocationSchema.safeParse({
      date,
      from,
      to,
    });

    if (error) {
      setErrors(flattenIssues(error?.issues));
    }

    return {
      success,
      data,
    };
  }, [date, from, to]);

  useImperativeHandle(ref, () => ({
    next: handleNext,
  }));

  const handleDate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }, []);

  const handleFrom = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  }, []);

  const handleTo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  }, []);

  const dateError = errors["date"];
  const fromError = errors["from"];
  const toError = errors["to"];

  return (
    <Stack gap={3} width="100%">
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 5 }}>
          <FormControl error={!!dateError} fullWidth>
            <FormLabel required>Date</FormLabel>
            <TextField placeholder="YYYY-MM-DD" size="small" value={date} onChange={handleDate} />
            <TruncatedFormHelperText>{!dateError ? <>Data rozpoczęcia</> : dateError.message}</TruncatedFormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3.5 }}>
          <FormControl error={!!fromError} fullWidth>
            <FormLabel required>From</FormLabel>
            <TextField placeholder="HH:MM:SS" size="small" value={from} onChange={handleFrom} />
            <TruncatedFormHelperText>
              {!fromError ? <>Godzina rozpoczęcia</> : fromError.message}
            </TruncatedFormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3.5 }}>
          <FormControl error={!!toError} fullWidth>
            <FormLabel required>To</FormLabel>
            <TextField placeholder="HH:MM:SS" size="small" value={to} onChange={handleTo} />
            <TruncatedFormHelperText>{!toError ? <>Godzina zakączenia</> : toError.message}</TruncatedFormHelperText>
          </FormControl>
        </Grid2>
      </Grid2>
    </Stack>
  );
};
