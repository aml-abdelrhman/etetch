import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import LangSelector from "./lang-selector";
import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "الرئيسية", active: true },
  { label: "مشاريع", active: false },
  { label: "البيع على الخارطة", active: false },
  { label: "الأراضي", active: false },
  { label: "الفعاليات", active: false },
  { label: "المطورين", active: false },
  { label: "منهجية عمل راكز", active: false },
  { label: "التوظيف", active: false },
];

export const Navbar = () => {
  return (
    <nav className="flex w-full container items-center justify-between px-4 absolute top-[5%]! left-0 right-0 z-50">
      <Image width={179.64} height={60} alt="logo" className="w-full h-auto max-sm:max-w-26" src="/logo.svg" />
      <div className="inline-flex h-15 sm:h-20 items-center justify-center gap-[71px] p-7.5 rounded-3xl glass-bg">
        <div className="inline-flex items-center gap-6">
          <div className="items-center gap-6 hidden xl:flex">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  `p-0 h-auto hover:bg-transparent font-medium text-base relative`,
                  item.active ? "text-white" : "text-[#ffffffb2]",
                )}
              >
                {item.label}
                {item.active && (
                  <img
                    className="absolute right-0 top-9.5 w-[57px] h-[13px] pointer-events-none"
                    alt="Vector"
                    src="/vector-839.svg"
                  />
                )}
              </Button>
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
