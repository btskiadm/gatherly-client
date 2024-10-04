export default function GroupMembersLayout({
  modal,
  page,
}: Readonly<{
  modal: React.ReactNode;
  page: React.ReactNode;
}>) {
  return (
    <>
      {modal}
      {page}
    </>
  );
}
