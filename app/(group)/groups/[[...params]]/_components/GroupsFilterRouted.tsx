"use client";

import { GroupAndEventFilter } from "@/app/common/components/Filter/GroupAndEventFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
}

export const GroupsFilterRouted = ({ remote, sponsored, verified, minMembers, maxMembers }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (sponsored: boolean, verified: boolean, remote: boolean, minMembers: number, maxMembers: number) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (sponsored) {
        newSearchParams.set("sponsored", "yes");
      } else {
        newSearchParams.delete("sponsored");
      }

      if (verified) {
        newSearchParams.set("verified", "yes");
      } else {
        newSearchParams.delete("verified");
      }

      if (remote) {
        newSearchParams.set("remote", "yes");
      } else {
        newSearchParams.delete("remote");
      }

      if (minMembers === 1) {
        newSearchParams.delete("minMembers");
      } else {
        newSearchParams.set("minMembers", minMembers.toString());
      }

      if (maxMembers >= 50) {
        newSearchParams.delete("maxMembers");
      } else {
        newSearchParams.set("maxMembers", maxMembers.toString());
      }

      newSearchParams.sort();

      if (newSearchParams.size >= 1) {
        router.push(pathname + "?" + newSearchParams.toString());
      } else {
        router.push(pathname);
      }
    },
    [router, pathname, searchParams]
  );

  return (
    <GroupAndEventFilter
      minMembers={minMembers}
      maxMembers={maxMembers}
      remote={remote}
      sponsored={sponsored}
      verified={verified}
      onChange={handleChange}
    />
  );
};
