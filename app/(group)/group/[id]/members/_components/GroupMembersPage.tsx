"use client";

import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { GroupUser } from "@/app/model/model";
import { Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupHeader } from "../../_components/GroupHeader";
import { GroupMembersList } from "./GroupMembersList";

interface Props {
  groupId: string;
}

const formatLabel = (userLength: number) => `${userLength > 99 ? "99+" : userLength}`;

export const GroupMembersPage = ({ groupId }: Props) => {
  const { data } = useSuspenseQuery(getGroupDetailsQueryOptions({ groupId }));

  return (
    <Stack gap={{ xs: 2, sm: 3 }}>
      <GroupHeader
        primary="Members"
        subPrimary={formatLabel(data.getGroupDetails?.members.length ?? 0)}
        secondary="See group members."
      />
      <GroupMembersList members={(data.getGroupDetails?.members as GroupUser[]) ?? []} />
    </Stack>
  );
};
