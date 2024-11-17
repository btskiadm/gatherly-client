import { GroupMembersLayout } from "./_components/GroupMemberPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GroupMembersLayout>{children}</GroupMembersLayout>;
}
