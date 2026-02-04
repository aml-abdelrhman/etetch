import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    <nav className="flex w-full container items-center justify-between px-4 fixed top-7 left-0 right-0 z-50">
      <div className="inline-flex h-20 items-center justify-center gap-[71px] px-[30px] py-[30px] bg-[#c0c1c166] rounded-[20px] backdrop-blur-[25px] backdrop-brightness-100 [-webkit-backdrop-filter:blur(25px)_brightness(100%)]">
        <div className="inline-flex items-center justify-end gap-6">
          <Button
            variant="ghost"
            className="inline-flex items-center justify-center gap-0 p-0 h-auto hover:bg-transparent"
          >
            <span className="font-medium text-white text-base tracking-[0] leading-[normal]">
              En
            </span>
            <ChevronDownIcon className="w-6 h-6 text-white" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 p-0 hover:bg-transparent"
          >
            <SearchIcon className="w-6 h-6 text-white" />
          </Button>

          <Separator
            orientation="vertical"
            className="h-8 w-[1.6px] bg-white"
          />

          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`p-0 h-auto hover:bg-transparent ${
                item.active ? "text-white" : "text-[#ffffffb2]"
              } font-medium text-base tracking-[0] leading-[normal] [direction:rtl]`}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <img
          className="absolute right-7 bottom-px w-[57px] h-[13px]"
          alt="Vector"
          src="/vector-839.svg"
        />
      </div>

      <img className="w-[179.64px] h-[60px]" alt="logo" src="/logo.svg" />
    </nav>
  );
};
