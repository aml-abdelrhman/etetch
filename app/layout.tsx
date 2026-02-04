import React from "react";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <SessionProvider>
            {children}
            <Analytics />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
