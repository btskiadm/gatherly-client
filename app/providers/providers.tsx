"use client";

import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { MUIThemeProvider } from "./MUIThemeProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

export const Providers = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ReactQueryProvider>
      <MUIThemeProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
          }}
        />
        {children}
      </MUIThemeProvider>
    </ReactQueryProvider>
  );
};
