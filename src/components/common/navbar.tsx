"use client";

import { useState } from "react";
import { 
  MenuIcon,
  BookOpenIcon,
  UserIcon,
  GraduationCap,
  ChevronDown,
  X,
  LogIn,
  LogOut,
  User,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import LangSelector from "./lang-selector";
import { useLocale, useTranslations } from "next-intl";
import { useAppStore } from "@/store/useStore";
import { ThemeToggle } from "./ThemeToggle";
import { useSession, signOut } from "next-auth/react";
import About from "@/components/pages/Home/About";

export const Navbar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const darkMode = useAppStore((state) => state.darkMode);
  const { data: session } = useSession();

  const navigationItems = [
    { label: t("Courses"), href: "/courses", Icon: BookOpenIcon },
    { label: t("About"), href: "/about", Icon: UserIcon },
    { label: t("Teachers"), href: "/teachers", Icon: GraduationCap },
  ];

  const userRole = session?.user?.role || "student";
  const dashboardPath = `/dashboard/${userRole}`;

  const goToLogin = () => {
    setIsMobileOpen(false);
    router.push(`/auth/login`);
  };

  const handleLogout = async () => {
    setIsMobileOpen(false);
    await signOut({ callbackUrl: `/${locale}` });
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 h-20",
      darkMode 
        ? "bg-slate-950/40 backdrop-blur-md border-b border-white/5" 
        : "bg-white/40 backdrop-blur-md border-b border-black/5"
    )}>
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        
        <div className="flex-1">
          <Link href="/" className={cn("text-2xl font-black tracking-tighter", darkMode ? "text-purple-400" : "text-purple-600")}>
            ETECH
          </Link>
        </div>

        <div className="items-center justify-center flex-[2] hidden gap-8 xl:flex">
          {navigationItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "flex items-center gap-2 font-bold transition-all hover:scale-105",
                pathname === item.href 
                  ? (darkMode ? "text-purple-400" : "text-purple-600") 
                  : (darkMode ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-black")
              )}
            >
              <item.Icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="items-center justify-end flex-1 hidden gap-3 xl:flex">
          <ThemeToggle />
          <div className="h-5 w-[1px] bg-gray-300 dark:bg-slate-800 mx-2" />
          <LangSelector />
          {session ? (
            <>
              <Button
                onClick={() => router.push(dashboardPath)}
                variant="ghost"
                className="px-4 font-bold hover:bg-purple-500/10"
              >
                <LayoutDashboard className="w-4 h-4 mr-2 text-purple-500" />
                {session.user?.name?.split(' ')[0] || t("Dashboard")}
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="px-4 font-bold text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t("Logout")}
              </Button>
            </>
          ) : (
            <Button
              onClick={goToLogin}
              className="px-6 ml-2 font-bold text-white bg-purple-600 shadow-lg rounded-3xl hover:bg-purple-700 shadow-purple-500/20"
            >
              {t("Sign-Up")}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4 xl:hidden">
          <ThemeToggle />
          
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-current">
                <MenuIcon className="w-7 h-7" />
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className={cn(
                "w-full sm:w-[350px] p-0 border-none", 
                darkMode ? "bg-slate-950 text-white" : "bg-white text-gray-900"
              )}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
                  <span className="text-2xl font-black text-purple-600">ETECH</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-full hover:bg-gray-100 dark:hover:bg-slate-900"
                  >
                    <X className="w-7 h-7" />
                  </Button>
                </div>

                <div className="flex-1 px-4 py-8 space-y-4">
                  {navigationItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all",
                        pathname === item.href 
                          ? "bg-purple-600 text-white shadow-md" 
                          : "hover:bg-gray-100 dark:hover:bg-slate-900"
                      )}
                    >
                      <item.Icon className="w-6 h-6" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="p-6 mt-auto space-y-4 border-t border-gray-100 dark:border-white/5">
                  <div className="flex items-center justify-center mb-2">
                    <LangSelector />
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {session ? (
                      <>
                        <Button 
                          onClick={() => {
                            setIsMobileOpen(false);
                            router.push(dashboardPath);
                          }}
                          className="w-full text-lg font-black text-white bg-purple-600 py-7 rounded-2xl hover:bg-purple-700"
                        >
                          <LayoutDashboard className="w-5 h-5 mr-2" />
                          {t("Dashboard")}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={handleLogout}
                          className="w-full font-bold text-red-500 border-2 py-7 rounded-2xl border-red-500/20"
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          {t("Logout")}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          onClick={goToLogin}
                          className="w-full text-lg font-black text-white bg-purple-600 py-7 rounded-2xl hover:bg-purple-700"
                        >
                          {t("Login")}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={goToLogin}
                          className="w-full font-bold border-2 py-7 rounded-2xl"
                        >
                          <LogIn className="w-5 h-5 mr-2" />
                          {t("Sign-Up")}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};