import { GroupLayout } from "./_components/GroupLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GroupLayout>{children}</GroupLayout>;
}
