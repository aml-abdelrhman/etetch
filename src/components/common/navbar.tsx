"use client";
import { useState } from "react";
import {
  BrainIcon,
  Building2Icon,
  CalendarIcon,
  HomeIcon,
  LandmarkIcon,
  MapIcon,
  MenuIcon,
  NewspaperIcon,
  ProjectorIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LangSelector from "./lang-selector";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/routing";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/projects?term=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const navigationItems = [
    { label: t("Home"), href: "/", Icon: HomeIcon },
    { label: t("Projects"), href: "/projects", Icon: ProjectorIcon },
    { label: t("Buy on the map"), href: "/buy-on-the-map", Icon: MapIcon },
    // { label: t("Land"), href: "/land", Icon: LandmarkIcon },
    // { label: t("Events"), href: "/events", Icon: CalendarIcon },
    { label: t("Developers"), href: "/developers", Icon: Building2Icon },
    { label: t("Methodology"), href: "/methodology", Icon: BrainIcon },
    { label: t("Employment"), href: "/employment", Icon: UsersIcon },
    { label: t("News"), href: "/news", Icon: NewspaperIcon },
  ];
  return (
    <nav className="flex w-[93%] xl:w-full container items-center justify-between px-4 fixed top-7 xl:top-11 left-0 right-0 z-50 max-xl:glass-bg h-20 xl:h-auto rounded-2xl">
      <Link href="/">
        <Image
          width={179.64}
          height={60}
          alt="logo"
          quality={100}
          className="w-full h-auto max-w-40 max-xl:max-w-26"
          src="/logo.svg"
        />
      </Link>
      <div className="inline-flex h-15 sm:h-20 items-center justify-center gap-[71px] xl:p-7.5 rounded-3xl xl:glass-bg">
        <div className="inline-flex items-center gap-6">
          <div className="items-center gap-6 hidden xl:flex">
            {navigationItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={cn(
                  "font-light relative",
                  pathname === item.href
                    ? "text-white"
                    : "text-white/70 hover:text-white!",
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <Image
                    className="absolute right-0 top-10 w-[57px] h-[13px] pointer-events-none"
                    alt="Vector"
                    src="/vector-839.svg"
                    width={57}
                    height={13}
                  />
                )}
              </Link>
            ))}
          </div>
          <div className="h-8 w-[2px] bg-white/50 rounded-full max-xl:hidden" />
          <LangSelector className="max-xl:hidden" />

          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 p-0 hover:bg-transparent"
                aria-label="Search"
                title="search"
              >
                <SearchIcon className="size-6 text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("Search")}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <Input
                  placeholder={t("Search for projects...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <Button type="submit" className="w-full">
                  {t("Search")}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 p-0 hover:bg-transparent xl:hidden"
                aria-label="Menu"
                title="Menu"
              >
                <MenuIcon className="size-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full bg-main-50">
              <SheetHeader>
                <SheetTitle className="bg-primary p-2 rounded-2xl mt-5">
                  <Image
                    width={179.64}
                    height={60}
                    alt="logo"
                    quality={100}
                    className="w-32 h-auto"
                    src="/logo.svg"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3 mt-10 container relative z-10">
                <Image
                  src="/section-bg-caramel.svg"
                  alt="section-bg-caramel"
                  className="absolute bottom-0 end-0 z-3 w-full h-full rotate-90 pointer-events-none"
                  width={799}
                  height={387}
                />
                {navigationItems.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 font-medium text-lg w-full p-2 relative z-10",
                      pathname === item.href
                        ? "text-white bg-primary rounded-xl"
                        : "hover:text-primary",
                    )}
                  >
                    <item.Icon
                      className={cn(
                        "size-6 text-primary",
                        pathname === item.href ? "text-white" : "",
                      )}
                    />
                    {item.label}
                  </Link>
                ))}
                <div className="h-[2px] rounded-full w-full bg-main-900/20 mt-4" />
                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium">
                    {t("Language")}
                  </span>
                  <LangSelector className="text-primary!" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
