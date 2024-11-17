"use client";

import { GroupsPageError } from "./_components/GroupsPageError";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <GroupsPageError error={error} reset={reset} />;
}
