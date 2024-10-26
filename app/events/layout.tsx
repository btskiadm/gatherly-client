import React from "react";
import { EventsLayout } from "./_components/EventsLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EventsLayout>{children}</EventsLayout>;
}
