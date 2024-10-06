"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SeeEventModal } from "./SeeEvent.modal";
import { SeeEvent, SeeEventRef } from "./_components/SeeEvent.component";
import { Event, eventMock } from "./SeeEvent.mock";

export const SeeEventIntercepted = () => {
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState(false);
  const seeEventRef = useRef<SeeEventRef>(null);
  const router = useRouter();

  useEffect(() => {
    delay(2000).then((_) => {
      setEvent(eventMock);
    });
  }, []);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const submit = useMemo(() => {
    return {
      text: "Join",
      onSubmit: async () => {
        // const data = seeEventRef.current?.invite();

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
      onCancel: handleCancel,
    }),
    [handleCancel]
  );

  return (
    <SeeEventModal
      open={true}
      dialogLoading={!event}
      title="Lorem ipsum"
      loading={loading}
      cancel={cancel}
      submit={submit}
    >
      {event && <SeeEvent ref={seeEventRef} event={event} />}
    </SeeEventModal>
  );
};
