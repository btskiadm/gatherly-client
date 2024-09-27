"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SignUp, SignUpData } from "./SignUp.component";
import { SignUpModal } from "./SignUp.modal";

export const SignUpIntercepted = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      setLoading(true);
      await delay(2000);
      setLoading(false);
      handleClose();
    },
    [handleClose]
  );

  return (
    <SignUpModal open={true} onClose={handleClose}>
      <SignUp loading={loading} onSubmit={handleSubmit} />
    </SignUpModal>
  );
};
