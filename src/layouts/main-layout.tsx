"use client";
import { Navbar } from "@/components/common/navbar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import { useLocale } from "next-intl";
import Footer from "@/components/common/footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <section
      className="min-h-svh bg-white dark:bg-zinc-900 max-w-screen transition-colors"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <Navbar />
      <main
        className={cn(
          "relative z-10 min-h-[70svh] transition-colors",
          // pathname !== "/" && "py-6 lg:py-9",
        )}
      >
        {children}
      </main>
      <Footer />
    </section>
  );
};

export default MainLayout;
