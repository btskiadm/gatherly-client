"use client";

import { GroupsError } from "./_components/GroupsError";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <GroupsError error={error} reset={reset} />;
}
