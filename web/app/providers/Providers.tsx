import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { SignInProvider } from "../common/components/Auth/SignIn/SignIn.provider";
import { SignUpProvider } from "../common/components/Auth/SignUp/SignUp.provider";
import { MUIThemeProvider } from "./MUIThemeProvider";

export const Providers = ({ children }: PropsWithChildren<{}>) => {
  return (
    <MUIThemeProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
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
      <SignInProvider>
        <SignUpProvider>{children}</SignUpProvider>
      </SignInProvider>
    </MUIThemeProvider>
  );
};
