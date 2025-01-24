"use client";

import { Login, LoginData } from "@/app/common/components/Auth/Login/login-component";
import { delay } from "@/app/common/utils/delay";
import { useCallback, useState } from "react";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: LoginData) => {
    setLoading(true);
    await delay(2000);
    setLoading(false);
  }, []);

  return <Login loading={loading} onSubmit={handleSubmit} />;
};
