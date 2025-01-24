import { GroupEventsLayout } from "./_components/group-events-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GroupEventsLayout>{children}</GroupEventsLayout>;
}
