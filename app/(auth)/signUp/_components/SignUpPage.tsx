"use client";

import { Login, LoginData } from "@/app/common/components/Auth/Login/Login.component";
import { useLoginDispatch } from "@/app/common/components/Auth/Login/Login.provider";
import { delay } from "@/app/common/utils/delay";
import { useCallback, useState } from "react";

export const SignUpPage = () => {
  const { open } = useLoginDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleSubmit = useCallback(
    async (data: LoginData) => {
      //todo: api
      setLoading(true);
      await delay(2000);
      setLoading(false);
      handleClose();
    },
    [handleClose]
  );

  return <Login loading={loading} onSubmit={handleSubmit} />;
};
