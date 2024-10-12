"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModalTemplate } from "../../Modal/ModalTemplate";
import { Event, eventMock } from "./EventInfo.mock";
import { EventInfo, EventInfoRef } from "./_components/EventInfo.component";

export const EventInfoIntercepted = () => {
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState(false);
  const eventInfoRef = useRef<EventInfoRef>(null);
  const router = useRouter();

  useEffect(() => {
    delay(2000).then((_) => {
      setEvent(eventMock);
    });
  }, []);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const join = useMemo(() => {
    return {
      text: "Join",
      onAction: async () => {
        // const data = EventInfoRef.current?.invite();

        // if (!data?.success) {
        //   return;
        // }

        setLoading(true);
        await delay(2000);
        setLoading(false);
        handleCancel();
      },
    };
  }, [handleCancel]);

  const cancel = useMemo(
    () => ({
      onAction: handleCancel,
    }),
    [handleCancel]
  );

  const details = useMemo(
    () => ({
      onAction: () => {
        window.location.replace("/event/123-456-789");
      },
      text: "Details",
    }),
    []
  );

  return (
    <ModalTemplate open={true} title="Lorem ipsum" loading={loading} cancel={cancel} confirm={join} back={details}>
      {event && <EventInfo ref={eventInfoRef} event={event} />}
    </ModalTemplate>
  );
};
