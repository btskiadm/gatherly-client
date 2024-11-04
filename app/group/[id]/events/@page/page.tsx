import { getGroupDetails } from "@/app/mock/mock";
import { GroupParams, getGroupId } from "../../GroupParams";
import { GroupEventsPage } from "../_components/GroupEventsPage";
import { notFound } from "next/navigation";

export default function Page(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetails(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupEventsPage groupDetails={groupDetails} />;
}
