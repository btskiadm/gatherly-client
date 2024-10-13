"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ModalTemplate } from "../../Modal/ModalTemplate";
import { CreateGroup, CreateGroupRef } from "./CreateGroup.component";

export const CreateGroupIntercepted = () => {
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
        await delay(2000);
        setLoading(false);
        toast.success("Group created successfully.");
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
