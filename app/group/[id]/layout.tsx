import { GroupLayout } from "./_components/GroupLayout";

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return <GroupLayout modal={modal}>{children}</GroupLayout>;
}
