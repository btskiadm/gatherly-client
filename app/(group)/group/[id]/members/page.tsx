import { getGroupDetailsApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "../GroupParams";
import { GroupMembersPage } from "./_components/GroupMembersPage";

export default async function Page(params: GroupParams) {
  const id = await getGroupId(params);
  const groupDetails = getGroupDetailsApi(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupMembersPage groupDetails={groupDetails} />;
}
