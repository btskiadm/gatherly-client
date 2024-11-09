import { getGroupDetails } from "@/app/mock/mock";
import { GroupParams, getGroupId } from "../GroupParams";
import { GroupSettingsTabs } from "./_components/GroupSettingsTabs";
import { notFound } from "next/navigation";

export default async function Page(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetails(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupSettingsTabs groupDetails={groupDetails} />;
}
