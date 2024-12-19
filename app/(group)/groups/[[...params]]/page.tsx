import { GroupsPage } from "./_components/GroupsPage";

interface ParsedParams {
  locations: string[];
  categories: string[];
}

const create = (locations: string[] = [], categories: string[] = []): ParsedParams => ({ locations, categories });

const resolveParams = (param: string) => decodeURIComponent(param).split(",");

const getParams = (params: string[]): ParsedParams => {
  // empty
  if (!params || (params && params.length === 0)) {
    return create();
  }

  // lodz,warsaw,cracow
  if (params[0] !== "all-locations" && params.length === 1) {
    return create(resolveParams(params[0]));
  }

  // all-locations/football,basketball,dance
  if (params[0] === "all-locations" && params.length >= 2) {
    return create([], resolveParams(params[1]));
  }

  return create(resolveParams(params[0]), resolveParams(params[1]));
};

export default async function Page({ params: { params } }: { params: { params: string[] } }) {
  const { categories, locations } = getParams(params);
  return <GroupsPage categories={categories} locations={locations} />;
}
