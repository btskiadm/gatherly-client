"use client";

import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { SignInModule } from "./SignIn.module";

interface SignInState {
  open: boolean;
}

interface SignInDispatch {
  open: (open: boolean) => void;
}

const SignInContextState = createContext<SignInState>({ open: false });
const SignInContextDispatch = createContext<SignInDispatch>({
  open: () => {},
});

export const SignInProvider = ({ children }: PropsWithChildren<{}>) => {
  const loaded = useRef(false);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback((open: boolean) => {
    loaded.current = true;
    setOpen(open);
  }, []);

  const dispatch = useMemo(
    () => ({
      open: handleOpen,
    }),
    [handleOpen]
  );

  const state = useMemo(
    () => ({
      open,
    }),
    [open]
  );

  return (
    <SignInContextDispatch.Provider value={dispatch}>
      <SignInContextState.Provider value={state}>
        {loaded.current && <SignInModule />}
        {children}
      </SignInContextState.Provider>
    </SignInContextDispatch.Provider>
  );
};

export const useSignInState = () => {
  return useContext(SignInContextState);
};

export const useSignInDispatch = () => {
  return useContext(SignInContextDispatch);
};
