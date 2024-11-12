import { GroupAboutPage } from "./about/_components/GroupAboutPage";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "./GroupParams";
import { getGroupDetailsApi } from "@/app/mock/mock-api";

export default function Page(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetailsApi(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupAboutPage groupDetails={groupDetails} />;
}
