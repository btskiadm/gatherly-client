"use client";

import { SignUp, SignUpData } from "@/app/common/components/Auth/SignUp/sign-up-component";
import { delay } from "@/app/common/utils/delay";
import { useCallback, useState } from "react";

export const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: SignUpData) => {
    console.log("[debug]:", data);
    setLoading(true);
    await delay(2000);
    setLoading(false);
  }, []);

  return <SignUp loading={loading} onSubmit={handleSubmit} />;
};
