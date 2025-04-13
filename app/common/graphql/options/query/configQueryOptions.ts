import { ConfigDocument } from "@/app/model/docNodes";
import { ConfigQueryVariables } from "@/app/model/operations";
import { queryOptions } from "@tanstack/react-query";
import { graphQLQueryFactory } from "../../graphQLClient";

export const configQueryKey = () => ["Config"];

export const configQueryOptions = (variables: ConfigQueryVariables) =>
  queryOptions({
    queryKey: configQueryKey(),
    queryFn: () => graphQLQueryFactory(ConfigDocument, variables),
  });
