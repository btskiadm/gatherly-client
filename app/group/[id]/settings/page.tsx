import { getGroupDetailsApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "../GroupParams";
import { GroupSettingsTabs } from "./_components/GroupSettingsTabs";

export default async function Page(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetailsApi(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupSettingsTabs groupDetails={groupDetails} />;
}
