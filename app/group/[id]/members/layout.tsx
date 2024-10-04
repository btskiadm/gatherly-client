import { GroupMembersLayout } from "./_components/GroupMemberPage";

export default function Layout({
  modal,
  page,
}: Readonly<{
  modal: React.ReactNode;
  page: React.ReactNode;
}>) {
  return <GroupMembersLayout modal={modal} page={page} />;
}
