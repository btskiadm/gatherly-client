import React from "react";
import { EventsLayout } from "./_components/events-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EventsLayout>{children}</EventsLayout>;
}
