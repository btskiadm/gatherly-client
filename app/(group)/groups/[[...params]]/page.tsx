import { GroupsPage } from "./_components/GroupsPage";
import { resolveParams, resolveQueries } from "./utils/groups.routing";

export default async function Page({
  params: { params },
  searchParams: { titles },
}: {
  params: { params: string[] };
  searchParams: { titles?: string };
}) {
  const { categories, locations } = resolveParams(params);
  const { titles: queryTitles } = resolveQueries({ titles });

  return <GroupsPage categories={categories} locations={locations} titles={queryTitles} />;
}
