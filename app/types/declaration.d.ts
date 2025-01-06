export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "development" | "production" | "test";
      PORT?: string;
      NEXT_PUBLIC_BACKEND_GRAPHQL?: string;
    }
  }
}
