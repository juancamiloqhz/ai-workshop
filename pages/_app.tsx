import type { AppProps } from "next/app";
import { Inter as FontSans } from "@next/font/google";
import localFont from "@next/font/local";
import { Analytics } from "@vercel/analytics/react";
import cx from "clsx";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Provider as RWBProvider } from "react-wrap-balancer";

import "@/styles/globals.css";

const clash = localFont({
  src: "../styles/ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  // display: "swap",
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
          --font-clash: ${clash.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RWBProvider>
            <Component {...pageProps} />
          </RWBProvider>
          <Analytics />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
