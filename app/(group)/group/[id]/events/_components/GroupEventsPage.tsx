"use client";

import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupEventsTabs } from "./GroupEventsTabs";

interface Props {
  groupId: string;
}

const formatLabel = (userLength: number) => `${userLength > 99 ? "[99+]" : `[${userLength}]`}`;

export const GroupEventsPage = ({ groupId }: Props) => {
  const { data } = useSuspenseQuery(getGroupDetailsQueryOptions({ groupId }));

  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader
        primary="Events"
        subPrimary={formatLabel(data.getGroupDetails.eventsLength)}
        secondary="See scheduled group eventsevents."
      />
      <GroupEventsTabs groupDetails={data.getGroupDetails} />
    </Stack>
  );
};
