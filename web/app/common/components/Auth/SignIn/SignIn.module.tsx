"use client";

import { delay } from "@/app/common/utils/delay";
import { useCallback, useState } from "react";
import { SignIn, SignInData } from "./SignIn";
import { SignInModal } from "./SignIn.modal";
import { useSignInDispatch, useSignInState } from "./SignIn.provider";

export const SignInModule = () => {
  const { open: openState } = useSignInState();
  const { open } = useSignInDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    open(false);
  }, []);

  const handleSubmit = useCallback(async (data: SignInData) => {
    setLoading(true);
    await delay(2000);
    setLoading(false);
    handleClose();
  }, []);

  return (
    <SignInModal open={openState} onClose={handleClose}>
      <SignIn loading={loading} onSubmit={handleSubmit} />
    </SignInModal>
  );
};
