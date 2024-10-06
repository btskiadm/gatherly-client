"use client";

import CityMap16x9 from "@/app/public/assets/citymap_16x9.webp";
import { Avatar, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { TruncatedTypography } from "../../../TruncatedTypography";
import { Event, EventMember } from "../SeeEvent.mock";
import { toast } from "react-hot-toast";
import { stringToColor } from "@/app/common/utils/stringToColor";

export interface SeeEventData {
  success: boolean;
  data?: {};
}

export interface SeeEventRef {
  submit: () => SeeEventData;
}

interface Props {
  event: Event;
}

export const Member = ({ member }: { member: EventMember }) => {
  const { id, username, role } = member;
  const isHost = role === "host";
  const isMember = role === "member";
  const isModerator = role === "moderator";

  return (
    <Stack direction="column" alignItems="center" bgcolor="background.paper" p={1} gap={1}>
      <Avatar alt={username} sx={{ width: "2.5rem", height: "2.5rem", bgcolor: stringToColor(username) }}>
        {username[0]}
        {username[1]}
      </Avatar>
      <Stack gap={0} alignItems="center">
        <TruncatedTypography variant="body2">{username}</TruncatedTypography>
        {isHost && (
          <TruncatedTypography variant="caption" color="primary">
            Host
          </TruncatedTypography>
        )}
        {isModerator && (
          <TruncatedTypography variant="caption" color="secondary">
            Moderator
          </TruncatedTypography>
        )}
        {isMember && (
          <TruncatedTypography variant="caption" color="text.secondary">
            Member
          </TruncatedTypography>
        )}
      </Stack>
    </Stack>
  );
};

export const SeeEvent = forwardRef<SeeEventRef, Props>(({ event }, ref) => {
  const { id, title, description, startAt, endAt, city, street, locationId, members } = event;

  const handleSubmit = useCallback((): SeeEventData => {
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
    <Stack gap={{ xs: 2, sm: 3 }} width="100%">
      <Stack bgcolor="background.default" p={2} gap={1}>
        <Typography variant="body2" color="text.secondary">
          Name
        </Typography>
        <Typography variant="body1">{title}</Typography>
      </Stack>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack bgcolor="background.default" p={2} gap={1}>
            <Typography variant="body2" color="text.secondary">
              Start at
            </Typography>
            <Typography variant="body1">
              {new Intl.DateTimeFormat("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(event.startAt))}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack bgcolor="background.default" p={2} gap={1}>
            <Typography variant="body2" color="text.secondary">
              End at
            </Typography>
            <Typography variant="body1">
              {" "}
              {new Intl.DateTimeFormat("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(event.endAt))}
            </Typography>
          </Stack>
        </Grid2>
      </Grid2>
      <Stack bgcolor="background.default" p={2} gap={1}>
        <Typography variant="body2" color="text.secondary">
          Description
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Stack>
      <Stack
        gap={{ xs: 2, sm: 3 }}
        direction={{
          xs: "column",
          sm: "row-reverse",
        }}
      >
        <Grid2 container spacing={{ xs: 2 }} flexShrink={0}>
          <Grid2 size={12}>
            <Stack bgcolor="background.default" p={2} gap={1}>
              <Typography variant="body2" color="text.secondary">
                City
              </Typography>
              <Typography variant="body1">{city}</Typography>
            </Stack>
          </Grid2>
          <Grid2 size={12}>
            <Stack bgcolor="background.default" p={2} gap={1}>
              <Typography variant="body2" color="text.secondary">
                Street
              </Typography>
              <Typography variant="body1"> {street}</Typography>
            </Stack>
          </Grid2>
        </Grid2>
        <Stack bgcolor="background.default" p={2} gap={1}>
          <Typography variant="body2" color="text.secondary">
            Map
          </Typography>
          <Image
            src={CityMap16x9}
            alt="city map"
            sizes="100vw"
            objectFit="cover"
            onClick={() => {
              toast(`TODO: Show map modal. Id: [${locationId}].`);
            }}
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
        </Stack>
      </Stack>
      <Stack bgcolor="background.default" p={2} gap={1}>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            Members
          </Typography>
          <Typography variant="caption" color="text.secondary">
            [{`${members.length}`}]
          </Typography>
        </Stack>
        <Grid2 container spacing={2}>
          {members.map((member) => (
            <Grid2 key={member.id} size={{ xs: 6, sm: 4 }}>
              <Member member={member} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </Stack>
  );
});
