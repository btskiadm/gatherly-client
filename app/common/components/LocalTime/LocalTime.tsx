"use client";

import { Suspense } from "react";
import { useHydration } from "../../utils/hooks/useHydration";

export function LocalTime<T extends number | string | Date>({
  date,
  formatter,
}: {
  date: T;
  formatter: (date: Date) => string;
}) {
  const hydrated = useHydration();

  const d = new Date(date);

  return (
    <Suspense key={hydrated ? "local" : "utc"}>
      <time dateTime={new Date(date).toISOString()}>
        {formatter(d)}
        {hydrated ? "" : " (UTC)"}
      </time>
    </Suspense>
  );
}
