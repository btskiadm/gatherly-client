"use client";

import { CreateGroup, CreateGroupRef } from "@/app/common/components/Group/Create/create-group-component";
import { createGroupMutationFn } from "@/app/common/graphql/options/mutation/createGroupMutationFn";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export const CreateGroupPage = () => {
  const mutation = useMutation({
    mutationFn: createGroupMutationFn,
  });
  const ref = useRef<CreateGroupRef>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = useCallback(async () => {
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
  }, []);

  return (
    <>
      <CreateGroup ref={ref} />
      <LoadingButton loading={loading} variant="outlined" onClick={handleCreate}>
        Create
      </LoadingButton>
    </>
  );
};
