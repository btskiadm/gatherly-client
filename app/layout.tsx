import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Poppins } from "next/font/google";
import { ApplicationNavBar } from "./common/components/ApplicationNavBar/ApplicationNavBar";
import { Providers } from "./providers/Providers";

const roboto = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={roboto.variable}
        style={{
          display: "flex",
          minWidth: 0,
          minHeight: "100vh",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          id="root"
          style={{
            display: "flex",
            flex: "1 1 0%",
            minWidth: 0,
            flexDirection: "column",
          }}
        >
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Providers>
              <ApplicationNavBar />
              {children}
              {modal}
            </Providers>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
