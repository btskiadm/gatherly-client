"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ModalTemplate } from "../Modal/ModalTemplate";
import { InviteMember, InviteMemberRef } from "./_components/InviteMember.components";

export const InviteMemberIntercepted = () => {
  const [loading, setLoading] = useState(false);
  const inviteMemberRef = useRef<InviteMemberRef>(null);
  const router = useRouter();

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const invite = useMemo(() => {
    return {
      onAction: async () => {
        const data = inviteMemberRef.current?.invite();
        console.log("[debug]: ", data);

        if (!data?.success) {
          toast.error("Validation error. Please check the form.");
          return;
        }

        setLoading(true);
        await delay(2000);
        setLoading(false);
        toast.success("Invitaion sent.");
        handleCancel();
      },
      text: "Invite",
    };
  }, [handleCancel]);

  const cancel = useMemo(
    () => ({
      onAction: handleCancel,
    }),
    [handleCancel]
  );

  return (
    <ModalTemplate title="Invite members" open={true} loading={loading} cancel={cancel} confirm={invite}>
      <InviteMember ref={inviteMemberRef} />
    </ModalTemplate>
  );
};
