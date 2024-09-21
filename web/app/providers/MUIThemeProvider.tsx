"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  cssVariables: true,
  palette: {
    background: {
      default: "#eeeeee",
    },
  },
  typography: {
    fontFamily: "var(--font-poppins)",
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
  components: {
    MuiCssBaseline: {
      styleOverrides: (_theme) => ({
        body: {
          backgroundColor: _theme.palette.mode !== "dark" ? _theme.palette.background.default : null,
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
      }),
    },
  },
});

export const MUIThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AppRouterCacheProvider options={{ key: "css", enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
