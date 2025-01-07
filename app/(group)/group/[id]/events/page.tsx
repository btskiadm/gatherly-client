import { getGroupDetailsApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "../GroupParams";
import { GroupEventsPage } from "./_components/GroupEventsPage";

export default async function Page(params: GroupParams) {
  const id = await getGroupId(params);
  const groupDetails = getGroupDetailsApi(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupEventsPage groupDetails={groupDetails} />;
}
