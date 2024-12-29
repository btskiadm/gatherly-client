"use client";

import { useLoginDispatch } from "@/app/common/components/Auth/Login/Login.provider";
import { SignUp, SignUpData } from "@/app/common/components/Auth/SignUp/SignUp.component";
import { delay } from "@/app/common/utils/delay";
import { useCallback, useState } from "react";

export const SignUpPage = () => {
  const { open } = useLoginDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      console.log("[debug]:", data);
      setLoading(true);
      await delay(2000);
      setLoading(false);
      handleClose();
    },
    [handleClose]
  );

  return <SignUp loading={loading} onSubmit={handleSubmit} />;
};
