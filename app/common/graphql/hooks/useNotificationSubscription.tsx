"use client";

import { getWsClient } from "@/app/common/graphql/wsClient";
import { Notification } from "@/app/model/model";
import { SubscribePayload } from "graphql-ws";
import { useEffect, useRef } from "react";

type Unsubscribe = () => void;

export function useNotificationSubscription(recipientId: string, onNotification: (data: Notification) => void) {
  const unsubscribeRef = useRef<Unsubscribe | null>(null);
  const hasSubscribedRef = useRef(false);

  useEffect(() => {
    if (!recipientId || hasSubscribedRef.current) return;

    hasSubscribedRef.current = true;

    const subscribe = async () => {
      try {
        const client = await getWsClient();

        const payload: SubscribePayload = {
          query: `
            subscription NotificationAdded($recipientId: ID!) {
              notificationAdded(recipientId: $recipientId) {
                id
                type
                data
                read
                createdAt
              }
            }
          `,
          variables: { recipientId },
        };

        unsubscribeRef.current = client.subscribe(payload, {
          next: (result) => {
            console.log("📨 Subscription result:", result);
            if (result.data?.notificationAdded) {
              onNotification(result.data.notificationAdded as Notification);
            }
          },
          error: (err) => {
            console.error("❌ Subscription error:", err);
          },
          complete: () => {
            console.log("✅ Subscription completed");
          },
        });
      } catch (err) {
        console.error("❗ Subscription setup failed:", err);
      }
    };

    subscribe();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [recipientId, onNotification]);
}
