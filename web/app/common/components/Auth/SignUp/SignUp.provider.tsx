"use client";

import { PropsWithChildren, createContext, lazy, useCallback, useContext, useMemo, useRef, useState } from "react";
import { SignInModule } from "../SignIn/SignIn.module";
// const LazySignInModule = lazy(() => require('../SignIn/SignIn.module') )

interface SignUpState {
  open: boolean;
}

interface SignUpDispatch {
  open: (open: boolean) => void;
}

const SignUpContextState = createContext<SignUpState>({ open: false });
const SignUpContextDispatch = createContext<SignUpDispatch>({
  open: () => {},
});

export const SignUpProvider = ({ children }: PropsWithChildren<{}>) => {
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
    <SignUpContextDispatch.Provider value={dispatch}>
      <SignUpContextState.Provider value={state}>
        {loaded.current && <SignInModule />}
        {children}
      </SignUpContextState.Provider>
    </SignUpContextDispatch.Provider>
  );
};

export const useSignUpState = () => {
  return useContext(SignUpContextState);
};

export const useSignUpDispatch = () => {
  return useContext(SignUpContextDispatch);
};
