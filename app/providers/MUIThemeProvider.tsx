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
    appBar: string;
  }

  interface TypographyVariants {
    body3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: unknown; // fix variant issue is Typography component
  }
}

const customTheme: Parameters<typeof createTheme>[0] = {
  shape: {
    borderRadius: 12,
  },
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    cssVarPrefix: "", // remote mui prefix
    colorSchemeSelector: ".theme-%s",
  },
  palette: {
    background: {
      appBar: "rgb(245, 247, 250)", // rgb(34, 45, 69);
      default: "rgb(245, 247, 250)", // rgb(25, 36, 59);
      light: alpha(grey[50], 0.6),
    },
  },
  typography: {
    fontFamily: "var(--font-poppins)",
    h1: {
      fontSize: "1.25rem",
    },
    h2: {
      fontSize: "1.25rem",
    },
    h3: {
      fontSize: "1.25rem",
    },
    h4: {
      fontSize: "1.25rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    body3: {
      fontSize: "0.75rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation: ({ theme }) => ({
          position: "relative",
          borderRadius: theme.shape.borderRadius,
          boxShadow: "rgba(0, 0, 0, 0.086) 0px 5px 10px",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }),
        elevation1: ({ theme }) => ({
          position: "relative",
          borderRadius: theme.shape.borderRadius,
          boxShadow: "rgba(115, 82, 199, 0.176) 0px 0.5rem 1.25rem",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }),
      },
    },
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
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.background.appBar,
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
