"use client";

import { addNotificationMutationFn } from "@/app/common/graphql/options/mutation/addNotificationFn";
import { getWsClient } from "@/app/common/graphql/wsClient";
import { Button, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { SubscribePayload } from "graphql-ws";
import { useEffect, useRef } from "react";

export function useNotificationSubscription(recipientId: string, onNotification: (data: any) => void) {
  const ref = useRef<Function | null>(null);

  useEffect(() => {
    (async () => {
      const client = await getWsClient();

      const payload: SubscribePayload = {
        query: `
      subscription NotificationAdded($recipientId: ID!) {
            notificationAdded(recipientId: $recipientId) {
              id
            }
          }
        `,
        variables: { recipientId: "124124" },
      };

      ref.current = client.subscribe(payload, {
        next: (result) => {
          console.dir({ result });
          if (result.data && result.data.newNotification) {
            onNotification(result.data.newNotification);
          }
        },
        error: (err) => console.error("Subscription error:", err),
        complete: () => console.log("Subscription completed"),
      });
    })();

    return () => {
      if (typeof ref.current === "function") {
        ref.current();
      }
    };
  }, [recipientId, onNotification]);
}

export default function Page() {
  const mutation = useMutation({
    mutationFn: addNotificationMutationFn,
  });

  useNotificationSubscription("", console.dir);

  return (
    <Button
      onClick={() => {
        mutation.mutate({
          recipientId: "123",
        });
      }}
    >
      Mutate
    </Button>
  );
}
