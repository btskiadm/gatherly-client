"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ReportModal } from "./Report.modal";
import { Report, ReportRef } from "./_components/Report.components";

export const ReportIntercepted = () => {
  const [loading, setLoading] = useState(false);
  const inviteMemberRef = useRef<ReportRef>(null);
  const router = useRouter();

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const confirm = useMemo(() => {
    return {
      text: "Send",
      onConfirm: async () => {
        const data = inviteMemberRef.current?.handleData();

        if (!data?.success) {
          toast.error("Validation error. Please check the form.");
          return;
        }

        setLoading(true);
        await delay(2000);
        setLoading(false);
        toast.success("Report sent.");
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
    <ReportModal open={true} loading={loading} cancel={cancel} confirm={confirm}>
      <Report ref={inviteMemberRef} />
    </ReportModal>
  );
};
