import { getGroupDetailsApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "../group-params";
import { GroupNavigation } from "../_components/GroupNavigation/group-navigation";

export default async function Page(params: GroupParams) {
  const id = await getGroupId(params);
  const groupDetails = getGroupDetailsApi(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupNavigation groupDetails={groupDetails} />;
}
