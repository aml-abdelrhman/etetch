import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import LangSelector from "./lang-selector";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";

export const Navbar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const navigationItems = [
    { label: t("Home"), href: "/" },
    { label: t("Projects"), href: "/projects" },
    { label: t("Buy on the map"), href: "/projects" },
    { label: t("Land"), href: "/projects" },
    { label: t("Events"), href: "/projects" },
    { label: t("Developers"), href: "/projects" },
    { label: t("Methodology"), href: "/projects" },
    { label: t("Employment"), href: "/projects" },
  ];
  return (
    <nav className="flex w-full container items-center justify-between px-4 absolute top-[5%]! left-0 right-0 z-50 max-xl:glass-bg">
      <Image
        width={179.64}
        height={60}
        alt="logo"
        className="w-full h-auto max-w-40 max-xl:max-w-26"
        src="/logo.svg"
      />
      <div className="inline-flex h-15 sm:h-20 items-center justify-center gap-[71px] p-7.5 rounded-3xl glass-bg">
        <div className="inline-flex items-center gap-6">
          <div className="items-center gap-6 hidden xl:flex">
            {navigationItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={cn(
                  "p-0 h-auto font-medium text-base relative",
                  pathname === item.href ? "text-white" : "text-[#ffffffb2] hover:text-white",
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <img
                    className="absolute right-0 top-9.5 w-[57px] h-[13px] pointer-events-none"
                    alt="Vector"
                    src="/vector-839.svg"
                  />
                )}
              </Link>
            ))}
          </div>
          <LangSelector />
          <Button
            variant="ghost"
            size="icon"
            className="size-6 p-0 hover:bg-transparent"
          >
            <SearchIcon className="size-6 text-white" />
          </Button>
          <Separator
            orientation="vertical"
            className="h-8 w-[1.6px] bg-white"
          />
        </div>
      </div>
    </nav>
  );
};
