import { CreateGroupLayout } from "./_components/create-group-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CreateGroupLayout>{children}</CreateGroupLayout>;
}
