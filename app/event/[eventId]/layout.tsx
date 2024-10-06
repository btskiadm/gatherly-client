import React from "react";
import { EventLayout } from "./_component/EventLayout";

export default function Layout({
  group,
  event,
}: Readonly<{
  group: React.ReactNode;
  event: React.ReactNode;
}>) {
  return <EventLayout group={group} event={event} />;
}
