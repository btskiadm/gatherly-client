import { GroupMembersLayout } from "./_components/GroupMembersLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GroupMembersLayout>{children}</GroupMembersLayout>;
}
