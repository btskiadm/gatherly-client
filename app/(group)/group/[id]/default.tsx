import { getGroupDetailsApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "./group-params";
import { GroupAboutPage } from "./about/_components/group-about-page";

export default async function Default(params: GroupParams) {
  const id = await getGroupId(params);
  const groupDetails = getGroupDetailsApi(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupAboutPage groupDetails={groupDetails} />;
}
