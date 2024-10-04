import { LoginLayout } from "./_components/LoginLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LoginLayout>{children}</LoginLayout>;
}
