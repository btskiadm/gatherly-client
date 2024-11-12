"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ModalTemplate } from "../Modal/ModalTemplate";
import { SendComment, SendCommentRef } from "./_components/SendComment.components";

export const SendCommentIntercepted = () => {
  const [loading, setLoading] = useState(false);
  const componentRef = useRef<SendCommentRef>(null);
  const router = useRouter();

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const invite = useMemo(() => {
    return {
      onAction: async () => {
        const data = componentRef.current?.send();

        if (!data?.success) {
          toast.error("Validation error. Please check the form.");
          return;
        }

        setLoading(true);
        await delay(2000);
        setLoading(false);
        toast.success("Comment sent.");
        handleCancel();
      },
      text: "Send",
    };
  }, [handleCancel]);

  const cancel = useMemo(
    () => ({
      onAction: handleCancel,
    }),
    [handleCancel]
  );

  return (
    <ModalTemplate title="Send comment" open={true} loading={loading} cancel={cancel} confirm={invite}>
      <SendComment ref={componentRef} />
    </ModalTemplate>
  );
};
