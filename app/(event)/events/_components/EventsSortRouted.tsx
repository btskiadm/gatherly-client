"use client";

import { DateOfAdding, GroupAndEventSort, NumberOfMembers } from "@/app/common/components/Sort/GroupAndEventSort";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  numberOfMembers: NumberOfMembers;
  dateOfAdding: DateOfAdding;
}

export const EventsSortRouted = ({ numberOfMembers, dateOfAdding }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (numberOfMembers: NumberOfMembers, dateOfAdding: DateOfAdding) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (numberOfMembers) {
        newSearchParams.set("numberOfMembers", numberOfMembers);
      } else {
        newSearchParams.delete("numberOfMembers");
      }

      if (dateOfAdding) {
        newSearchParams.set("dateOfAdding", dateOfAdding);
      } else {
        newSearchParams.delete("dateOfAdding");
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

  return <GroupAndEventSort dateOfAdding={dateOfAdding} numberOfMembers={numberOfMembers} onChange={handleChange} />;
};
