import { env } from "@/app/common/utils/env";
import { GetGroupDetailsDocument } from "@/app/model/docNodes";
import { queryOptions } from "@tanstack/react-query";
import request from "graphql-request";

interface Variables {
  groupId: string;
}

export const getGroupDetailsQueryOptions = (variables: Variables) =>
  queryOptions({
    queryKey: ["GroupDetailsQuery"],
    queryFn: () => request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, GetGroupDetailsDocument, variables),
  });
