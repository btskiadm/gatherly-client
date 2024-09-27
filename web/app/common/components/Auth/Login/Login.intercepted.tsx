"use client";

import { delay } from "@/app/common/utils/delay";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Login, LoginData } from "./Login.component";
import { LoginModal } from "./Login.modal";

export const LoginIntercepted = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, []);

  const handleSubmit = useCallback(async (data: LoginData) => {
    setLoading(true);
    await delay(2000);
    setLoading(false);
    handleClose();
  }, []);

  return (
    <LoginModal open={true} onClose={handleClose}>
      <Login loading={loading} onSubmit={handleSubmit} />
    </LoginModal>
  );
};
