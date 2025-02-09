"use client";

import { ModalTemplate } from "@/app/common/components/Modal/modal-template";
import { SendComment, SendCommentRef } from "@/app/common/components/SendComment/SendComment";
import { addCommentMutationFn } from "@/app/common/graphql/options/mutation/addGroupCommentMutationFn";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export const AddGroupCommentModal = ({ groupId }: { groupId: string }) => {
  const [loading, setLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: addCommentMutationFn,
  });
  const componentRef = useRef<SendCommentRef>(null);
  const router = useRouter();

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const send = useMemo(() => {
    return {
      onAction: async () => {
        const data = componentRef.current?.send();

        if (!data?.isValid) {
          toast.error("Validation error. Please check the form.");
          return;
        }

        setLoading(true);
        await mutation.mutateAsync(
          {
            groupId: groupId,
            addGroupCommentInput: {
              content: data.data.comment,
              rate: data.data.rate,
            },
          },
          {
            onSuccess: () => {
              toast.success("Comment added.");
            },
            onError: () => {
              toast.error("Internal error. Please try again later");
            },
          }
        );

        setLoading(false);
        handleCancel();
      },
      text: "Send",
    };
  }, [groupId, handleCancel]);

  const cancel = useMemo(
    () => ({
      onAction: handleCancel,
    }),
    [handleCancel]
  );

  return (
    <ModalTemplate title="Send comment" open={true} loading={loading} cancel={cancel} confirm={send}>
      <SendComment ref={componentRef} />
    </ModalTemplate>
  );
};
