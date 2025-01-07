import { getGroupDetailsApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "./GroupParams";
import { GroupAboutPage } from "./about/_components/GroupAboutPage";

export default async function Default(params: GroupParams) {
  const id = await getGroupId(params);
  const groupDetails = getGroupDetailsApi(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupAboutPage groupDetails={groupDetails} />;
}
