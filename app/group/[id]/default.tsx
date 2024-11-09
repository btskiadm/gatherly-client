import { getGroupDetails } from "@/app/mock/mock";
import { GroupAboutPage } from "./about/_components/GroupAboutPage";
import { notFound } from "next/navigation";
import { GroupParams, getGroupId } from "./GroupParams";

export default function Default(params: GroupParams) {
  const id = getGroupId(params);
  const groupDetails = getGroupDetails(id);

  if (!groupDetails) {
    return notFound();
  }

  return <GroupAboutPage groupDetails={groupDetails} />;
}
