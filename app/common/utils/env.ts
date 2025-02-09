import { RuntimeError } from "./errors/runtimeError";
import { invariant } from "./invariant";

export type NodeEnv = "development" | "production" | "test";

interface Env {
  NEXT_PUBLIC_BACKEND_GRAPHQL: string;
  NODE_ENV: NodeEnv;
}

invariant(process.env.NEXT_PUBLIC_BACKEND_GRAPHQL, "NEXT_PUBLIC_BACKEND_GRAPHQL is not set", RuntimeError);
invariant(process.env.NODE_ENV, "NODE_ENV is not set", RuntimeError);

export const env: Env = {
  NEXT_PUBLIC_BACKEND_GRAPHQL: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL,
  NODE_ENV: process.env.NODE_ENV,
};
