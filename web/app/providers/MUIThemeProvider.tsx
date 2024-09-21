"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "@fontsource/poppins";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "1.75rem",
    },
    h5: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.25rem",
    },
  },
});

export const MUIThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
