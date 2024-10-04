"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";

const customTheme: Parameters<typeof createTheme>[0] = {
  cssVariables: true,
  palette: {
    background: {
      default: grey[50],
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
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
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
};

const theme = createTheme(customTheme);

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
