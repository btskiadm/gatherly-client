export default function GroupEventsLayout({
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
