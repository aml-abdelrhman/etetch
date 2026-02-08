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

const LangSelector = ({ className }: { className?: string }) => {
  const defaultLocale = useLocale();
  const [locale, setLocale] = useState(defaultLocale || "ar");

  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (language: string) => {
    setLocale(language);
    console.log(language);
    console.log(defaultLocale);
    router.push(pathname, { locale: language });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button
          variant="ghost"
          className="text-white"
          startContent={<ChevronDownIcon className="size-6" />}
        >
          <span className="font-medium text-base">
            {locale === "en" ? "EN" : "ع"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="center">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleLanguageChange}
        >
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ar">العربية</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSelector;
