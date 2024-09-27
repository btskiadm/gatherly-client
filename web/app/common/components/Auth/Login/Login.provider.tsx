"use client";

import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { LoginModule } from "./Login.module";

interface LoginState {
  open: boolean;
}

interface LoginDispatch {
  open: (open: boolean) => void;
}

const LoginContextState = createContext<LoginState>({ open: false });
const LoginContextDispatch = createContext<LoginDispatch>({
  open: () => {},
});

export const LoginProvider = ({ children }: PropsWithChildren<{}>) => {
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
    <LoginContextDispatch.Provider value={dispatch}>
      <LoginContextState.Provider value={state}>
        {loaded.current && <LoginModule />}
        {children}
      </LoginContextState.Provider>
    </LoginContextDispatch.Provider>
  );
};

export const useLoginState = () => {
  return useContext(LoginContextState);
};

export const useLoginDispatch = () => {
  return useContext(LoginContextDispatch);
};
