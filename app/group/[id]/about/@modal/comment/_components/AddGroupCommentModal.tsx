"use client";

import { ModalTemplate } from "@/app/common/components/Modal/modal-template";
import { SendComment, SendCommentRef } from "@/app/common/components/SendComment/SendComment";
import { addCommentMutationFn } from "@/app/common/graphql/options/mutation/addGroupCommentMutationFn";
import { getGroupCommentsQueryKey } from "@/app/common/graphql/options/query/getGroupCommentsQueryOptions";
import { meQueryOptions } from "@/app/common/graphql/options/query/meQueryOptions";
import { AccountStatus, AppRole } from "@/app/model/model";
import { AddGroupCommentMutationVariables, GetGroupCommentsQuery, GetGroupDetailsQuery } from "@/app/model/operations";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { create } from "mutative";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export const AddGroupCommentModal = ({ groupId }: { groupId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const componentRef = useRef<SendCommentRef>(null);
  const [loading, setLoading] = useState(false);
  const { data } = useSuspenseQuery(meQueryOptions());

  const mutation = useMutation<
    Awaited<ReturnType<typeof addCommentMutationFn>>,
    Error,
    AddGroupCommentMutationVariables,
    {
      prevComments: GetGroupDetailsQuery;
      newComments: GetGroupDetailsQuery;
    } | null
  >({
    mutationFn: addCommentMutationFn,
    onMutate: (args) => {
      const prevComments = queryClient.getQueryData<GetGroupCommentsQuery>(getGroupCommentsQueryKey(groupId, 0, 10));

      if (!prevComments) {
        console.warn("Cannot mutate group comments because query data does not exist.");
        return null;
      }

      const { me } = data;

      const newComments = create(prevComments, (draft) => {
        draft.getGroupComments?.comments.unshift({
          id: "",
          content: args.addGroupCommentInput.content,
          rate: args.addGroupCommentInput.rate,
          createdAt: new Date(),
          user: {
            id: me?.id ?? "",
            status: me?.status ?? AccountStatus.Active,
            email: me?.email ?? "",
            largePhoto: me?.largePhoto ?? "",
            smallPhoto: me?.smallPhoto ?? "",
            mediumPhoto: me?.mediumPhoto ?? "",
            username: me?.username ?? "",
            role: me?.role ?? AppRole.User,
            createdAt: me?.createdAt ?? "",
          },
        });
        draft.getGroupComments?.comments.slice(0, 10);
      });

      queryClient.setQueryData(getGroupCommentsQueryKey(groupId, 0, 10), newComments);

      return {
        prevComments,
        newComments,
      };
    },
    onError: (error, variables, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(getGroupCommentsQueryKey(groupId, 0, 10), context.prevComments);
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: getGroupCommentsQueryKey(groupId, 0, 10) });
    },
  });

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
              toast.success("Nowa opinia została dodana.");
            },
            onError: () => {
              toast.error("Błąd serwera. Proszę, spróbuj ponownie później.");
            },
          }
        );

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
    <ModalTemplate title="Send comment" open={true} loading={mutation.isPending} cancel={cancel} confirm={send}>
      <SendComment ref={componentRef} />
    </ModalTemplate>
  );
};
