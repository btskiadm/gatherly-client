"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Login, LoginData } from "./Login.component";
import { LoginModal } from "./Login.modal";
import { useLoginDispatch, useLoginState } from "./Login.provider";

export const LoginModule = () => {
  const { open: openState } = useLoginState();
  const { open } = useLoginDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleSubmit = useCallback(
    async (data: LoginData) => {
      setLoading(true);
      await delay(2000);
      setLoading(false);
      handleClose();
    },
    [handleClose]
  );

  return (
    <LoginModal open={openState} onClose={handleClose}>
      <Login loading={loading} onSubmit={handleSubmit} />
    </LoginModal>
  );
};
