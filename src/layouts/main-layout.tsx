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
    <div
      className="min-h-svh bg-white dark:bg-zinc-900 max-w-screen transition-colors"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <Navbar />
      <main
        className={cn(
          "relative z-10 min-h-[70svh] transition-colors overflow-x-hidden",
          // pathname !== "/" && "py-6 lg:py-9",
        )}
      >
        {children}
      </main>
      <Footer />
      {/* 1. THE HIDDEN SVG FILTER */}
      <svg className="hidden">
        <filter id="liquid-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
        </filter>
      </svg>
    </div>
  );
};

export default MainLayout;
