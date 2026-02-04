"use client";
import { Toaster } from "sonner";
import { useLocale } from "next-intl";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import "moment/dist/locale/ar";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { DirectionProvider } from "./ui/direction";
import moment from "moment";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale();
  const queryClient = getQueryClient();
  moment.locale(locale);
  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider dir={locale === "ar" ? "rtl" : "ltr"}>
        <NextTopLoader
          color="#37003C"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3.1}
          crawl
          showSpinner
          easing="ease"
          speed={200}
          shadow="0 0 10px #c470b2,0 0 5px #c470b2"
          template='<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
        />

        <Suspense>
          <Toaster closeButton richColors position="top-center" />
        </Suspense>
        {children}
      </DirectionProvider>
    </QueryClientProvider>
  );
};
export default Providers;
