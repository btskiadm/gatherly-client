import { env } from "@/app/common/utils/env";
import { GetGroupTilesDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";

interface Variables {
  cities: string[];
  categories: string[];
  titles: string[];
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  minMembers: number;
  maxMembers: number;
  numberOfMembers: string;
  dateOfAdding: string;
}

export const getGroupTilesQueryOptions = (variables: Variables) =>
  queryOptions({
    queryKey: ["GetGroupTiles"],
    queryFn: () => request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetGroupTilesDocument, variables),
  });
