"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast/headless";
import { InviteMemberModal } from "./InviteMember.modal";
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
      onInvite: async () => {
        const data = inviteMemberRef.current?.invite();

        if (!data?.success) {
          toast.error("Validation error. Please check the form.");
          return;
        }

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
    <InviteMemberModal open={true} loading={loading} cancel={cancel} invite={invite}>
      <InviteMember ref={inviteMemberRef} />
    </InviteMemberModal>
  );
};
