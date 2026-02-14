"use client";
import { Toaster } from "sonner";
import { useLocale } from "next-intl";
import { Suspense } from "react";
import "moment/locale/ar";
import "moment/dist/locale/ar";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { DirectionProvider } from "./ui/direction";
import moment from "moment";
moment.locale("ar");

const Providers = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale();
  const queryClient = getQueryClient();
  moment.locale(locale);

  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider
        dir={locale === "ar" ? "rtl" : "ltr"}
        direction={locale === "ar" ? "rtl" : "ltr"}
      >
        <Suspense>
          <Toaster closeButton richColors position="top-center" />
        </Suspense>
        {children}
      </DirectionProvider>
    </QueryClientProvider>
  );
};
export default Providers;
