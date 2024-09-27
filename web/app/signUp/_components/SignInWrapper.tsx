"use client";

import { LoginData } from "@/app/common/components/Auth/Login/Login.component";
import { SignUp } from "@/app/common/components/Auth/SignUp/SignUp.component";
import { useSignUpDispatch } from "@/app/common/components/Auth/SignUp/SignUp.provider";
import { delay } from "@/app/common/utils/delay";
import { useCallback, useState } from "react";

export const SignInWrapper = () => {
  const { open } = useSignUpDispatch();
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

  return <SignUp loading={loading} onSubmit={handleSubmit} />;
};
