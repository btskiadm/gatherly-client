"use client";

import { Suspense } from "react";
import { useHydration } from "../../utils/hooks/useHydration";

export function LocalTime({ date, formatter }: { date: number | string | Date; formatter: (date: Date) => string }) {
  const hydrated = useHydration();

  return (
    <Suspense key={hydrated ? "local" : "utc"}>
      <time dateTime={new Date(date).toISOString()}>
        {formatter(new Date(date))}
        {hydrated ? "" : " (UTC)"}
      </time>
    </Suspense>
  );
}
