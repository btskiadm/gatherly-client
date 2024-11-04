import { getGroupDetails } from "@/app/mock/mock";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "../../GroupParams";
import { GroupEventsPage } from "../_components/GroupEventsPage";

export default function Default(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetails(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupEventsPage groupDetails={groupDetails} />;
}
