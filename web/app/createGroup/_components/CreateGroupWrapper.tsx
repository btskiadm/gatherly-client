"use client";

import { CreateGroup, CreateGroupRef } from "@/app/common/components/Group/Create/CreateGroup.component";
import { delay } from "@/app/common/utils/delay";
import { LoadingButton } from "@mui/lab";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export const CreateGroupWrapper = () => {
  const ref = useRef<CreateGroupRef>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = useCallback(async () => {
    const data = ref.current?.save();
    setLoading(true);
    await delay(2000);
    setLoading(false);

    if (data?.success) {
      toast.success("Group created successfully.");
    } else {
      toast.error("Group validation error. Please check a form.");
    }
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
