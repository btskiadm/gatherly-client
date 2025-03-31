"use client";

import { ModalTemplate } from "@/app/common/components/Modal/modal-template";
import { SendComment, SendCommentRef } from "@/app/common/components/SendComment/SendComment";
import { addCommentMutationFn } from "@/app/common/graphql/options/mutation/addGroupCommentMutationFn";
import { AddGroupCommentInput, AddGroupCommentResponse, AppRole } from "@/app/model/model";
import { AddGroupCommentMutationVariables, GetGroupDetailsQuery } from "@/app/model/operations";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { create } from "mutative";
import { meQueryOptions } from "@/app/common/graphql/options/query/meQueryOptions";

export const AddGroupCommentModal = ({ groupId }: { groupId: string }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(meQueryOptions());

  const mutation = useMutation<
    Awaited<ReturnType<typeof addCommentMutationFn>>,
    Error,
    AddGroupCommentMutationVariables,
    {
      prevDetails: GetGroupDetailsQuery;
      newDetails: GetGroupDetailsQuery;
    } | null
  >({
    mutationFn: addCommentMutationFn,
    onMutate: (args) => {
      const prevDetails = queryClient.getQueryData<GetGroupDetailsQuery>(["GroupDetailsQuery", groupId]);

      if (!prevDetails) {
        console.warn("Cannot mutate group details because it does not exist.");
        return null;
      }

      const { me } = data;

      const newDetails = create(prevDetails, (draft) => {
        draft.getGroupDetails?.comments.push({
          id: "",
          content: args.addGroupCommentInput.content,
          rate: args.addGroupCommentInput.rate,
          createdAt: new Date(),
          user: {
            id: me?.id ?? "",
            email: me?.email ?? "",
            largePhoto: me?.largePhoto ?? "",
            smallPhoto: me?.smallPhoto ?? "",
            mediumPhoto: me?.mediumPhoto ?? "",
            username: me?.username ?? "",
            role: me?.role ?? AppRole.User,
            createdAt: me?.createdAt ?? "",
          },
        });
      });

      queryClient.setQueryData(["GroupDetailsQuery", groupId], newDetails);

      return {
        prevDetails,
        newDetails,
      };
    },
    onError: (error, variables, context) => {
      if (context?.prevDetails) {
        queryClient.setQueryData(["GroupDetailsQuery", groupId], context.prevDetails);
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["GroupDetailsQuery", groupId] });
    },
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
