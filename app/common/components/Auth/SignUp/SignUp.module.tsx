"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { delay } from "../../../utils/delay";
import { SignUp, SignUpData } from "./SignUp.component";
import { SignUpModal } from "./SignUp.modal";
import { useSignUpDispatch, useSignUpState } from "./SignUp.provider";

export const SignUpModule = () => {
  const { open: openState } = useSignUpState();
  const { open } = useSignUpDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

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
    <SignUpModal open={openState} onClose={handleClose}>
      <SignUp loading={loading} onSubmit={handleSubmit} />
    </SignUpModal>
  );
};
