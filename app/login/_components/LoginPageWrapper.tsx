"use client";

import { Login, LoginData } from "@/app/common/components/Auth/Login/Login.component";
import { useLoginDispatch } from "@/app/common/components/Auth/Login/Login.provider";
import { delay } from "@/app/common/utils/delay";
import { useCallback, useState } from "react";

export const LoginPageWrapper = () => {
  const { open } = useLoginDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    open(false);
  }, []);

  const handleSubmit = useCallback(async (data: LoginData) => {
    setLoading(true);
    await delay(2000);
    setLoading(false);
    handleClose();
  }, []);

  return <Login loading={loading} onSubmit={handleSubmit} />;
};
