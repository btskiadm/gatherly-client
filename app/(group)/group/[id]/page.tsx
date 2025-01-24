import { GroupAboutPage } from "./about/_components/group-about-page";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "./group-params";
import { getGroupDetailsApi } from "@/app/mock/mock-api";

export default async function Page(params: GroupParams) {
  const id = await getGroupId(params);
  const groupDetails = getGroupDetailsApi(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupAboutPage groupDetails={groupDetails} />;
}
