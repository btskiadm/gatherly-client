"use client";

import { CssBaseline, alpha } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PropsWithChildren } from "react";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    background?: Partial<TypeBackground>;
  }

  interface TypeBackground {
    light: string;
  }
}

const customTheme: Parameters<typeof createTheme>[0] = {
  cssVariables: true,
  palette: {
    background: {
      default: grey[50],
      light: alpha(grey[50], 0.6),
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
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          },
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.mode !== "dark" ? theme.palette.background.default : null,
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
