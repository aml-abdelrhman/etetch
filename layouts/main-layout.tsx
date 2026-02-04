"use client";
import { Navbar } from "@/components/common/navbar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div
      className="min-h-svh bg-white dark:bg-zinc-900 font-nunito max-w-screen transition-colors"
      dir="auto"
    >
      <Navbar />
      <div
        className={cn(
          "relative z-10 min-h-[70svh] transition-colors",
          pathname !== "/" && "py-6 lg:py-9",
        )}
      >
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
