import { SignUpLayout } from "./_components/sign-up-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SignUpLayout>{children}</SignUpLayout>;
}
