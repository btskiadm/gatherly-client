"use client";

import CityMap16x9 from "@/app/public/assets/citymap_16x9.webp";
import { RefObject } from "@fullcalendar/core/preact";
import { Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback, useImperativeHandle } from "react";
import { toast } from "react-hot-toast";
import { Event } from "../event-info-mock";
import { EventInfoMember } from "./event-info-member-component";

export interface EventInfoData {
  success: boolean;
  data?: {};
}

export interface EventInfoRef {
  submit: () => EventInfoData;
}

interface Props {
  event: Event;
  ref: RefObject<EventInfoRef | null>;
}

export const EventInfo = ({ event, ref }: Props) => {
  const { id, title, description, startAt, endAt, city, street, locationId, members } = event;

  const handleSubmit = useCallback((): EventInfoData => {
    // const { data, success, error } = createEventDateAndLocationSchema.safeParse({
    //   date,
    //   from,
    //   to,
    // });

    // if (error) {
    //   setErrors(flattenIssues(error?.issues));
    // }

    return {
      success: true,
      // data,
    };
  }, []);

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  // const handleDate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDate(e.target.value);
  // }, []);

  return (
    <Stack gap={2} width="100%">
      <Stack bgcolor="background.light" p={{ xs: 1, sm: 2 }} gap={1}>
        <Typography variant="subtitle2" color="text.secondary">
          Name
        </Typography>
        <Typography variant="body1">{title}</Typography>
      </Stack>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack bgcolor="background.light" p={{ xs: 1, sm: 2 }} gap={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Start at
            </Typography>
            <Typography variant="body1">
              {new Intl.DateTimeFormat("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(startAt))}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack bgcolor="background.light" p={{ xs: 1, sm: 2 }} gap={1}>
            <Typography variant="subtitle2" color="text.secondary">
              End at
            </Typography>
            <Typography variant="body1">
              {new Intl.DateTimeFormat("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(endAt))}
            </Typography>
          </Stack>
        </Grid2>
      </Grid2>
      <Stack bgcolor="background.light" p={{ xs: 1, sm: 2 }} gap={1}>
        <Typography variant="subtitle2" color="text.secondary">
          Description
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Stack>
      <Stack
        gap={2}
        direction={{
          xs: "column",
          sm: "row-reverse",
        }}
      >
        <Grid2 container spacing={2} flexShrink={0}>
          <Grid2 size={12}>
            <Stack bgcolor="background.light" p={{ xs: 1, sm: 2 }} gap={1}>
              <Typography variant="subtitle2" color="text.secondary">
                City
              </Typography>
              <Typography variant="body1">{city}</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={12}>
            <Stack bgcolor="background.light" p={{ xs: 1, sm: 2 }} gap={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Street
              </Typography>
              <Typography variant="body1"> {street}</Typography>
            </Stack>
          </Grid2>
        </Grid2>
        <Stack bgcolor="background.light" p={{ xs: 1, sm: 2 }} gap={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Map
          </Typography>
          <Image
            src={CityMap16x9}
            alt="city map"
            sizes="100vw"
            onClick={() => {
              toast(`TODO: Show map modal. Id: [${locationId}].`);
            }}
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
              objectFit: "cover",
            }}
          />
        </Stack>
      </Stack>
      <Stack bgcolor="background.light" p={{ xs: 1, sm: 2 }} gap={1}>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography variant="subtitle2" color="text.secondary">
            Members
          </Typography>
          <Typography variant="caption" color="text.secondary">
            [{`${members.length}`}]
          </Typography>
        </Stack>
        <Grid2 container spacing={{ xs: 1, sm: 2 }}>
          {members.map((member) => (
            <Grid2 key={member.id} size={{ xs: 6, sm: 4 }}>
              <EventInfoMember member={member} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </Stack>
  );
};
