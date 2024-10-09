import { GroupMembersLayout } from "./_components/GroupMemberPage";

export default function Layout({
  page,
}: Readonly<{
  page: React.ReactNode;
}>) {
  return <GroupMembersLayout page={page} />;
}
