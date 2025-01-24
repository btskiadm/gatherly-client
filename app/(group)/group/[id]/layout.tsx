import { GroupLayout } from "./_components/group-layout";

export default function Layout({
  children,
  modal,
  nav,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  nav: React.ReactNode;
}>) {
  return (
    <GroupLayout modal={modal} nav={nav}>
      {children}
    </GroupLayout>
  );
}
