"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast/headless";
import { CreateGroup, CreateGroupRef } from "./CreateGroup.component";
import { CreateGroupModal } from "./CreateGroup.modal";

export const CreateGroupIntercepted = () => {
  const ref = useRef<CreateGroupRef>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleCreate = useCallback(async () => {
    const data = ref.current?.save();
    setLoading(true);
    await delay(2000);
    setLoading(false);

    if (data?.success) {
      toast.success("Group created successfully.");
      router.back();
    } else {
      toast.error("Group validation error. Please check a form.");
    }
  }, [router]);

  const handleReset = useCallback(() => {
    ref.current?.reset();
  }, []);

  return (
    <CreateGroupModal open={true} loading={loading} onClose={handleClose} onCreate={handleCreate} onReset={handleReset}>
      <CreateGroup ref={ref} />
    </CreateGroupModal>
  );
};
