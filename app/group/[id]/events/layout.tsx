import { GroupEventsLayout } from "./_components/GroupEventsLayout";

export default function Layout({
  modal,
  page,
}: Readonly<{
  modal: React.ReactNode;
  page: React.ReactNode;
}>) {
  return <GroupEventsLayout modal={modal} page={page} />;
}
