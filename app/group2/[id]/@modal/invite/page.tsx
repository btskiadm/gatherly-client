"use client";

import { InviteMember, InviteMemberRef } from "@/app/common/components/InviteMember/InviteMember";
import { ModalTemplate } from "@/app/common/components/Modal/modal-template";
import { inviteUsersToGroupMutationFn } from "@/app/common/graphql/options/mutation/inviteUsersToGroupMutationFn";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function InviteUsersToGroupModalPage() {
  const { id }: { id: string } = useParams();
  const mutation = useMutation({
    mutationFn: inviteUsersToGroupMutationFn,
  });
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

        if (!data?.success) {
          toast.error("Validation error. Please check the form.");
          return;
        }

        setLoading(true);

        await mutation.mutateAsync(
          {
            groupId: id,
            userIds: data.data.inviteIds,
          },
          {
            onError: () => {
              toast.error("Internal server error. Please try again later.");
            },
            onSuccess: () => {
              toast.error("Invitation sent.");
            },
          }
        );

        setLoading(false);

        handleCancel();
      },
      text: "Invite",
    };
  }, [handleCancel, id]);

  const cancel = useMemo(
    () => ({
      onAction: handleCancel,
    }),
    [handleCancel]
  );

  return (
    <ModalTemplate title="Zaproś użytkowników do grupy" open={true} loading={loading} cancel={cancel} confirm={invite}>
      <InviteMember ref={inviteMemberRef} />
    </ModalTemplate>
  );
}
