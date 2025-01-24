import { getUserApi } from "@/app/mock/mock-api";
import { notFound } from "next/navigation";
import { ProfileParams, getUsernameParam } from "../profile-params";
import { ProfileInfo } from "../_components/profile-info";

export default async function Page(params: ProfileParams) {
  const username = await getUsernameParam(params);
  const user = getUserApi(username);

  if (!user) {
    return notFound();
  }

  return <ProfileInfo user={user} />;
}
