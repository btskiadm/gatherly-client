import { LoginLayout } from "./_components/login-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LoginLayout>{children}</LoginLayout>;
}
