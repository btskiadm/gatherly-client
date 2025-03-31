import { RefreshTokenDocument } from "@/app/model/docNodes";
import { RefreshTokenMutation } from "@/app/model/operations";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ClientError, GraphQLClient } from "graphql-request";
import { RequestConfig } from "graphql-request/build/legacy/helpers/types";
import { env } from "../utils/env";

const timeout = 25000; // 25 sekund

type GraphQLClientRequest = Parameters<GraphQLClient["request"]>[0];
type InferDocumentNodeResult<T> = T extends TypedDocumentNode<infer TResult, any> ? TResult : never;
type InferDocumentNodeVariables<T> = T extends TypedDocumentNode<any, infer TVariables> ? TVariables : never;

export const createGraphQLRequestAbortSignal = () => {
  const abortController = new AbortController();

  if (timeout > 0) {
    setTimeout(() => {
      abortController.abort("timeout");
    }, timeout);
  }

  return abortController.signal;
};

const fetchWithAuthentication: RequestConfig["fetch"] = (input, init) => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const headers = new Headers(init?.headers ?? {});

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });
};

const graphQLClient = new GraphQLClient(env.NEXT_PUBLIC_BACKEND_GRAPHQL, {
  credentials: "include",
  keepalive: true,
  fetch: fetchWithAuthentication,
});

async function refreshAccessToken(): Promise<void> {
  try {
    const response = await graphQLClient.request<RefreshTokenMutation>(RefreshTokenDocument);

    const accessToken = response.refreshToken?.accessToken;
    const user = response.refreshToken?.user;

    if (!accessToken || !user) {
      throw new Error("Access token was not generated.");
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Refresh access token failed.", error);
    throw error;
  }
}

export const graphQLQueryFactory = async <
  Document extends GraphQLClientRequest["document"],
  QueryData = InferDocumentNodeResult<Document>,
  Variables = InferDocumentNodeVariables<Document>
>(
  document: Document,
  variables?: Variables
): Promise<QueryData> => {
  const signal = createGraphQLRequestAbortSignal();

  try {
    return variables
      ? await graphQLClient.request<QueryData>({ document, variables, signal })
      : await graphQLClient.request<QueryData>({ document, signal });
  } catch (error: unknown) {
    if (error instanceof ClientError && error.response.status === 401) {
      try {
        await refreshAccessToken();
        return variables
          ? await graphQLClient.request<QueryData>({ document, variables, signal })
          : await graphQLClient.request<QueryData>({ document, signal });
      } catch (refreshError) {
        throw refreshError;

        // logout
        // clean access token
        // clean cookies
      }
    }
    console.error("Request error.", error);
    throw error;
  }
};
