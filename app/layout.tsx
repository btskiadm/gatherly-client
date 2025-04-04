import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import localFont from "next/font/local";
import { ApplicationNavBar } from "./common/components/ApplicationNavBar/ApplicationNavBar";
import { Providers } from "./providers/Providers";

const NoirPro = localFont({
  display: "swap",
  adjustFontFallback: "Arial",
  src: [
    {
      path: "public/fonts/NoirPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "public/fonts/NoirPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "public/fonts/NoirPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "public/fonts/NoirPro-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "public/fonts/NoirPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "public/fonts/NoirPro-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
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
        className={NoirPro.className}
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
