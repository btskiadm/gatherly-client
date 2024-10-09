import { GroupEventsLayout } from "./_components/GroupEventsLayout";

export default function Layout({
  page,
}: Readonly<{
  page: React.ReactNode;
}>) {
  return <GroupEventsLayout page={page} />;
}
