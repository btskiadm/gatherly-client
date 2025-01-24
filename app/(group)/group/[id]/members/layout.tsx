import { GroupMembersLayout } from "./_components/group-member-page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GroupMembersLayout>{children}</GroupMembersLayout>;
}
