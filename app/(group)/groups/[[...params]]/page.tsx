import { GroupsPage } from "./_components/GroupsPage";
import { resolveParams, resolveQueries } from "./utils/groups.routing";

export default async function Page({
  params: { params },
  searchParams: { titles, remote, sponsored, verified, minMembers, maxMembers, numberOfMembers, dateOfAdding },
}: {
  params: { params: string[] };
  searchParams: {
    titles?: string;
    sponsored?: string;
    verified?: string;
    remote?: string;
    minMembers?: string;
    maxMembers?: string;
    numberOfMembers?: string;
    dateOfAdding?: string;
  };
}) {
  const _sponsored = !!sponsored;
  const _remote = !!remote;
  const _verified = !!verified;
  const _minMembers = minMembers ? ~~minMembers : 1;
  const _maxMembers = maxMembers ? ~~maxMembers : 50;

  const { categories, locations } = resolveParams(params);
  const {
    titles: _titles,
    numberOfMembers: _numberOfMembers,
    dateOfAdding: _dateOfAdding,
  } = resolveQueries({ titles, numberOfMembers, dateOfAdding });

  return (
    <GroupsPage
      remote={_remote}
      sponsored={_sponsored}
      verified={_verified}
      minMembers={_minMembers}
      maxMembers={_maxMembers}
      categories={categories}
      locations={locations}
      titles={_titles}
      dateOfAdding={_dateOfAdding}
      numberOfMembers={_numberOfMembers}
    />
  );
}
