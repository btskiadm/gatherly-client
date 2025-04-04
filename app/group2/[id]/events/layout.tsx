import { GroupEventsLayout } from "./_components/GroupEventsLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GroupEventsLayout>{children}</GroupEventsLayout>;
}
