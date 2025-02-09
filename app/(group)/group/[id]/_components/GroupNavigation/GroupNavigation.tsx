"use client";
import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { Box } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupDesktopNavigation } from "./GroupDesktopNavigation";
import { GroupMobileNavigation } from "./GroupMobileNavigation";

interface Props {
  groupId: string;
}

export function GroupNavigation({ groupId }: Props) {
  const { data } = useSuspenseQuery(getGroupDetailsQueryOptions({ groupId }));

  return (
    <>
      <Box
        display={{
          xs: "none",
          sm: "block",
        }}
      >
        <GroupDesktopNavigation groupDetails={data.getGroupDetails} />
      </Box>
      <Box
        display={{
          sm: "none",
        }}
      >
        <GroupMobileNavigation groupDetails={data.getGroupDetails} />
      </Box>
    </>
  );
}
