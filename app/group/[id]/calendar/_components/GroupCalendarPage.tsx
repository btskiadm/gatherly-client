"use client";

import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupCalendar } from "./GroupCalendar";

interface Props {
  groupId: string;
}

export const GroupCalendarPage = ({ groupId }: Props) => {
  const { data } = useSuspenseQuery(getGroupDetailsQueryOptions({ groupId }));

  if (!data.getGroupDetails) {
    return notFound();
  }

  return (
    <Stack gap={{ xs: 2, sm: 3 }} width="100%" flex={1}>
      <GroupHeader primary="Calendar" secondary="See group events on calendar." />
      <GroupCalendar groupDetails={data.getGroupDetails} />
    </Stack>
  );
};
