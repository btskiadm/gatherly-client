import { Client, createClient } from "graphql-ws";

let wsClient: Client | null = null;

export function createWsClient(): Client {
  return createClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: async () => {
      const accessToken = localStorage.getItem("accessToken");
      return {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    },
    lazy: true,
    retryAttempts: 5,
    retryWait: (attempt) => new Promise((resolve) => setTimeout(resolve, Math.min(1000 * attempt, 30000))),
    onNonLazyError: (error) => {
      console.error("GraphQL WebSocket non-lazy error:", error);
    },
    on: {
      connected: (socket) => {
        console.log("WebSocket connected", socket);
      },
      error: (error) => {
        console.error("WebSocket error", error);
        wsClient?.dispose();
        resetWsClient();
      },
      closed: (event) => {
        console.warn("WebSocket closed", event);
        wsClient = null;
      },
    },
  });
}

export function getWsClient(): Client {
  if (!wsClient) {
    wsClient = createWsClient();
  }
  return wsClient;
}

// Użyj tego po zmianie accessTokenu
export function resetWsClient(): void {
  if (wsClient) {
    wsClient.dispose(); // zamyka istniejące połączenie
  }
  wsClient = createWsClient(); // tworzy nowego klienta z nowym tokenem
}
