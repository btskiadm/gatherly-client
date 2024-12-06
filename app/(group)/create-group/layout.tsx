import { CreateGroupLayout } from "./_components/CreateGroupLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CreateGroupLayout>{children}</CreateGroupLayout>;
}
