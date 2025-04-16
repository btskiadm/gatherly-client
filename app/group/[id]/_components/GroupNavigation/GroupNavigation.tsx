"use client";
import { getGroupDetailsQueryOptions } from "@/app/common/graphql/options/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { GroupDesktopNavigation } from "./GroupDesktopNavigation";

interface Props {
  groupId: string;
}

export function GroupNavigation({ groupId }: Props) {
  const { data } = useSuspenseQuery(getGroupDetailsQueryOptions({ groupId }));

  if (!data.getGroupDetails) {
    return notFound();
  }

  return <GroupDesktopNavigation groupDetails={data.getGroupDetails} />;
}
