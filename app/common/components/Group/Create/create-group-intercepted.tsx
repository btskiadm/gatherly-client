"use client";

import { createGroupMutationFn } from "@/app/common/graphql/options/mutation/createGroupMutationFn";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ModalTemplate } from "../../Modal/modal-template";
import { CreateGroup, CreateGroupRef } from "./create-group-component";

export const CreateGroupIntercepted = () => {
  const mutation = useMutation({
    mutationFn: createGroupMutationFn,
  });
  const ref = useRef<CreateGroupRef>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const cancel = useMemo(() => {
    return {
      onAction: handleClose,
    };
  }, [handleClose]);

  const create = useMemo(() => {
    return {
      onAction: async () => {
        const data = ref.current?.save();

        if (!data?.success) {
          toast.error("Group validation error. Please check a form.");
          return;
        }

        setLoading(true);
        await mutation.mutateAsync(
          {
            createGroupInput: {
              title: data.data.name,
              description: data.data.description,
              remote: data.data.remote,
              categories: data.data.categories,
              cities: [data.data.city],
            },
          },
          {
            onSuccess: () => {
              toast.success("Group created successfully.");
            },
            onError: () => {
              toast.success("Internal server error. Please try again later.");
            },
          }
        );
        setLoading(false);
        router.back();
      },
      text: "Create",
    };
  }, [router]);

  const reset = useMemo(
    () => ({
      onAction: () => ref.current?.reset(),
      text: "Reset",
    }),
    []
  );

  return (
    <ModalTemplate
      title="Create a new group"
      open={true}
      loading={loading}
      reset={reset}
      cancel={cancel}
      confirm={create}
    >
      <CreateGroup ref={ref} />
    </ModalTemplate>
  );
};
