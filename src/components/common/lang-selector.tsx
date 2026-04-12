"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LangSelectorProps {
  className?: string;
  darkMode?: boolean; // optional prop to get darkMode from parent
}

const LangSelector = ({ className, darkMode = false }: LangSelectorProps) => {
  const defaultLocale = useLocale();
  const [locale, setLocale] = useState(defaultLocale || "ar");

  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (language: string) => {
    setLocale(language);
    router.push(pathname, { locale: language });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center justify-between gap-1 px-3 py-2 rounded-3xl font-medium transition-colors text-base",
            darkMode
              ? "bg-purple-700 text-white hover:bg-purple-600 border border-white/20"
              : "bg-gray-100 text-purple-600 border border-purple-600 hover:bg-purple-100"
          )}
          startContent={<ChevronDownIcon className={cn("w-4 h-4", darkMode ? "text-white" : "text-purple-600")} />}
        >
          {locale === "en" ? "EN" : "ع"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          "w-24 py-1 rounded-md shadow-lg transition-colors",
          darkMode ? "bg-purple-800 text-white" : "bg-white text-purple-600"
        )}
        align="center"
      >
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleLanguageChange}
        >
          <DropdownMenuRadioItem
            value="en"
            className={cn(
              "px-3 py-1 rounded-3xl cursor-pointer transition-colors hover:bg-purple-600 hover:text-white",
              darkMode ? "hover:bg-purple-600 hover:text-white" : "hover:bg-purple-100"
            )}
          >
            English
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="ar"
            className={cn(
              "px-3 py-1 rounded-md cursor-pointer transition-colors hover:bg-purple-600 hover:text-white",
              darkMode ? "hover:bg-purple-600 hover:text-white" : "hover:bg-purple-100"
            )}
          >
            العربية
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSelector;