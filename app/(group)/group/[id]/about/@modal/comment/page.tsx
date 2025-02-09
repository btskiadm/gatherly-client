import { AddGroupCommentModal } from "./_components/AddGroupCommentModal";

export default async function Page({ params: promiseParams }: { params: Promise<{ id: string }> }) {
  const params = await promiseParams;
  return <AddGroupCommentModal groupId={params.id} />;
}
