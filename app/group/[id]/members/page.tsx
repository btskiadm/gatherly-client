import { getGroupDetails } from "@/app/mock/mock";
import { GroupMembersPage } from "./_components/GroupMembersPage";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "../GroupParams";

export default function Page(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetails(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupMembersPage groupDetails={groupDetails} />;
}
