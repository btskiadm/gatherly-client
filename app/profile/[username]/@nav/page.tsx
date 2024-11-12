import { getUserApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { ProfileParams, getUsernameParam } from "../ProfileParams";
import { ProfileInfo } from "../_components/ProfileInfo";

export default function Page(params: ProfileParams) {
  const username = getUsernameParam(params);
  const user = getUserApi(username);

  if (!user) {
    return notFound();
  }

  return <ProfileInfo user={user} />;
}
