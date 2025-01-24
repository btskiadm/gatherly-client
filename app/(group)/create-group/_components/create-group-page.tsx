"use client";

import { CreateGroup, CreateGroupRef } from "@/app/common/components/Group/Create/create-group-component";
import { delay } from "@/app/common/utils/delay";
import { LoadingButton } from "@mui/lab";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export const CreateGroupPageContainer = () => {
  const ref = useRef<CreateGroupRef>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = useCallback(async () => {
    const data = ref.current?.save();

    if (!data?.success) {
      toast.error("Group validation error. Please check a form.");
      return;
    }

    setLoading(true);
    await delay(2000);
    setLoading(false);
    toast.success("Group created successfully.");
  }, []);

  return (
    <>
      <CreateGroup />
      <LoadingButton loading={loading} variant="outlined" onClick={handleCreate}>
        Create
      </LoadingButton>
    </>
  );
};
