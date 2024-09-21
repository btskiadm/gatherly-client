import { PropsWithChildren } from "react";
import { MUIThemeProvider } from "./MUIThemeProvider";

export const Providers = ({ children }: PropsWithChildren<{}>) => {
  return <MUIThemeProvider>{children}</MUIThemeProvider>;
};
