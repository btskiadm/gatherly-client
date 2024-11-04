import { getGroupDetails } from "@/app/mock/mock";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "../GroupParams";
import { GroupNavigation } from "../_components/GroupNavigation/GroupNavigation";

export default function Page(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetails(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupNavigation groupDetails={groupDetails} />;
}
