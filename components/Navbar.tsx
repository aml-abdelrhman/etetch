"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FilesIcon } from "@/icons";
import Image from "next/image";
import { useStore } from "@/store";
import UserDropDown from "./UserDropDown";

const Navbar = () => {
  const { user } = useStore((store) => store);
  const pathname = usePathname();

  if (pathname.includes("auth")) {
    return null;
  }

  const navLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/programs", label: "البرامج" },
    ...(!user || user?.guard === "user"
      ? [{ path: "/documents", label: "الوثائق" }]
      : []),
    { path: "/calendars", label: "الفاعليات" },
    { path: "/associations", label: "الجمعيات" },
    ...(!user || user?.guard === "user"
      ? [{ path: "/favorites", label: "المفضلة" }]
      : []),
  ].filter(Boolean);

  return (
    <nav className="container relative">
      <div
        className={cn(
          "max-w-[96%] transition-all text-black/60 duration-300 mx-auto container w-full px-6 pb-5 lg:pb-7 pt-3 flex items-center justify-between",
          pathname === "/" &&
            "absolute top-0 z-50 bg-transparent text-white border-b border-b-zinc-400"
        )}
      >
        <div className="flex items-center gap-x-8">
          <Link
            href="/"
            className={cn(
              "block",
              pathname === "/" && "bg-white/80 z-[15] px-3 py-1.5 rounded-full"
            )}
          >
            <Image
              width={72}
              height={50}
              alt="Logo"
              src="/logo.svg"
              className={cn("max-w-20 w-full h-full")}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-6">
            {navLinks.map((link, index) => (
              <React.Fragment key={index}>
                <Link
                  key={link.label}
                  href={link.path}
                  className={cn(
                    "text-lg hover:bg-secondary-800/10 rounded-xl px-3 hover: py-1.5 hover:text-secondary-800 transition-colors",
                    link?.path === pathname &&
                      pathname === "/" &&
                      "text-white font-semibold bg-main-600/20",
                    link?.path === pathname &&
                      pathname !== "/" &&
                      "text-secondary-800 font-semibold bg-secondary-800/10"
                  )}
                >
                  {link.label}
                </Link>
                {index + 1 !== navLinks.length && pathname !== "/" && (
                  <div className="w-px h-6 bg-zinc-200 max-lg:hidden" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Mobile Navigation Trigger */}
        <div className="xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-zinc-100 transition-colors duration-200 rounded-lg"
              >
                <MenuIcon
                  className={cn(
                    "h-6 w-6 text-zinc-700",
                    pathname === "/" && "text-zinc-300"
                  )}
                />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="min-w-[320px] bg-gradient-to-b from-white to-zinc-50 text-black border-l border-zinc-200 shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <SheetHeader className="border-b border-zinc-200 mb-6">
                  <h2
                    className="text-xl font-semibold text-zinc-800 text-right"
                    dir="rtl"
                  >
                    القائمة الرئيسية
                  </h2>
                </SheetHeader>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.path}
                      className={cn(
                        "group relative px-4 py-3 text-lg font-medium text-zinc-700 hover:text-secondary-600 hover:bg-zinc-100 rounded-lg transition-all duration-200 transform hover:translate-x-1",
                        link?.path === pathname && "text-secondary-800"
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
                    </Link>
                  ))}
                </nav>

                {/* User Section */}
                <div className="border-t border-zinc-200 pt-5 mt-auto pb-2">
                  {user ? (
                    <div className="px-4">
                      <UserDropDown />
                    </div>
                  ) : (
                    <div className="px-4" dir="rtl">
                      <Link href="/auth/login" className="block">
                        <Button className="w-full h-[52px] bg-gradient-to-r from-[#7052a3] to-[#8b5fbf] hover:from-[#5d4489] hover:to-[#7052a3] text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          <span className="text-base">سجل دخولك</span>
                          <FilesIcon className="size-5 text-white" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden xl:flex items-center gap-5">
          {/* <Button className="w-[180px] h-[52px] bg-main-600 rounded-xl flex items-center justify-center gap-2">
            <div className=" font-bold text-white text-sm text-center [direction:rtl]">
              تبرع ألأن
            </div>
            <HandHeartIcon className="size-5 text-white" />
          </Button> */}
          {user ? (
            <UserDropDown />
          ) : (
            <Link
              href="/auth/login"
              className=" font-bold text-white text-sm text-center [direction:rtl]"
            >
              <Button className="w-[180px] h-[52px] bg-[#7052a3] rounded-xl flex items-center justify-center gap-2">
                سجل&nbsp;&nbsp;دخولك
                <FilesIcon className="size-6 text-white" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
